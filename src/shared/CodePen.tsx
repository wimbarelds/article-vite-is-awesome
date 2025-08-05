interface Props {
  author: string;
  authorId: string;
  title: string;
  id: string;
  height?: number;
  defaultTab?: 'none' | 'html' | 'css' | 'js';
}

export function CodePen({
  author = 'Wim Barelds',
  authorId = 'wimbarelds',
  id,
  title,
  height = 300,
  defaultTab = 'none',
}: Props) {
  const penLink = <a href={`https://codepen.io/${authorId}/pen/${id}`}>{title}</a>;
  const authorLink = <a href={`https://codepen.io/${authorId}`}>@{authorId}</a>;
  const codepenLink = <a href="https://codepen.io">CodePen</a>;
  function getTabs() {
    if (defaultTab === 'none') return 'result';
    return `${defaultTab},result`;
  }
  return (
    <div className="not-prose my-10">
      <p
        data-height={height}
        data-default-tab={getTabs()}
        data-slug-hash={id}
        data-pen-title={title}
        data-editable="true"
        data-user={authorId}
        className="codepen flex items-center justify-center border-solid border-2 p-4"
        style={{ height: `${height}px` }}
      >
        <span>
          See the Pen {penLink} by {author} ({authorLink}) on {codepenLink}.
        </span>
      </p>
      <script async src="https://public.codepenassets.com/embed/index.js"></script>
    </div>
  );
}
