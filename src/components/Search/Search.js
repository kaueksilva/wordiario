'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const abortControllerRef = useRef(null);

  const fetchResults = useCallback(async (value) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch(
        `https://diariooficial.jaboatao.pe.gov.br/wp-json/custom-api/v1/search/?query=${encodeURIComponent(value)}`,
        { signal: abortController.signal }
      );
      const data = await response.json();

      if (response.ok && data?.data) {
        setResults(
          data.data.map((post) => ({
            title: post.title || '',
            slug: post.slug || '',
          }))
        );
      } else {
        setResults([]);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }
      console.error('Erro na busca:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetch = useMemo(() => {
    return debounce((value) => {
      fetchResults(value);
    }, 500);
  }, [fetchResults]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debouncedFetch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          type="search"
          value={query}
          onChange={handleInputChange}
          placeholder="Pesquisar..."
          className="border rounded-md p-2 text-gray-500 w-full"
        />
        <button type="submit" className="ml-2 text-gray-500">
          <FaSearch />
        </button>
      </form>
      {query && (
        <div className="absolute top-full mt-2 bg-white shadow-md w-full border rounded-md z-50 max-h-72 overflow-y-auto">
          {isLoading ? (
            <p className="p-2 text-gray-500">Carregando...</p>
          ) : results.length > 0 ? (
            <ul>
              {results.map(({ slug, title }) => (
                <li key={slug} className="border-b">
                  <Link href={`/posts/${slug}`} className="block p-2 hover:bg-gray-100">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-2 text-gray-500">Nenhum resultado encontrado para &apos;{query}&apos;.</p>
          )}
        </div>
      )}
    </div>
  );
}
