/** @type {import('tailwindcss').Config} */
export const content = ["index.html",
  "./src/**/*.{js,ts,jsx,tsx,vue}",];
export const theme = {
  extend: {
    colors: {
      'custom-cursor': '#FFF', // Define a custom cursor color
    },
  },
};
export const plugins = [];

