import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './theme/mainTheme';
import UserStore from './components/store/userStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null)

root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Context.Provider value={{
                user: new UserStore(),
            }}>
                <App/>
            </Context.Provider>
        </ThemeProvider>
    </BrowserRouter>
);
