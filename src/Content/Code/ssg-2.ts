// @ts-nocheck
const baseConfig: UserConfig = {
  plugins: [
    react(),
    // other plugins
  ],
};

export default defineConfig(({ command }): UserConfig => {
  if (command !== 'build') return baseConfig;

  return {
    ...baseConfig,
    resolve: {
      // Allow us to use a different entry point that uses hydrateRoot
      alias: { '/src/main.tsx': '/src/entry-client.tsx' },
    },
    // Define a client and server environment
    environments: {
      client: { consumer: 'client' },
      server: {
        consumer: 'server',
        build: {
          emptyOutDir: false, // avoid deleting the client build
          copyPublicDir: false, // we dont want anything except the 'server' js
          rollupOptions: { input: 'src/entry-server.tsx' }, // tell vite the entry-point
        },
      },
    },
    builder: {
      buildApp: async (builder) => {
        // Do the build for server and client
        await builder.build(builder.environments.client);
        await builder.build(builder.environments.server);

        // Figure out where the files are
        const serverJsPath = path.resolve(process.cwd(), 'dist/entry-server.js');
        const indexHtmlPath = path.resolve(process.cwd(), 'dist/index.html');

        // Read or import them
        const renderFn = await import(serverJsPath).then((module) => module.render);
        const indexHtml = fs.readFileSync(indexHtmlPath, { encoding: 'utf-8' });

        // Prerender everything
        const { prerender } = await import('./src/prerender');
        await prerender(renderFn, indexHtml);
      },
    },
  };
});
