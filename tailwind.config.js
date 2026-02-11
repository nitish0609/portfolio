/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Minimal palette - black, grey, white
                'pure-black': '#000000',
                'off-white': '#FAFAFA',
                'dark-grey': '#1A1A1A',
                'mid-grey': '#2A2A2A',
                'light-grey': '#B0B0B0', // Brighter for visibility
                'accent': '#BFFF00', // Lime green accent
            },
            fontFamily: {
                'display': ['Bebas Neue', 'sans-serif'], // Ultra condensed
                'mono': ['Space Mono', 'monospace'], // Techy
                'body': ['Inter', 'sans-serif'], // Clean
                'serif': ['Playfair Display', 'serif'], // Elegant
            },
            fontSize: {
                'huge': ['10rem', { lineHeight: '0.9' }], // 160px
                'massive': ['8rem', { lineHeight: '0.9' }], // 128px
                'giant': ['6rem', { lineHeight: '0.95' }], // 96px
                'mega': ['4rem', { lineHeight: '1' }], // 64px
                'tiny': ['0.625rem', { lineHeight: '1.2' }], // 10px
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'slide-up': 'slideUp 0.6s ease-out',
                'fade-in': 'fadeIn 0.8s ease-out',
                'scramble': 'scramble 0.3s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scramble: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
        },
    },
    plugins: [],
}
