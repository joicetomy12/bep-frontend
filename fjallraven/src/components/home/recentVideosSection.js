import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import { Constants } from '../../config/constants';
import { uriToLang } from '../../config/utils';
import styles from '../../styles/home/recentVideosSectionStyle.module.css';
import FeaturedVideosSection from './featuredVideosSection';
const RecentVideosSection = ({ data }) => {
  const [featurdPlayistSectionImgComing, setfeaturdPlayistSectionImgComing] =
    useState('https://i.ytimg.com/vi/7J8Wybkrgf8/maxresdefault.jpg');
  const router = useRouter();
  const lang = uriToLang(router.query.lang || Constants.defaultCountry.lang);
  const defaultVideoCode =
    data.featuredVideos && data.featuredVideos.length > 0
      ? data.featuredVideos[0].videoCode
      : null;
  const [videoCode, setVideoCode] = useState(defaultVideoCode);
  // let codeId = videoCode.split('/');
  // let codeIdCompleted = codeId[1];
  const thumbData = e => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?key=${Constants.Youtubekey.key}&part=snippet&id=${e}`
      )
      .then(res => {
        setfeaturdPlayistSectionImgComing(
          res.data.items[0].snippet.thumbnails.maxres.url
        );
      });
  };
  const featuredPlaylistsImg = e => {
    setfeaturdPlayistSectionImgComing(e);
  };
  // const thumbDataOne = () => {
  //   let dataImg = []
  //   if (data.featuredVideos) {
  //     data.featuredVideos.map(el => {
  //       console.log("el",el);
  //       if (el.videoCode)
  //         axios
  //           .get(
  //             `https://www.googleapis.com/youtube/v3/videos?key=${Constants.Youtubekey.key}&part=snippet&id=${el.videoCode}`
  //           )
  //           .then(res => {
  //             console.log("res",res);
  //             dataImg.push(
  //               res.data.items[0].snippet.thumbnails.maxres.url
  //             );
  //           });

  //     })
  //   }
  //   setfeaturdPlayistSectionImgComing(dataImg)
  // };
  // useEffect(() => {
  //   thumbDataOne();
  // }, [data]);
  // console.log("featurdPlayistSectionImgComing", featurdPlayistSectionImgComing);

  return (
    <>
      {data && (
        <div className="container pb-4 pt-5">
          <div className="d-flex justify-content-center pt-5">
            <div>
              <div className="sectiontitle">{data.heading[lang]}</div>
              <p className="intro">{data.tagline[lang]}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <div className={styles.youtubeBox}>
                {videoCode && (
                  <ReactPlayer
                    url={`https://www.youtube.com/embed/${videoCode}`}
                    // light={
                    //   data.featuredVideos
                    //     ? videoImg
                    //     : featurdPlayistSectionImgComing
                    // }
                    light={featurdPlayistSectionImgComing}
                    width="100%"
                    height="100%"
                    controls={true}
                  />
                )}
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              {(data.featuredVideos || data.featuredPlaylists) && (
                <FeaturedVideosSection
                  // setIdFirst={setIdFirst}
                  thumbData={thumbData}
                  featuredPlaylistsImg={featuredPlaylistsImg}
                  switchVideo={setVideoCode}
                  featuredVideos={data.featuredVideos}
                  featuredPlaylists={data.featuredPlaylists}
                />
              )}
            </div>
          </div>
          {data.cta && data.cta.title && (
            <div className={`pt-5 pb-5 `}>
              <a href="" title="" className="btn themeButton m-auto">
                {data.cta.title[lang]}
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RecentVideosSection;
