// import axios from 'axios';
// import * as _ from 'lodash';
// import { useRouter } from 'next/router';
// import { useContext, useEffect, useState } from 'react';
// import React from 'react';

// import { getPeopleLists } from '../../src/services/sanity';
// import PolarMap from '../components/PolarMap/MapData.json';
// import { Config } from '../config/config';
// import { Constants } from '../config/constants';
// import sanityClientHandle from '../config/sanityClient';
// import { uriToLang } from '../config/utils';
// // import { useCountry } from './countryProvider';

// const initMapData = {
//   type: Constants.mapRenderTypes.STANDARD,
//   center: [17.9355893, 66.205898],
//   zoom: 8,
//   pitch: 0,
//   bearing: 0,
//   focusEvent: null,
//   events: []
// };

// const MapContext = React.createContext(null);

// export const useMap = () => {
//   const state = useContext(MapContext);
//   if (!state) {
//     throw new Error('Error using call in context!');
//   }
//   return state;
// };

// export const MapProviderPolar = ({
//   children,
//   isEventDetailPage,
//   eventDetailPageData
// }) => {
//   const [eventdata, setEventData] = useState([]);

//   useEffect(() => {
//     setEventData(PolarMap);
//   }, []);

//   const providerValue = {
//     eventdata,
//     setEventData
//   };
//   return (
//     <MapContext.Provider value={providerValue}>{children}</MapContext.Provider>
//   );
// };
