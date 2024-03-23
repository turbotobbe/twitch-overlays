import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import pkg from './package.json';

dotenv.config();

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  }
})

export default config
