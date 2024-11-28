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
  const [query, setQuery] = useState(''); // Adiciona estado da query

  let client;

  if (data) {
    client = new Fuse(data.posts, {
      keys: SEARCH_KEYS,
      isCaseSensitive: false,
      includeScore: true,
      useExtendedSearch: true,
      threshold: 0.6,
    });
  }

  useEffect(() => {
    if (!query) {
      setData(null); // Reseta os dados se a consulta estiver vazia
      setState(SEARCH_STATE_READY);
      return;
    }

    (async function getData() {
      setState(SEARCH_STATE_LOADING);

      let searchData;

      try {
        searchData = await getSearchData(query); // Chama a API com a nova query
        console.log(searchData);

        if (!searchData || !searchData.posts) {
          console.log('Aqui não houve busca de Dados algum');
          throw new Error('Dados de busca inválidos ou vazios');
        }
        setData(searchData); // Atualiza os dados com os resultados da pesquisa
        setState(SEARCH_STATE_LOADED);
      } catch (e) {
        console.error('Erro ao buscar dados:', e);
        setState(SEARCH_STATE_ERROR);
      }
    })();
  }, [query]);

  return {
    state,
    data,
    client,
    setQuery,
  };
}

export default function useSearch({ defaultQuery = null, maxResults } = {}) {
  const search = useContext(SearchContext);
  const { client, setQuery, state } = search;

  const [query, setLocalQuery] = useState('');
  let results = [];

  // Realiza a busca se houver um cliente e uma consulta
  if (client && query) {
    results = client.search(query).map(({ item }) => item);
    results = results.filter(
      (result) =>
        result.title.includes(query) ||
        result.content.includes(query) ||
        result.excerpt.includes(query) ||
        (result.date && result.date.includes(query))
    );
  }

  if (maxResults && results.length > maxResults) {
    results = results.slice(0, maxResults);
  }

  useEffect(() => {
    if (defaultQuery) {
      setLocalQuery(defaultQuery);
      setQuery(defaultQuery); // Atualiza o contexto com a query padrão
    }
  }, [defaultQuery, setQuery]);

  // Atualiza a query local e a query global para realizar a busca
  function handleSearch({ query }) {
    setLocalQuery(query);
    setQuery(query); // Atualiza a query no contexto e dispara a busca na API
  }

  // Limpa a pesquisa
  function handleClearSearch() {
    setLocalQuery('');
    setQuery(''); // Limpa a consulta no contexto
  }

  return {
    ...search,
    query,
    results,
    state, // Retorna o estado para controlar carregamento e erros
    search: handleSearch,
    clearSearch: handleClearSearch,
  };
}
