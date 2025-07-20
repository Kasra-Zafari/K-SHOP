/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./src/**/*.{js,ts,jsx,tsx,mdx}",
"./components/**/*.{js,ts,jsx,tsx,mdx}",
],
theme: {
extend: {
screens: {
'xs': '320px',
},
},
},
plugins: [
require('@tailwindcss/aspect-ratio'),
],
}