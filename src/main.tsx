import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './styles/index.scss'
import { App } from './App.tsx'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import { store } from './services'
import './i18n.ts'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
