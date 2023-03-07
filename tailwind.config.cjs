/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // primary: '#039BE5',
                primary: '#6c63ff',
                secondary: '#2f2e41'
            },
            fontFamily: {
                primary: ['"Poiret One"', 'sans-serif']
                // primary: ['lato', 'sans-serif']
            }
        }
    },
    plugins: []
}
