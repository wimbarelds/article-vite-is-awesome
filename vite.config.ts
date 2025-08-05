import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, type UserConfig, type ViteBuilder } from 'vite';
import {
  virtualImport,
  vitePluginDeferScript,
  vitePluginGhPagesBase,
  vitePluginMdx,
  vitePluginMuiIcons,
} from 'wb-slides/vite';

import { prerender } from './src/ssg/prerender';

export default defineConfig(({ command }): UserConfig => {
  const baseConfig = {
    plugins: [
      vitePluginMdx(),
      react(),
      tailwindcss(),
      vitePluginGhPagesBase(),
      vitePluginMuiIcons(
        ['chevron_right', 'chevron_left', 'stat_1', 'stat_minus_1', 'more_horiz', 'construction'],
        { inline: 'none' },
      ),
      vitePluginDeferScript(),
    ],
  } satisfies UserConfig;
  if (command !== 'build') return baseConfig;

  return {
    ...baseConfig,
    resolve: {
      alias: { '/src/main.tsx': 'src/ssg/entry-client.tsx' },
    },
    environments: {
      client: {
        consumer: 'client',
        build: { rollupOptions: { treeshake: 'smallest' } },
      },
      server: {
        consumer: 'server',
        build: {
          write: false,
          copyPublicDir: false,
          rollupOptions: { input: 'src/ssg/entry-server.tsx' },
        },
      },
    },
    builder: {
      buildApp: async (builder) => {
        const [, serverEntry] = await Promise.all([
          builder.build(builder.environments.client),
          builder.build(builder.environments.server).then(importBuildOutput),
        ]);

        const outDir = builder.environments.client.config.build.outDir;
        await prerender(serverEntry, outDir);
      },
    },
  };
});

type BuildOutput = Awaited<ReturnType<ViteBuilder['build']>>;
async function importBuildOutput(buildResult: BuildOutput) {
  const rollupOutput = Array.isArray(buildResult) ? buildResult[0] : buildResult;
  if ('emit' in rollupOutput) throw new Error('Received RollupWatcher, expected RollupOutput');
  return await virtualImport(rollupOutput.output[0].code);
}
