import React from 'react';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    // Основные цвета универа
    palette: {
        primary: {
            main: '#21ADE4',
            contrastText: "#fff"
        },
        secondary: {
            main: '#8ED8F8',
            contrastText: "#fff"
        },
        success: {
            main: '#7dad59',
            contrastText: "#fff"
        },
        error: {
            main: '#ff6666',
            contrastText: "#fff"
        },
        info: {
            main: '#122D52',
            contrastText: "#fff"
        },
    },
    typography: {
    "fontFamily": `'Nunito', sans-serif;`
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '12px'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px'
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px'
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: '12px'
                }
            }
        }
    }
});