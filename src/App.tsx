import { MDXProvider } from '@mdx-js/react';
import { Prose } from 'wb-slides';

import { Content } from './Content';

export function App() {
  return (
    <main className="bg-gray-950/50 w-full  p-4 lg:p-12 lg:max-w-3xl lg:mx-auto">
      <MDXProvider components={{ wrapper: Prose }}>
        <Content />
      </MDXProvider>
    </main>
  );
}
