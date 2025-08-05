// @ts-nocheck
type Options = { inline?: 'none' | 'css' | 'full' };
export async function vitePluginMuiIcons(names: string[], options: Options = {}): Promise<Plugin> {
  const { inline = 'css' } = options;

  const namesStr = names.toSorted().join(',');
  const cssUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,-25&&icon_names=${namesStr}`;

  if (inline === 'none') {
    return {
      name: 'mui-iconfont',
      transformIndexHtml: () => [{ tag: 'link', attrs: { rel: 'stylesheet', href: cssUrl } }],
    };
  }

  // Download the CSS
  let css = await fetch(cssUrl).then((res) => res.text());
  if (inline === 'css') {
    // This option only inlines the CSS, the font-file still need to be downloaded
    return {
      name: 'mui-iconfont',
      transformIndexHtml: () => [{ tag: 'style', attrs: { type: 'text/css' }, children: css }],
    };
  }

  // replace `url(URL)` with `url(data:font/woff2;base64,...)`
  const urlRegex = /url\(([^)]+)\)/;
  const fontUrl = css.match(urlRegex)?.[1];
  if (fontUrl) {
    const base64 = await fetch(fontUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => Buffer.from(buffer).toString('base64'));

    css = css.replace(urlRegex, `url(data:font/woff2;base64,${base64})`);
  }

  return {
    name: 'mui-iconfont',
    transformIndexHtml: () => [{ tag: 'style', attrs: { type: 'text/css' }, children: css }],
  };
}
