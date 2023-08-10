const { join } = require("path");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    join(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
