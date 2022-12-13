const sanityClient = require('@sanity/client');

function sanityClientHandle() {
  return sanityClient({
    projectId: 'v3wenpx7',
    dataset: `b2c-bep-fjr-prod`,
    useCdn: false,
    token:
      'skXFSASQHFJQRBdwyeHQNHtSc6nEHEItC2BE6C53azMqN2vFJ9xBgboyTteOKt0assC9MCodzmzGgElLoaDgqkQWYUvAXn24YdYsDTj25zNCiFib5a6sOWrNJluthVgHQtAFQxSGb6cZMtsVTmpDnXTEFWkhzI2gtebZUn7a09z9oTXAXGKW'
  });
}
module.exports = sanityClientHandle;
