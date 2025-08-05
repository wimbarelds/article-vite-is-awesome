import { MDXProvider } from '@mdx-js/react';
import { Prose } from 'wb-slides';

import { Content } from './Content';

export function App() {
  return (
    <main className="z-10 max-w-3xl p-12 w-full mx-auto bg-gray-950/50">
      <MDXProvider components={{ wrapper: Prose }}>
        <Content />
      </MDXProvider>
    </main>
  );
}
