/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import useSearch, { SEARCH_STATE_LOADED } from 'hooks/use-search';
import Link from 'next/link';
import { postPathBySlug } from 'lib/posts';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const Search = () => {
  const formRef = useRef();
  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);
  const { query, results, search, clearSearch, state } = useSearch({ maxResults: 10 });
  const searchIsLoaded = state === SEARCH_STATE_LOADED;

  // Memoize the handleOnDocumentClick function with useCallback to ensure it's stable
  const handleOnDocumentClick = useCallback(
    (e) => {
      if (!e.composedPath().includes(formRef.current)) {
        setSearchVisibility(SEARCH_HIDDEN);
        clearSearch();
      }
    },
    [clearSearch]
  );

  // Memoize other functions that use handleOnDocumentClick as a dependency
  const addDocumentOnClick = useCallback(() => {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }, [handleOnDocumentClick]);

  const removeDocumentOnClick = useCallback(() => {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }, [handleOnDocumentClick]);

  const addResultsRoving = useCallback(() => {
    document.body.addEventListener('keydown', handleResultsRoving);
  }, []);

  const removeResultsRoving = useCallback(() => {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }, []);

  const handleResultsRoving = (e) => {
    const focusElement = document.activeElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 's') {
        focusElement.nextSibling.children[0].firstChild.firstChild.focus();
      } else if (focusElement.parentElement.nextSibling) {
        focusElement.parentElement.nextSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusElement.nodeName === 'A' && focusElement.parentElement.previousSibling) {
        focusElement.parentElement.previousSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.lastChild.firstChild.focus();
      }
    }
  };

  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        clearSearch();
        setSearchVisibility(SEARCH_HIDDEN);
      }
    },
    [clearSearch]
  );

  useEffect(() => {
    if (searchVisibility === SEARCH_HIDDEN) {
      removeDocumentOnClick();
      return;
    }

    addDocumentOnClick();
    addResultsRoving();

    const searchInput = Array.from(formRef.current.elements).find((input) => input.type === 'search');
    searchInput.focus();

    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
  }, [searchVisibility, addDocumentOnClick, removeDocumentOnClick, addResultsRoving, removeResultsRoving]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <div>
      <ul>
        <li>
          <div>
            <div className="relative pt-[12px]">
              <button onClick={() => setSearchVisibility(SEARCH_VISIBLE)} disabled={!searchIsLoaded}>
                <FaSearch className={`fill-gray-400 ${!searchIsLoaded ? 'fill-gray-200' : ''}`} />
              </button>
            </div>

            {searchVisibility === SEARCH_VISIBLE && (
              <div className="absolute top-full right-0 bg-gray-50 p-4 shadow-lg z-50 border-t-[3px] border-[#7baeff]">
                <form
                  ref={formRef}
                  data-search-is-active={!!query}
                  className="flex items-center justify-center relative w-full"
                >
                  <input
                    type="search"
                    name="s"
                    value={query || ''}
                    onChange={(e) => search({ query: e.currentTarget.value })}
                    autoComplete="off"
                    placeholder="Pesquisar..."
                    required
                    className="text-sm w-full p-2 border border-gray-300 rounded-md"
                  />
                  <div
                    className={`absolute top-full right-0 w-full lg:w-[30em] bg-white shadow-md border-t-4 border-primary z-50 ${
                      query ? 'block' : 'hidden'
                    }`}
                  >
                    {results.length > 0 ? (
                      <ul className="list-none border-t-[3px] border-[#7baeff]">
                        {results.map(({ slug, title }, index) => (
                          <li key={slug} className="p-1 -mx-2">
                            <Link
                              tabIndex={index}
                              href={postPathBySlug(slug)}
                              className="block text-gray-800 no-underline p-2 focus:outline focus:outline-blue-500 hover:text-primary"
                            >
                              {title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="leading-[1.15] m-0">
                        Sorry, not finding anything for <strong>{query}</strong>
                      </p>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Search;
