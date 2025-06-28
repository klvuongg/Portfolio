/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./pages/**/*.{js,ts,sjx,tsx, mdx}",
        "./components/**/*.{js,ts,sjx,tsx, mdx}",
        "./app/**/*.{js,ts,sjx,tsx, mdx}",
    ],
    theme: {
        extend: {
            colors: {
                lightHover: '#fcf4ff',
                darkHover: '#2a004a',
                darkTheme: '#11001F',
            },
            fontFamily: {
                Outfit: ["Outfit", "sans-serif"],
                Ovo: ["Ovo", "serif"],
            }
        },
    },
    plugins: [],
};