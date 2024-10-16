import { useContext, createContext } from 'react';

import config from '../../package.json';

import { removeLastTrailingSlash } from 'lib/util';

export const SiteContext = createContext();

/* useSiteContext
 */

export function useSiteContext(data) {
  let { homepage = '' } = config;

  // Corte a barra final do final da página inicial para evitar
  // problemas de duplicação em todos os metadados

  homepage = removeLastTrailingSlash(homepage);

  return {
    ...data,
    homepage,
  };
}

/*
 * useSite
 */

export default function useSite() {
  const site = useContext(SiteContext);
  return site;
}
