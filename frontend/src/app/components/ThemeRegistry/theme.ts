import { Poppins } from 'next/font/google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import StaticDatePicker from '@mui/lab/StaticDatePicker';

const poppins = Poppins({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1F3255',
            contrastText: '#242526',
        },
        background: {
            default: '#FFF',
        },
    },
    typography: {
        fontFamily: poppins.style.fontFamily,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                'html, body': {
                    minHeight: '100vh',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#1F3255',
                    color: '#FFF',
                },
            },
        },
    },
});

export default defaultTheme;
