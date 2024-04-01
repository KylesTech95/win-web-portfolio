// vite.config.js
import ViteRestart from 'vite-plugin-restart'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  server: {
    preTransformRequests: false
  },
  plugins: [
    tsconfigPaths({
      loose:true,
      root: './',
    }),
    ViteRestart({
      restart: [
        'my.config.[jt]s',
      ]
    })
  ],
}