/**
 * getSearchData
 */

export async function getSearchData() {
  const response = await fetch('/wp-search.json');
  const json = await response.json();
  return json;
}


export async function getPostsCustomApi(key){
  const res = await fetch(`https://diariooficial.jaboatao.pe.gov.br/wp-json/custom-api/v1/search/?query=?{key}`);
  const data = await res.json();
  return data;
}