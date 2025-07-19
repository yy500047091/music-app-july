// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Button from './components/Button'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Button text='Click me' />
  </StrictMode>,
)