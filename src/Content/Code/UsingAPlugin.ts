// @ts-nocheck
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import { vitePluginIcons } from './vite-plugin-icons';

export default defineConfig({
  plugins: [react(), vitePluginIcons()],
});
