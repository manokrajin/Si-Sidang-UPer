/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'primary': '#2356B2',
                'title-text': '#0B2B65',
                'red-alert': '#E03036',
                'gray-100': '#F7F7F7',
                'white': '#FFFFFF',
                'gray': '#929292',
            }
        },
    },
    plugins: [],
}