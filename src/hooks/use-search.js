'use client';
import { useState, createContext, useContext, useEffect } from 'react';
import Fuse from 'fuse.js';

import { getSearchData } from 'lib/search';

const SEARCH_KEYS = ['slug', 'title', 'content', 'date', 'excerpt'];

export const SEARCH_STATE_LOADING = 'LOADING';
export const SEARCH_STATE_READY = 'READY';
export const SEARCH_STATE_ERROR = 'ERROR';
export const SEARCH_STATE_LOADED = 'LOADED';

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const search = useSearchState();
  return <SearchContext.Provider value={search} {...props} />;
};

export function useSearchState() {
  const [state, setState] = useState(SEARCH_STATE_READY);
  const [data, setData] = useState(null);

  let client;

  if (data) {
    client = new Fuse(data.posts, {
      keys: SEARCH_KEYS,
      isCaseSensitive: false,
      includeScore: true, // Inclui pontuação para priorizar correspondências mais próximas
      useExtendedSearch: true,
      threshold: 0.6, // Controle de precisão (ajuste conforme necessário)
    });
    console.log(`Passei no use-search ${data.posts}`);
  }

  useEffect(() => {
    (async function getData() {
      setState(SEARCH_STATE_LOADING);

      let searchData;

      try {
        searchData = await getSearchData();
        if (!searchData || !searchData.posts) {
          throw new Error('Dados de busca inválidos ou vazios');
        }
        setData(searchData);
        setState(SEARCH_STATE_LOADED);
      } catch (e) {
        setState(SEARCH_STATE_ERROR);
      }
    })();
  }, []);

  return {
    state,
    data,
    client,
  };
}

export default function useSearch({ defaultQuery = null, maxResults } = {}) {
  const search = useContext(SearchContext);
  const { client } = search;

  const [query, setQuery] = useState('');

  let results = [];

  // Se tivermos uma consulta, faça uma busca.
  // Caso contrário, não modifique os resultados para evitar retornar resultados vazios

  if (client && query) {
    results = client.search(query).map(({ item }) => item);
    // Filtra ainda mais os resultados com base no conteúdo dos campos
    results = results.filter(
      (result) =>
        result.title.includes(query) ||
        result.content.includes(query) ||
        result.excerpt.includes(query) ||
        (result.date && result.date.includes(query)) // Filtro adicional para o campo 'date'
    );
    console.log('Resultados da busca:', results); // Verifica o conteúdo de 'results'
  }

  if (maxResults && results.length > maxResults) {
    results = results.slice(0, maxResults);
  }

  // Se o argumento defaultQuery mudar, o hook deve refletir
  // essa atualização e definir isso como o novo estado

  useEffect(() => setQuery(defaultQuery), [defaultQuery]);

  /* handleSearch
   */

  function handleSearch({ query }) {
    setQuery(query);
  }

  /* handleClearSearch
   */

  function handleClearSearch() {
    setQuery(null);
  }

  return {
    ...search,
    query,
    results,
    search: handleSearch,
    clearSearch: handleClearSearch,
  };
}
