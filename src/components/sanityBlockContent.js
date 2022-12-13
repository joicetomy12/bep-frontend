import BlockContent from '@sanity/block-content-to-react';
import { useRouter } from 'next/router';
import React from 'react';

import { Config } from '../config/config';
import { Constants } from '../config/constants';

const SanityBlockContent = ({ blocks }) => {
  const router = useRouter();
  const dataset = router.query.code || Constants.defaultCountry.code;
  return (
    <BlockContent
      blocks={blocks}
      dataset={dataset}
      projectId={Config.sanityProjectId}
      imageOptions={{ fit: 'max' }}
    />
  );
};

export default SanityBlockContent;
