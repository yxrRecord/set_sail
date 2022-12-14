import { ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import viteImagemin from "vite-plugin-imagemin";
import compressPlugin from "vite-plugin-compression";
import { resolve } from "path";

export default ({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    // env.VITE_BASE_NAME,
    base: "./",
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        webp: {
          quality: 75,
        },
        mozjpeg: {
          quality: 65,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
              active: false,
            },
            {
              name: "removeEmptyAttrs",
              active: false,
            },
          ],
        },
      }),
      compressPlugin({
        ext: ".gz", //gz br
        algorithm: "gzip", //brotliCompress gzip
        deleteOriginFile: false,
      }),
    ],
    build: {
      outDir: "dist",
      assetsDir: "static",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
      // terserOptions: {
      //     compress: {
      //         drop_console: false,
      //         drop_debugger: false
      //     }
      // }
    },
    resolve: {
      alias: {
        //添加别名
        "@": resolve(__dirname, "src"),
        "@assets": resolve(__dirname, "src/assets"),
        "@components": resolve(__dirname, "src/components"),
        "@config": resolve(__dirname, "src/config"),
        "@router": resolve(__dirname, "src/router"),
        "@store": resolve(__dirname, "src/store"),
        "@tools": resolve(__dirname, "src/tools"),
        "@utils": resolve(__dirname, "src/utils"),
        "@pages": resolve(__dirname, "src/pages"),
        "@types": resolve(__dirname, "src/types"),
        "@api": resolve(__dirname, "src/api"),
        // ...alias
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"], // 忽略扩展名
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 引入 mixin.scss 这样就可以在全局中使用 theme.scss中预定义的变量了
          additionalData: '@use "@assets/style/theme.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: ["jquery"],
    },
    server: {
      host: "localhost",
      hmr: true,
      force: true,
      port: 9527,
      proxy: {
        "/api": {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
