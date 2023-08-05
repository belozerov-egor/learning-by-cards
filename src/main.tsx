import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { App } from './App.tsx'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import { store } from './services/store.ts'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
