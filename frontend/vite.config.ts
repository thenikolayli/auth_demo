import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  // builds to backend static automatically
  build: {
    outDir: '../backend/static',
  },
  base: process.env.VITE_DOCKER ? "/jonk/" : "/static/",
  server: {
    port: 3000,
    // forwards all api requests to port 8000 for fastapi
    proxy: {
      "/api": "http://localhost:8000",
    }
  }
})