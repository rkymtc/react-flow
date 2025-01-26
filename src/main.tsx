import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { TeamProvider } from './context/TeamContext'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme'
import './styles/global.css'
import './styles/diagram.css'

const root = createRoot(document.getElementById('root')!)
root.render(
    // @ts-ignore

    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <TeamProvider>
            <App />
          </TeamProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
  