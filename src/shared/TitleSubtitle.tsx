interface Props {
  title: string;
  subtitle: string;
}

export function TitleSubtitle({ title, subtitle }: Props) {
  return (
    <>
      <h1 className="mb-0">{title}</h1>
      <sub className="text-base">{subtitle}</sub>
    </>
  );
}
