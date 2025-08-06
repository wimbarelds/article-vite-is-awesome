import { Prose } from 'wb-slides';

import BaseHref from './Content/BaseHref.mdx';
import BasicIcons from './Content/BasicIcons.mdx';
import Conclusion from './Content/Conclusion.mdx';
import Intro from './Content/Intro.mdx';
import LessBasicIcons from './Content/LessBasicIcons.mdx';
import RawImports from './Content/RawImports.mdx';
import StaticSiteGeneration from './Content/StaticSiteGeneration.mdx';

export function Content() {
  return (
    <Prose>
      <Intro />
      <BasicIcons />
      <BaseHref />
      <StaticSiteGeneration />
      <LessBasicIcons />
      <RawImports />
      <Conclusion />
    </Prose>
  );
}
