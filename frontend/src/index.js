import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/mainTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>  
  </React.StrictMode>
);
