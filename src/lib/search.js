/**
 * getSearchData
 */

export async function getSearchData() {
  const response = await fetch('/wp-search.json');
  const json = await response.json();
  // console.log(`Passei no search lib ${json}`);
  return json;
}


export async function getPostsCustomApi(key){
  const url = `https://diariooficial.jaboatao.pe.gov.br/wp-json/custom-api/v1/search/?query=${key}`;
  try{
    const response = await fetch(url);
    // console.log(`response -> ${resp  onse}`)
    if(!response){
      console.log(`não consegui fazer a requisição customApi. resultado: ${response}`);
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }
    const data = await response.json();
    // const dataArray = Object.entries(data.data[0]);4
    if(!data){
      console.log('erro ao trazer os dados');
      return '';
    }
    const realData = data.data.map((e) => {
      return Object.entries(e)
    });
    // let teste =  data.data.map((elemento) => elemento);
    console.log(`CONSEGUI FAZER A REQUISIÇÃO: ${realData}`);
    // console.log(JSON.stringify(data.data,null, 2))
    return  realData;
  }catch(e){
    console.log(`erro ao fazer a requisição ${e}`);
    return e;
  }

}
