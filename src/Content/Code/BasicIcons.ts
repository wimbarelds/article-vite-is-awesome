// @ts-nocheck
export function vitePluginIcons(names: string[]): PluginOption {
  const namesStr = names.toSorted().join(',');
  const cssUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,-25&&icon_names=${namesStr}`;

  return {
    name: 'mui-iconfont',
    transformIndexHtml: () => [
      { tag: 'link', injectTo: 'head', attrs: { rel: 'stylesheet', href: cssUrl } },
    ],
  };
}
