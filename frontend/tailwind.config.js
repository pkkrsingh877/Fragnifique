/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],       // For general text
        heading: ['Poppins', 'sans-serif'], // For headings
      },
      colors: {
        palette: {
          // Neutral Colors
          primary: '#FFFFFF',         // White (Main background or main sections)
          secondary: '#F7F7F7',       // Light Grey (Subtle background or soft sections)
          accent: '#D1D1D1',          // Medium Grey (Borders, subtle accents)
          neutral: '#333333',         // Dark Grey (Primary text color)
          highlight: '#444444',       // Charcoal (Secondary text or hover states)
          softwhite: '#F4F4F4',       // Off-White (Slightly warmer background)
        },
      },
      boxShadow: {
        'highlight': '0 4px 6px rgba(68, 68, 68, 0.4)'
      },
    },
  },
  plugins: [],
};
