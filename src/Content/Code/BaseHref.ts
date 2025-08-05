// @ts-nocheck
export function vitePluginBaseHref(): PluginOption {
  const { base = '/' } = minimist(argv.slice(2));

  return {
    name: 'html-basehref',
    // Set the base public path
    config: (current) => ({ ...current, base }),
    // Add the `<base href="/repository-name/">` tag to the HTML
    transformIndexHtml: () => [{ tag: 'base', attrs: { href: base }, injectTo: 'head-prepend' }],
  };
}
