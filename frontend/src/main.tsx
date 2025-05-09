import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { UserContextProvider } from './context/UserContext.tsx';
import { CartContextProvider } from './context/CartContext.tsx';

createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <CartContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
    </CartContextProvider>
  </UserContextProvider>,
)
