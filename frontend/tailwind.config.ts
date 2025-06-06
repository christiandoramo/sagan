/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            '2md': '896px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'logo-background': '#1F3255',
                'form-title': '#043133',
                'select-background': '#EFF0F2',
                'select-text': '#838383',
                'gov-button': '#9DD1F3',
                'form-label': '#4D5959',
                'enter-button': '#F5167E',
                'sidebar-background': '#FFFFFF',
                'article-waiting': '#F29339',
                'article-rejected': '#D11A2A',
                'article-accepted': '#3A974C'
            },
            maxHeight: {
                128: '80vh',
            },
            boxShadow: {
                'custom': '0px 4px 10px rgba(0, 0, 0, 0.25)',
            },
            backgroundColor: {
                'custom-orange': 'rgba(242, 147, 57, 0.1)',
                'custom-red': 'rgba(209, 26, 42, 0.1)',
                'custom-green': 'rgba(58, 151, 76, 0.1)',
            },
        },
    },
    plugins: [],
    important: true,
};
