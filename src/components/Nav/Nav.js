'use client';
import Image from 'next/image';
import styles from './Nav.module.scss';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

// import useSite from 'hooks/use-site';
import useSearch, { SEARCH_STATE_LOADED } from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';
// import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

// import Section from 'components/Section';
// import NavListItem from 'components/NavListItem';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    Registros: false,
    Publicacoes: false,
  });

  const toggleDropdown = (menu) => {
    setDropdowns((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // {/*Search*/}
  const formRef = useRef();

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);

  // const { metadata = {}, menus } = useSite();
  // const { title } = metadata;

  // const navigationLocation = process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || MENU_LOCATION_NAVIGATION_DEFAULT;
  // const navigation = findMenuByLocation(menus, navigationLocation);

  const { query, results, search, clearSearch, state } = useSearch({
    maxResults: 5,
  });

  const searchIsLoaded = state === SEARCH_STATE_LOADED;

  // When the search visibility changes, we want to add an event listener that allows us to
  // detect when someone clicks outside of the search box, allowing us to close the results
  // when focus is drawn away from search

  useEffect(() => {
    // If we don't have a query, don't need to bother adding an event listener
    // but run the cleanup in case the previous state instance exists

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVisibility]);

  function addDocumentOnClick() {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }

  function removeDocumentOnClick() {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }

  function handleOnDocumentClick(e) {
    if (!e.composedPath().includes(formRef.current)) {
      setSearchVisibility(SEARCH_HIDDEN);
      clearSearch();
    }
  }

  function handleOnSearch({ currentTarget }) {
    search({
      query: currentTarget.value,
    });
  }

  function handleOnToggleSearch() {
    setSearchVisibility(SEARCH_VISIBLE);
  }

  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }

  function removeResultsRoving() {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }

  function handleResultsRoving(e) {
    const focusElement = document.activeElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 'P') {
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
  }

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      clearSearch();
      setSearchVisibility(SEARCH_HIDDEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header>
        <nav>
          <div>
            <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
          </div>

          {/* Top Menu */}
          <div className="top-menu fixed top-0 w-full z-50 bg-[#003470] p-1.5 flex justify-center lg:justify-between">
            <div className="icones flex ml-10 gap-5">
              <i className="ri-twitter-x-line text-white text-[17px]"></i>
              <i className="ri-facebook-circle-fill text-white text-[17px]"></i>
              <i className="ri-instagram-line text-white text-[17px]"></i>
              <i className="ri-youtube-fill text-white text-[17px]"></i>
            </div>
            <div className="flex items-center justify-center h-full">
              <ul className="menu-topo hidden lg:flex gap-3 mr-11 font-open-sans items-center justify-center">
                <li className="nav-topo flex items-center">
                  <a href="#" className="nav-link text-white text-[12px] hover:underline">
                    Site Oficial
                  </a>
                </li>
                <li className="nav-topo flex items-center">
                  <a href="#" className="nav-link text-white text-[12px] hover:underline">
                    Ouvidoria
                  </a>
                </li>
                <li className="nav-topo flex items-center">
                  <a href="#" className="nav-link text-white text-[12px] hover:underline">
                    Portal da Transparência
                  </a>
                </li>
                <li className="nav-topo flex items-center">
                  <a href="#" className="nav-link text-white text-[12px] hover:underline">
                    Portal do Contribuinte
                  </a>
                </li>
                <li className="flex items-center">
                  <a href="#" className="icone-amarelo">
                    <Image src="/images/iconamarelo.png" alt="foto amarela" width={20} height={20} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Menu Principal */}
          <div className="menus">
            <div className="navbar fixed top-[38px] w-full z-40 bg-[#fffffff1] flex justify-between items-center p-[13px] pl-[20px] pr-[10px]">
              <a onClick={() => (window.location.href = '/')} href="#" className="logo pl-7">
                <Image
                  src="/images/logo1.png"
                  alt="Logo do Menu"
                  width={749}
                  height={190}
                  className="w-[210px] h-auto"
                />
              </a>

              <div className="lg:hidden pr-6">
                <button onClick={toggleMenu} className="text-[#224276]">
                  <i className="ri-menu-3-line text-[24px]"></i>
                </button>
              </div>

              <ul className="nav-menu hidden lg:flex gap-8 pr-11 text-[#000000] font-open-sans text-[14px]">
                {/* Atas de Registro de Preços */}
                <li
                  className="nav-item relative"
                  onMouseEnter={() => toggleDropdown('Registros')}
                  onMouseLeave={() => toggleDropdown('Registros')}
                >
                  <a href="#" className="text-[#333333] hover:text-[#7baeff] flex items-center py-2">
                    <span>Atas de Registro de Preços</span>
                    <IoIosArrowDown />
                  </a>

                  {dropdowns.Registros && (
                    <ul className="absolute border-t-[3px] border-[#7baeff] w-[185px] bg-white shadow-lg">
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2024
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2023
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2022
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2021
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2020
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2019
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2018
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2017
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2016
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Registro de Preço - 2015
                        </a>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Publicações Anteriores do DO */}
                <li
                  className="nav-item relative"
                  onMouseEnter={() => toggleDropdown('Publicacoes')}
                  onMouseLeave={() => toggleDropdown('Publicacoes')}
                >
                  <a href="#" className="text-[#333333] hover:text-[#7baeff] flex items-center py-2">
                    <span>Publicações Anteriores do DO</span>
                    <IoIosArrowDown />
                  </a>

                  {dropdowns.Publicacoes && (
                    <ul className="absolute border-t-[3px] border-[#7baeff] w-[185px] bg-white shadow-lg">
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2024
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2023
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2022
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2021
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2020
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2019
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2018
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2017
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2016
                        </a>
                      </li>
                      <li>
                        <a href="" className="block py-2 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]">
                          Diário Oficial - 2015
                        </a>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Busca */}
                <div className={styles.navSearch}>
                  {searchVisibility === SEARCH_HIDDEN && (
                    <button onClick={handleOnToggleSearch} disabled={!searchIsLoaded}>
                      <span className="sr-only">Toggle Search</span>
                      <FaSearch />
                    </button>
                  )}
                  {searchVisibility === SEARCH_VISIBLE && (
                    <form ref={formRef} action="/search" data-search-is-active={!!query}>
                      <input
                        type="search"
                        name="q"
                        value={query || ''}
                        onChange={handleOnSearch}
                        autoComplete="off"
                        placeholder="Search..."
                        required
                      />
                      <div className={styles.navSearchResults}>
                        {results.length > 0 && (
                          <ul>
                            {results.map(({ slug, title }, index) => {
                              return (
                                <li key={slug}>
                                  <Link tabIndex={index} href={postPathBySlug(slug)}>
                                    {title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                        {results.length === 0 && (
                          <p>
                            Sorry, not finding anything for <strong>{query}</strong>
                          </p>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </ul>
            </div>
          </div>

          {/* Menu Responsivo */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 bg-[#003470dc] text-white flex flex-col items-center justify-center p-8 lg:hidden">
              {''}
              {/* Adiciona lg:hidden */}
              <div className="icones flex gap-5 mb-10">
                <i className="ri-twitter-x-line text-white text-[24px]"></i>
                <i className="ri-facebook-circle-fill text-white text-[24px]"></i>
                <i className="ri-instagram-line text-white text-[24px]"></i>
                <i className="ri-youtube-fill text-white text-[24px]"></i>
              </div>
              <ul className="text-center text-[20px] font-bold">
                <li className="mb-6">
                  <a
                    href="#"
                    onClick={() => toggleDropdown('Registros')}
                    className={`flex items-center justify-center 
                      ${dropdowns.Registros ? 'border-[1px] border-[#ffffff7c]' : ''}`}
                  >
                    Atas de Registro de Preços
                    {dropdowns.Registros ? (
                      <FaMinus className="ml-2 text-[14px] text-white" />
                    ) : (
                      <FaPlus className="ml-2 text-[14px] text-white" />
                    )}
                  </a>
                  {dropdowns.Registros && (
                    <ul className="mt-2 mb-6 text-[14px] leading-3">
                      <li className="mb-3">
                        <a href="../mapa_da_estrategia">MAPA DA ESTRATÉGIA</a>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
              <button onClick={toggleMenu} className="mt-10 text-[24px]">
                <i className="ri-close-line"></i>
              </button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Menu;
