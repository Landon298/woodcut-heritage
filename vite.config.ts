import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import sourceIdentifierPlugin from 'vite-plugin-source-identifier'

const isProd = process.env.BUILD_MODE === 'prod'

export default defineConfig({
  // 🔥 强制绝对路径，GitHub Pages 唯一正确配置
  base: "/woodcut-heritage/",

  build: {
    outDir: "dist",
    emptyOutDir: true,
    // 强制 assets 目录，避免路径错乱
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // 强制资源路径格式，确保打包正确
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js"
      }
    }
  },

  plugins: [
    react(),
    sourceIdentifierPlugin({
      enabled: !isProd,
      attributePrefix: 'data-matrix',
      includeProps: true,
    })
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
