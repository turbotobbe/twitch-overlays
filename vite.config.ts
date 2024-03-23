import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
})

export default config
