/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // primary: '#039BE5',
                primary: '#6c63ff',
                secondary: '#2f2e41',

                avatar1: '#BCF8EC',
                avatar2: '#36213E',
                avatar3: '#FF6978',
                avatar4: '#E86A92'
            },
            fontFamily: {
                primary: ['"Poiret One"', 'sans-serif']
                // primary: ['lato', 'sans-serif']
            },
            // that is animation class
            animation: {
                fade: 'fade 0.5s ease'
            },
            keyframes: {
                fade: {
                    '0%': { opacity: 0 },
                    '75%': { opacity: 1 }
                }
            }
        }
    },
    plugins: []
}
