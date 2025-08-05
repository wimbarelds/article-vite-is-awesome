interface Props {
  html?: string;
  css?: string;
  js?: string;
}

export function IFrame({ html, js, css }: Props) {
  const getHead = () => {
    if (!css) return '';
    return `
      <head>
        <style>${css}</style>
      </head>
    `;
  };
  const getScript = () => {
    if (!js) return '';
    return `<script>${js}</script>`;
  };

  return (
    <iframe
      className="w-full f-full"
      title="Result"
      srcDoc={`
        <!DOCTYPE html>
        <html>
          ${getHead()}
          <body>
            ${html}
            ${getScript()}
          </body>
        </html>
      `}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
