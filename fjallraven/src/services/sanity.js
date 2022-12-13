import groq from 'groq';

export const getMenuItems = async client => {
  const query = groq`*[_type == "siteNavigations" && !(_id in path("drafts.**"))]`;
  return await client.fetch(query);
};
export const getupdatesModelData = async client => {
  const query = groq`*[_type == "page" && _id=="frontpage"]`;
  return await client.fetch(query);
};

export const getPeopleCategoryList = async client => {
  const query = groq`*[_type == "peoplecategorytype" && !(_id in path("drafts.**"))]`;
  return await client.fetch(query);
};
export const getPeopleLists = async client => {
  const query = groq`*[_type == "people" && !(_id in path("drafts.**"))]`;
  return await client.fetch(query);
};

export const getPeopleCategoryTags = async client => {
  const query = groq`*[_type == "peopletagstype" && !(_id in path("drafts.**"))]`;
  return await client.fetch(query);
};

// export const getPeopleCountryList = async client => {
//   const query = groq`*[_type == "peoplelocationtype" && !(_id in path("drafts.**"))]`;
//   return await client.fetch(query);
// };

export const getPeopleCountryList = async client => {
  const query = groq`*[_type == "countryData" && !(_id in path('drafts.**'))]`;
  return await client.fetch(query);
};

// *[_type == "countryData" && !(_id in path('drafts.**'))

export const getPeopleStatesList = async client => {
  // const query = groq`*[_type == "region" && !(_id in path("drafts.**"))  ]`;
  // const query = groq`*[_type == "region" && !(_id in path("drafts.**"))  ]`;
  const query = groq`*[_type == "region" && !(_id in path("drafts.**")) && country._ref in ["3d5ca45f-e63e-4639-8ecc-6961e8fc1ee6","197df784-1086-4d2a-88f3-d0e32c9af1f5"]]`;
  return await client.fetch(query);
};

// export const getCandaPeopleStates = async client =>{
//   const query =  groq`*[_type == "region" && !(_id in path("drafts.**")) && country._ref in ["197df784-1086-4d2a-88f3-d0e32c9af1f5"]]`;
//   return await client.fetch(query);
// }
