'use client';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import Search from '../Search';

import { useState } from 'react';
import Link from 'next/link';

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
              <a href="https://x.com/jaboataoonline" target="_blank">
                <i className="ri-twitter-x-line text-white text-[17px]"></i>
              </a>
              <a href="https://www.facebook.com/PrefeituradoJaboatao" target="_blank">
                <i className="ri-facebook-circle-fill text-white text-[17px]"></i>
              </a>
              <a href="https://www.instagram.com/prefjaboatao/" target="_blank">
                <i className="ri-instagram-line text-white text-[17px]"></i>
              </a>
              <a href="https://www.youtube.com/prefeiturajaboatao" target="_blank">
                <i className="ri-youtube-fill text-white text-[17px]"></i>
              </a>
            </div>
            <div className="flex items-center justify-center h-full">
              <ul className="menu-topo hidden lg:flex gap-3 mr-11 font-open-sans items-center justify-center">
                <li className="nav-topo flex items-center">
                  <a
                    href="https://jaboatao.pe.gov.br/"
                    target="_blank"
                    className="nav-link text-white text-[12px] hover:underline"
                  >
                    Site Oficial
                  </a>
                </li>
                <li className="nav-topo flex items-center">
                  <a
                    href="https://ouvidoria.jaboatao.pe.gov.br/"
                    target="_blank"
                    className="nav-link text-white text-[12px] hover:underline"
                  >
                    Ouvidoria
                  </a>
                </li>
                <li className="nav-topo flex items-center">
                  <a
                    href="http://portaldatransparencia.jaboatao.pe.gov.br/"
                    target="_blank"
                    className="nav-link text-white text-[12px] hover:underline"
                  >
                    Portal da Transparência
                  </a>
                </li>
                <li className="nav-topo flex items-center">
                  <a
                    href="https://www.tinus.com.br/csp/JABOATAO/portal/index.csp"
                    target="_blank"
                    className="nav-link text-white text-[12px] hover:underline"
                  >
                    Portal do Contribuinte
                  </a>
                </li>
                <li className="flex items-center">
                  <a href="https://eouve.com.br/" target="_blank" className="icone-amarelo">
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

              <div className="nav-menu hidden lg:flex gap-8 pr-10 text-[#000000] font-open-sans text-[14px]">
                {/* Atas de Registro de Preços */}
                <div
                  className="nav-item relative"
                  onMouseEnter={() => toggleDropdown('Registros')}
                  onMouseLeave={() => toggleDropdown('Registros')}
                >
                  <Link href="#" className="text-[#333333] hover:text-[#7baeff] flex items-center py-2">
                    <span>Atas de Registro de Preços</span>
                    <IoIosArrowDown />
                  </Link>

                  {dropdowns.Registros && (
                    <div className="absolute border-t-[3px] border-[#7baeff] w-[185px] bg-white shadow-lg">
                      <div>
                        <Link
                          href="/categories/ata-de-registro-de-precos-de-2024"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Registro de Preço - 2024
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/ata-de-registro-de-precos-de-2023"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Registro de Preço - 2023
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/ata-de-registro-de-precos-de-2022"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Registro de Preço - 2022
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/ata-de-registro-de-precos-de-2021"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Registro de Preço - 2021
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/ata-de-registro-de-precos-de-2020"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Registro de Preço - 2020
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/ata-de-registro-de-precos-de-2019"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Registro de Preço - 2019
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/registro-preco-2018"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Registro de Preço - 2018
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/registro-preco-2017"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Registro de Preço - 2017
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/registro-preco-2016"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Registro de Preço - 2016
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/registro-preco-2015"
                          className="block py-2 pl-3 text-[#000000] text-[14px]"
                        >
                          Registro de Preço - 2015
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Publicações Anteriores do DO */}
                <div
                  className="nav-item relative"
                  onMouseEnter={() => toggleDropdown('Publicacoes')}
                  onMouseLeave={() => toggleDropdown('Publicacoes')}
                >
                  <Link href="#" className="text-[#333333] hover:text-[#7baeff] flex items-center py-2">
                    <span>Publicações Anteriores do DO</span>
                    <IoIosArrowDown />
                  </Link>

                  {dropdowns.Publicacoes && (
                    <div className="absolute border-t-[3px] border-[#7baeff] w-[160px] bg-white shadow-lg">
                      <div>
                        <Link
                          href="/categories/diario-oficial-2024"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Diário Oficial - 2024
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/diario-oficial-2023"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Diário Oficial - 2023
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/diario-oficial-2022"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Diário Oficial - 2022
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/diario-oficial-2021"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Diário Oficial - 2021
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/diario-oficial-2020"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Diário Oficial - 2020
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/diario-oficial-2019"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Diário Oficial - 2019
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/do-2018"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Diário Oficial - 2018
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/do-2017"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Diário Oficial - 2017
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/categories/do-2016"
                          className="block py-2 pl-3 text-[#000000] text-[14px] border-b-[1px] border-[#c4c4c4]"
                        >
                          Diário Oficial - 2016
                        </Link>
                      </div>
                      <div>
                        <Link href="/categories/do-2015" className="block py-2 pl-3 text-[#000000] text-[14px]">
                          Diário Oficial - 2015
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Busca */}
                <div>
                  <div className="ml-[-20px]">
                    <Search />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Responsivo */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 bg-[#003470dc] text-white flex flex-col items-center justify-center p-8 lg:hidden">
              {''}
              {/* Adiciona lg:hidden */}
              <div className="icones flex gap-5 mb-10">
                <a href="https://www.facebook.com/PrefeituradoJaboatao" target="_blank">
                  <i className="ri-twitter-x-line text-white text-[24px]"></i>
                </a>
                <a href="https://www.facebook.com/PrefeituradoJaboatao" target="_blank">
                  <i className="ri-facebook-circle-fill text-white text-[24px]"></i>
                </a>
                <a href="https://www.instagram.com/prefjaboatao/" target="_blank">
                  <i className="ri-instagram-line text-white text-[24px]"></i>
                </a>
                <a href="https://www.youtube.com/prefeiturajaboatao" target="_blank">
                  <i className="ri-youtube-fill text-white text-[24px]"></i>
                </a>
              </div>
              <ul className="text-center text-[20px] font-bold">
                {/* Atas de Registro de Preços */}
                <li className="mb-6">
                  <a
                    href="#"
                    onClick={() => toggleDropdown('Registros')}
                    className={`flex items-center justify-center text-[#ffffff] 
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
                        <a href=" /categories/ata-de-registro-de-precos-de-2024" className="text-white">
                          Registro de Preço - 2024
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/ata-de-registro-de-precos-de-2023" className="text-white">
                          Registro de Preço - 2023
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/ata-de-registro-de-precos-de-2022" className="text-white">
                          Registro de Preço - 2022
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/ata-de-registro-de-precos-de-2021" className="text-white">
                          Registro de Preço - 2021
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/ata-de-registro-de-precos-de-2020" className="text-white">
                          Registro de Preço - 2020
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/ata-de-registro-de-precos-de-2019" className="text-white">
                          Registro de Preço - 2019
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/registro-preco-2018" className="text-white">
                          Registro de Preço - 2018
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/registro-preco-2017" className="text-white">
                          Registro de Preço - 2017
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/registro-preco-2016" className="text-white">
                          Registro de Preço - 2016
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/registro-preco-2015" className="text-white">
                          Registro de Preço - 2015
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                {/* Publicações Anteriores do DO */}
                <li className="mb-6">
                  <a
                    href="#"
                    onClick={() => toggleDropdown('Publicacoes')}
                    className={`flex items-center justify-center text-[#ffffff] 
                      ${dropdowns.Publicacoes ? 'border-[1px] border-[#ffffff7c]' : ''}`}
                  >
                    Publicações Anteriores do DO
                    {dropdowns.Publicacoes ? (
                      <FaMinus className="ml-2 text-[14px] text-white" />
                    ) : (
                      <FaPlus className="ml-2 text-[14px] text-white" />
                    )}
                  </a>
                  {dropdowns.Publicacoes && (
                    <ul className="mt-2 mb-6 text-[14px] leading-3">
                      <li className="mb-3">
                        <a href=" /categories/diario-oficial-2024" className="text-white">
                          Diário Oficial - 2024
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/diario-oficial-2023" className="text-white">
                          Diário Oficial - 2023
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/diario-oficial-2022" className="text-white">
                          Diário Oficial - 2022
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/diario-oficial-2021" className="text-white">
                          Diário Oficial - 2021
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/diario-oficial-2020" className="text-white">
                          Diário Oficial - 2020
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/diario-oficial-2019" className="text-white">
                          Diário Oficial - 2019
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/do-2018" className="text-white">
                          Diário Oficial - 2018
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/do-2017" className="text-white">
                          Diário Oficial - 2017
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/do-2016" className="text-white">
                          Diário Oficial - 2016
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href=" /categories/do-2015" className="text-white">
                          Diário Oficial - 2015
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <div>
                    <Search />
                  </div>
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
