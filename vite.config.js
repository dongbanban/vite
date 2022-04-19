/*
 * @FilePath: /click/Users/derbysofti41/vite/vite.config.js
 * @author: dongyang(yang.dong@derbysoft.net)
 */
/*
 * @file: Describe the file
 * @author: dongyang
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const { resolveRootPath } = require('./utils/index');

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxInject: false
  },
  resolve: {
    alias: [
      { find: 'src', replacement: resolveRootPath('src') },
      { find: 'assets', replacement: resolveRootPath('assets') },
      { find: 'mock', replacement: resolveRootPath('mock') },
    ]
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ["import", {
            libraryName: "antd",
            libraryDirectory: "es",
            style: true
          }]
        ]
      }
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: {
          'primary-color': '#7546C9',
          'link-color': '#7546C9'
        }
      }
    }
  },
  server: {
    hmr: {
      overlay: false
    }, // 禁止服务器错误遮罩
    port: 8888,
    proxy: {
      // '/': {
      //   target: '',
      //   secure: false,
      //   changeOrigin: true
      // }
    }
  }
})
