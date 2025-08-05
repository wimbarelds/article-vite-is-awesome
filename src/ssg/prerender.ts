import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { cwd } from 'process';
import { gzip as gzipCb, type InputType } from 'zlib';

interface ServerEntry {
  render: () => Promise<string>;
}

interface PrerenderedFile {
  filePath: string;
  size: string;
  gzippedSize: string;
}

export async function prerender({ render }: ServerEntry, outDir = 'dist') {
  const clientPath = resolve(cwd(), outDir);
  const htmlPath = resolve(clientPath, 'index.html');

  console.log(cyan(`\nPrerendering routes...`));
  const startTime = Date.now();

  const template = await readFile(htmlPath, { encoding: 'utf-8' });

  const prerenderedFiles = await Promise.all(
    ['/'].map(async (path): Promise<PrerenderedFile> => {
      const html = await render();
      const routePath = path.startsWith('/') ? path.slice(1) : path;
      const filePath = routePath === '' ? 'index.html' : join(routePath, 'index.html');
      const targetPath = resolve(clientPath, filePath);
      const outputHtml = template
        .replace(/\r/g, '')
        .replace(/(\s*\n\s*)*<!--app-html-->(\s*\n\s*)*/, html ?? '');

      const targetDir = dirname(targetPath);
      await mkdir(targetDir, { recursive: true });
      await writeFile(targetPath, outputHtml, { encoding: 'utf-8' });

      return {
        filePath: filePath.replace(/\\/g, '/'),
        size: formatSize(new Blob([outputHtml]).size),
        gzippedSize: await getGzipSize(outputHtml),
      };
    }),
  );

  const outDirPrefix = `${outDir}/`;
  const maxPathLen = getMaxLength(prerenderedFiles.map((file) => outDirPrefix + file.filePath));
  const maxSizeLen = getMaxLength(prerenderedFiles.map((file) => file.size));
  const maxZipSizeLen = getMaxLength(prerenderedFiles.map((file) => file.gzippedSize));

  for (const { filePath, size, gzippedSize } of prerenderedFiles) {
    const fullPath = outDirPrefix + filePath;
    const padding = ' '.repeat(maxPathLen - fullPath.length);
    const coloredPath = dim(outDirPrefix) + green(filePath);
    const sizeStr = size.padStart(maxSizeLen);
    const gzipStr = gzippedSize.padStart(maxZipSizeLen);

    // Use the box-drawing character `│` and dim the entire gzip block
    console.log(`${coloredPath}${padding}  ${dimBold(sizeStr)}${dim(` │ gzip: ${gzipStr}`)}`);
  }

  const duration = Date.now() - startTime;
  console.log(green(`\n✓ 1 Page prerendered`) + dim(` (in ${duration}ms)`));
}

function gzip(data: InputType) {
  return new Promise<Buffer>((resolve) => gzipCb(data, (_, result) => resolve(result)));
}

// --- Helper functions for logging ---
const green = (str: string) => `\x1b[32m${str}\x1b[0m`;
const dim = (str: string) => `\x1b[2m${str}\x1b[0m`;
const cyan = (str: string) => `\x1b[36m${str}\x1b[0m`;
const dimBold = (str: string) => `\x1b[1;2m${str}\x1b[0m`;

const getMaxLength = (arr: string[]) => Math.max(...arr.map((str) => str.length));
async function getGzipSize(content: string) {
  return await gzip(content).then((buffer) => formatSize(buffer.length));
}

function formatSize(bytes: number): string {
  const kb = bytes / 1024;
  return `${kb.toFixed(2)} kB`;
}
