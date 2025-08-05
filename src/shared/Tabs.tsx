import { clsx } from 'clsx';
import { type ReactNode, useState } from 'react';

interface TabItem {
  title: string;
  content: ReactNode;
}

interface Props {
  tabs: TabItem[];
  initialTabIndex?: number;
  classes?: {
    container?: string;
    subContainer?: string;
  };
}

export function Tabs({
  tabs,
  classes: { container, subContainer } = {},
  initialTabIndex = 0,
}: Props) {
  const [tabIndex, setTabIndex] = useState(initialTabIndex);

  return (
    <div className={clsx('flex flex-col', container)}>
      <div className={clsx('flex px-2 items-end', subContainer)}>
        {tabs.map((tab, index) => (
          <Tab
            text={tab.title}
            active={index === tabIndex}
            onClick={() => setTabIndex(index)}
            key={tab.title}
          />
        ))}
      </div>
      <div
        className={clsx(
          'flex-1 flex items-stretch justify-stretch overflow-auto bg-neutral-900 border-t-4 border-sky-700 rounded-b',
          subContainer,
        )}
        style={{
          scrollbarGutter: 'stable',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-slate-500) var(--color-slate-800)',
        }}
      >
        {tabs[tabIndex].content}
      </div>
    </div>
  );
}

interface TabProps {
  text: string;
  active?: boolean;
  onClick?: () => void;
  Component?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
}

function Tab({ text, active, onClick, Component = 'button' }: TabProps) {
  return (
    <Component
      className={clsx('leading-[1]', active ? 'cursor-default' : 'cursor-pointer')}
      onClick={onClick}
    >
      <span
        className={clsx(
          'block text-center px-2 rounded-t-md text-xs min-w-[3.5rem] transition duration-300',
          active ? 'bg-sky-700 pt-1 pb-0.5' : 'bg-slate-800 pt-0.5 pb-0.25 hover:bg-sky-800',
        )}
      >
        {text}
      </span>
    </Component>
  );
}
