/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // primary: '#039BE5',
                primary: {
                    DEFAULT: '#6c63ff',
                    500: '#818cf8',
                    300: '#d3d0ff',
                    200: '#ECEBFF'
                },
                secondary: {
                    DEFAULT: '#2f2e41',
                    500: '#6b7280'
                },

                avatar1: '#BCF8EC',
                avatar2: '#36213E',
                avatar3: '#039BE5',
                avatar4: '#FF595E',
                periwinkle: '#82C3EC'
            },
            fontFamily: {
                primary: ['"Poiret One"', 'sans-serif']
                // primary: ['lato', 'sans-serif']
            },
            // that is animation class
            animation: {
                fade: 'fade 0.3s ease-out',
                loading: 'loading 1.3s infinite'
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
                }
            }
        }
    },
    plugins: []
}
