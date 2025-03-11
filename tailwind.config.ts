import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundImage:{
      'brasao': "url('../assets/brasao.png')",
      'imgFundo': "url('../assets/background1.jpg')",
    },
    extend: {
      colors:{
        'primary-blue': '#3A3B7B',
        'secondary-blue': '#5151F8',
        'light-gray': '#EEEEFF',
        'text-primary': '#252A34',
        'text-second': '#555555',
        'text-light': '#9497A1',
        'dark-gray': '#263238',
        'text-gray-footer': '#F5F7FA',
        'text-white': '#FFFFFF',
      }
    },
  },
  plugins: [],
};
export default config;
