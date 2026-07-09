/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'warm-bg': '#FFFAF5',
        'coral': '#E88D5A',
        'coral-dark': '#D4784A',
        'brown': '#4A3728',
        'brown-light': '#8B7355',
        'cream': '#F5ECE1',
        'cream-dark': '#e8d5c0',
        'muted': '#C4B998',
        'green': '#7BC67E',
        'danger': '#E24B4A',
      },
      borderRadius: {
        'card': '14px',
        'tag': '20px',
        'btn': '12px',
      },
      fontFamily: {
        sans: ['-apple-system', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
