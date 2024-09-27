/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}', // Caso existam arquivos na pasta raiz de 'pages'
    './components/**/*.{js,ts,jsx,tsx}', // Inclua também a pasta components, se necessário
  ],
  // Certifique-se de que este caminho está correto
  theme: {
    extend: {},
  },
  plugins: [],
};
