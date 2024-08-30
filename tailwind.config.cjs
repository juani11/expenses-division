import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // primary: '#039BE5',

                primary: {
                    50: '#F0F0FF',
                    100: '#E2E0FF',
                    200: '#C5C2FF',
                    300: '#A8A3FF',
                    400: '#8B85FF',
                    DEFAULT: '#6C63FF',
                    600: '#2A1FFF',
                    700: '#0B00D6',
                    800: '#07008F',
                    900: '#040047',
                    950: '#020024'
                },

                // primary: {
                //     DEFAULT: '#6c63ff',
                //     500: '#818cf8',
                //     300: '#d3d0ff',
                //     200: '#ECEBFF'
                // },

                // secondary: {
                //     DEFAULT: '#2f2e41',
                //     500: '#6b7280'
                // },

                secondary: {
                    50: '#E7E7EE',
                    100: '#D0CFDD',
                    200: '#A4A2BD',
                    300: '#75739C',
                    400: '#504E6E',
                    DEFAULT: '#2F2E41',
                    600: '#252433',
                    700: '#1C1B27',
                    800: '#13131B',
                    900: '#09080C',
                    950: '#040406'
                },

                avatar1: '#ff6c63',
                avatar2: '#36213E',
                avatar3: '#039BE5',
                avatar4: '#FF595E',
                periwinkle: '#82C3EC'
            },
            // fontFamily: {
            //     primary: ['"Poiret One"', 'sans-serif']
            //     // primary: ['"Lexend"', 'sans-serif']
            //     // primary: ['"Onest"', 'sans-serif']
            //     // primary: ['lato', 'sans-serif']
            // },
            // that is animation class
            animation: {
                fade: 'fade 0.3s ease-in-out',
                loading: 'loading 1.3s infinite',
                fadeLeft: 'fadeLeft 0.4s ease-in-out'
            },
            keyframes: {
                fade: {
                    '0%': { opacity: 0 },
                    '80%': { opacity: 1 }
                },
                loading: {
                    '0%': { transform: 'translateX(-150%)' },
                    '50%': { transform: 'translateX(-60%)' },
                    '100%': { transform: ' translateX(150%)' }
                },
                fadeLeft: {
                    '0%': { opacity: 0, transform: 'translateX(-1%)' },
                    '100%': { transform: 'translateX(0%)', opacity: 1 }
                }
            }
        }
    },
    plugins: []
}
