import { addDynamicIconSelectors } from '@iconify/tailwind';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  darkMode: 'class',
  plugins: [daisyui, addDynamicIconSelectors()],

  daisyui: {
    styled: true,
    themes: ['light', 'dark'],
    darkTheme: 'dark',
    utils: true,
    themeRoot: ':root',
    logs: false
  }
};
