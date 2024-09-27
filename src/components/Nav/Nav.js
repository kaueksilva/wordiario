'use client';
import Image from 'next/image';

const Menu = () => {
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
            <ul className="menu-topo hidden lg:flex gap-3 mr-11 font-open-sans">
              <li className="nav-topo">
                <a href="#" className="nav-link text-white text-[12px] hover:underline">
                  Diário Oficial
                </a>
              </li>
              <li className="nav-topo">
                <a href="#" className="nav-link text-white text-[12px] hover:underline">
                  Portal da Transparência
                </a>
              </li>
              <li className="nav-topo">
                <a href="#" className="nav-link text-white text-[12px] hover:underline">
                  Ouvidoria
                </a>
              </li>
              <li className="nav-topo">
                <a href="#" className="nav-link text-white text-[12px] hover:underline">
                  Portal do Contribuinte
                </a>
              </li>
              <li className="nav-topo">
                <a href="#" className="nav-link text-white text-[12px] hover:underline">
                  Portal do Servidor
                </a>
              </li>
              <li className="nav-topo">
                <a href="#" className="nav-link text-white text-[12px] hover:underline">
                  COVID-19
                </a>
              </li>
              <li className="nav-topo">
                <a href="#" className="nav-link text-white text-[12px] hover:underline">
                  Radar da Transparência
                </a>
              </li>
              <li>
                <a href="#" className="icone-amarelo">
                  <Image src="/images/iconamarelo.png" alt="foto amarela" width={20} height={20} />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Menu;
