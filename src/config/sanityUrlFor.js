import imageUrlBuilder from '@sanity/image-url';

import { Config } from '../config/config';
import sanityClientHandler from './sanityClient';

export function sanityUrlFor(source, code) {
  const client = sanityClientHandler(code);

  const builder = imageUrlBuilder(client);
  return builder.image(source);
}
export const sanityUrlForFile = (source, code) => {
  const clientDataset = sanityClientHandler(code);
  const dataSetOfClient = clientDataset.clientConfig.dataset;
  const clientID = Config.sanityProjectId;
  return `https://cdn.sanity.io/files/${clientID}/${dataSetOfClient}/${source}?dl`;
};
