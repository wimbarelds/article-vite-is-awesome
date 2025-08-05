import { useEffect, useMemo, useState } from 'react';
import { Code } from 'wb-slides';

import { IFrame } from './IFrame';
import { Tabs } from './Tabs';

type CodeType = 'html' | 'css' | 'js';

type ImportFn = () => Promise<{ default: string }>;

type CodeProps = Partial<Record<CodeType, ImportFn>>;

interface Props extends CodeProps {}

export function Example({ js: jsImportFn, css: cssImportFn, html: htmlImportFn }: Props) {
  const [htmlLoading, html] = useImportResult(htmlImportFn);
  const [cssLoading, css] = useImportResult(cssImportFn);
  const [jsLoading, js] = useImportResult(jsImportFn);

  const loading = htmlLoading || cssLoading || jsLoading;

  const tabs = useMemo(() => {
    if (loading) return [];
    const result: CodeType[] = [];
    if (htmlImportFn) result.push('html');
    if (cssImportFn) result.push('css');
    if (jsImportFn) result.push('js');

    const getTabCode = (tab: CodeType) => {
      if (tab === 'html') return html;
      if (tab === 'css') return css;
      return js;
    };

    return result.map((tab) => {
      return {
        title: tab.toUpperCase(),
        content: <Code code={getTabCode(tab)} language={tab} />,
      };
    });
  }, [loading, htmlImportFn, cssImportFn, jsImportFn, html, css, js]);

  if (loading) return 'loading';

  return (
    <div className="not-prose my-10 grid grid-cols-2 gap-2 items-stretch bg-slate-700 rounded-md p-2">
      <Tabs tabs={tabs} classes={{ container: 'h-[250px]' }} />
      <Tabs
        classes={{ container: 'h-[250px]' }}
        tabs={[
          {
            title: 'Result',
            content: <IFrame js={js} css={css} html={html} />,
          },
        ]}
      />
    </div>
  );
}

function useImportResult(importFn?: ImportFn): [boolean, string] {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResult('');
    if (!importFn) {
      setLoading(false);
      return;
    }

    setLoading(true);

    let isCancelled = false;
    importFn().then((res) => {
      if (isCancelled) return;
      setResult(res.default);
      setLoading(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [importFn]);

  return [loading, result];
}
