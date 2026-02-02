import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
   assetsInclude: ["**/*.rar"],
   darkMode: "class",
   content: ["./index.html", "./src/**/*.{js,jsx}"],
})