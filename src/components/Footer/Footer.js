import Image from 'next/image';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div>
        <div className={styles.footer}>
          <div className={styles.footercolumn1}>
            <h3 className={styles.footertitle}>MAPA DO SITE</h3>
            <h4 className={styles.footerborder}></h4>
            <ul className={styles.footerlist}>
              <li>
                <a href="https://jaboatao.pe.gov.br/mapa-da-estrategia/" target="_blank">
                  MAPA DA ESTRATÉGIA
                </a>
              </li>
              <li>
                <a href="https://portaldatransparencia.jaboatao.pe.gov.br/" target="_blank">
                  PORTAL DA TRANSPARÊNCIA
                </a>
              </li>
              <li>
                <a href="https://portaldatransparencia.jaboatao.pe.gov.br/estrutura-organizacional/" target="_blank">
                  ESTRUTURA ORGANIZACIONAL
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/galeria-de-elogios/" target="_blank">
                  GALERIA DE ELOGIOS
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/servicos-para-o-cidadao/" target="_blank">
                  CIDADÃO
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/carta-de-servicos/" target="_blank">
                  CARTAS DE SERVIÇO
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/servicos-para-a-empresa/" target="_blank">
                  EMPRESA
                </a>
              </li>
              <li>
                <a href="https://servidor.jaboatao.pe.gov.br/" target="_blank">
                  SERVIDOR
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/servicos-para-o-turista/" target="_blank">
                  TURISTA
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/ppp-saude/" target="_blank">
                  PPP-SAUDE
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/mapa-das-escolas/" target="_blank">
                  MAPA DAS ESCOLAS MUNICIPAIS
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/mapas-das-unidades-de-saude-por-regional/" target="_blank">
                  MAPA DAS UNIDADES DE SAÚDE POR REGIONAIS
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/mapa-dos-bares-e-restaurantes/" target="_blank">
                  MAPA DOS BARES E RESTAURANTES
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/mapa-mercados-publicos/" target="_blank">
                  MAPA DOS MERCADOS PÚBLICOS
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/mapa-das-unidades-do-cras-e-creas-municipais/" target="_blank">
                  MAPA DAS UNIDADES DO CRAS E CREAS MUNICIPAIS
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footercolumn2}>
            <h3 className={styles.footertitle}>SITES RELACIONADOS</h3>
            <h4 className={styles.footerborder}></h4>
            <ul className={styles.footerlist}>
              <li>
                <a href="https://amorpor.jaboatao.pe.gov.br/" target="_blank">
                  AMOR JABOATÃO
                </a>
              </li>
              <li>
                <a href="https://bemestaranimal.jaboatao.pe.gov.br/" target="_blank">
                  BEM ESTAR ANIMAL
                </a>
              </li>
              <li>
                <a href="https://conselhodeusuarios.jaboatao.pe.gov.br/" target="_blank">
                  CONSELHO DE USUÁRIOS
                </a>
              </li>
              <li>
                <a href="https://deolhonaconsulta.jaboatao.pe.gov.br/" target="_blank">
                  DE OLHO NA CONSULTA
                </a>
              </li>
              <li>
                <a href="https://diariooficial.jaboatao.pe.gov.br/" target="_blank">
                  DIÁRIO OFICIAL
                </a>
              </li>
              <li>
                <a href="https://educacao.jaboatao.pe.gov.br/" target="_blank">
                  EDUCAÇÃO
                </a>
              </li>
              <li>
                <a href="https://economiacriativa.jaboatao.pe.gov.br/" target="_blank">
                  ECONOMIA CRIATIVA
                </a>
              </li>
              <li>
                <a href="https://emlume.com.br/" target="_blank">
                  EMLUME
                </a>
              </li>
              <li>
                <a href="https://estacaobemestar.jaboatao.pe.gov.br/" target="_blank">
                  ESTAÇÃO BEM ESTAR
                </a>
              </li>
              <li>
                <a href="https://jaboataoemacao.jaboatao.pe.gov.br/" target="_blank">
                  JABOATÃO EM AÇÃO
                </a>
              </li>
              <li>
                <a href="https://jaboataoprev.jaboatao.pe.gov.br/" target="_blank">
                  JABOATAOPREV
                </a>
              </li>
              <li>
                <a href="https://semam.jaboatao.pe.gov.br/" target="_blank">
                  MEIO AMBIENTE
                </a>
              </li>
              <li>
                <a href="https://jaboatao.pe.gov.br/" target="_blank">
                  OFICIAL
                </a>
              </li>
              <li>
                <a href="https://ouvidoria.jaboatao.pe.gov.br/" target="_blank">
                  OUVIDORIA
                </a>
              </li>
              <li>
                <a href="https://www.tinus.com.br/csp/JABOATAO/portal/index.csp" target="_blank">
                  PORTAL DO CONTRIBUINTE
                </a>
              </li>
              <li>
                <a href="https://portaldatransparencia.jaboatao.pe.gov.br/" target="_blank">
                  PORTAL DA TRANSPARÊNCIA
                </a>
              </li>
              <li>
                <a href="https://procon.jaboatao.pe.gov.br/" target="_blank">
                  PROCON
                </a>
              </li>
              <li>
                <a href="https://servidor.jaboatao.pe.gov.br/" target="_blank">
                  SERVIDOR
                </a>
              </li>
              <li>
                <a href="https://trabalho.jaboatao.pe.gov.br/" target="_blank">
                  TRABALHO
                </a>
              </li>
              <li>
                <a href="https://viver.jaboatao.pe.gov.br/" target="_blank">
                  VIVER
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footercolumn3}>
            <h3 className={styles.footertitle}>OUVIDORIA</h3>
            <h4 className={styles.footerborder}></h4>
            <p>
              OUVIDORIA GERAL: 0800 081 8999 / (81) 9.9422-5177
              <br /> ATENDIMENTO DE SEGUNDA A SEXTA-FEIRA, DAS 8H ÀS 14H
              <br /> E-MAIL: ouvidoria@jaboatao.pe.gov.br
            </p>

            <h3 className={styles.footertitle}>
              <br /> ACESSIBILIDADE
            </h3>
            <h4 className={styles.footerborder}></h4>
            <ul className={styles.footerlist}>
              <li>
                <a
                  href="https://portaldatransparencia.jaboatao.pe.gov.br/informacoes-de-acessibilidade/"
                  target="_blank"
                >
                  INFORMAÇÕES
                </a>
              </li>
            </ul>

            <h3 className={styles.footertitle}>
              <br />
              NAVEGABILIDADE
            </h3>
            <h4 className={styles.footerborder}></h4>

            <ul className={styles.footerlist}>
              <li>
                <a href="https://jaboatao.pe.gov.br/glossario/" target="_blank">
                  GLOSSÁRIO
                </a>
              </li>
            </ul>

            <h3 className={styles.footertitle}>
              <br /> ACOMPANHE-NOS
            </h3>
            <h4 className={styles.footerborder}></h4>
            <div className={styles.iconesfooter}>
              <a
                href="https://twitter.com/jaboataoonline"
                target="_blank"
                className="group flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 text-white hover:bg-white"
              >
                <i className="ri-twitter-x-line text-2xl text-white transition-colors duration-300 group-hover:text-blue-900"></i>
              </a>
              <a
                href="https://www.facebook.com/PrefeituradoJaboatao"
                target="_blank"
                className="group flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 text-white hover:bg-white"
              >
                <i className="ri-facebook-circle-fill text-2xl text-white transition-colors duration-300 group-hover:text-blue-900"></i>
              </a>
              <a
                href="https://www.instagram.com/prefjaboatao/"
                target="_blank"
                className="group flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 text-white hover:bg-white"
              >
                <i className="ri-instagram-line text-2xl text-white transition-colors duration-300 group-hover:text-blue-900"></i>
              </a>
              <a
                href="https://www.youtube.com/user/prefeiturajaboatao/videos"
                target="_blank"
                className="group flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 text-white hover:bg-white"
              >
                <i className="ri-youtube-fill text-2xl text-white transition-colors duration-300 group-hover:text-blue-900"></i>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.partebranca}>
          <div className={styles.logof}>
            <Image src="/images/logo1.png" alt="Logo do footer" width={200} height={100} />
          </div>

          <div className={styles.details1}>
            <p>
              <strong>Palácio da Batalha</strong>
              <br />
              Av. Barreto de Menezes, 1648 – Prazeres –<br />
              Jaboatão dos Guararapes – PE, CEP 54.310-310
            </p>
          </div>

          <div className={styles.details2}>
            <p>
              <strong>Complexo Administrativo</strong>
              <br />
              Estr. da Batalha, 1200 – Jardim Jordão,
              <br />
              Jaboatão dos Guararapes – PE, CEP 54315-570
            </p>
          </div>
        </div>

        <div className={styles.credits}>Desenvolvido por: Secretaria Executiva de Governo Digital | SEGD </div>
      </div>
    </footer>
  );
};

export default Footer;
