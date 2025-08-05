import '../index.css';

import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { App } from '../App';

hydrateRoot(
  document.querySelector('#app')!,
  <StrictMode>
    <App />
  </StrictMode>,
);
