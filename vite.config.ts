import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //     '#': path.resolve(__dirname, './')
  //   }
  // }
})

export default config
