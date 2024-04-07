import vue2 from '@vitejs/plugin-vue2';
import vue2Jsx from '@vitejs/plugin-vue2-jsx';
import { resolve } from 'path';
import { resolveWithAlias } from 'path-ops';
import vitePluginGA from 'vite-plugin-ga';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

import pkg from './package.json';
import type { PluginOption } from 'vite';

const alias = {
  '@': resolve('src'),
};

// https://vitejs.dev/config/

export const getConfig = ({ client }: { client?: boolean } = {}) => {
  const plugins: PluginOption[] = [
    vue2(),
    vue2Jsx({
      // fork from @vue/babel-preset-app
      babelPlugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-class-properties',
      ],
    }),
    vitePluginGA({
      id: 'G-S66MPLRFJZ',
      lazy: client,
    }),
  ];

  if (!client) {
    plugins.push(
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,woff}'],
        },
        includeAssets: ['logo.svg'],
        // devOptions: { enabled: true },
        manifest: {
          id: 'CashierDesk',
          name: 'CashierDesk',
          short_name: 'CashierDesk',
          description: 'Cashier desk for web.',
          start_url: 'index.html',
          display: 'fullscreen',
          orientation: 'landscape',
          lang: 'zh_cn',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        // srcDir: 'src',
        // filename: 'sw.ts',
      }),
    );
  }

  return defineConfig({
    base: './',
    publicDir: client ? resolve('public-client') : resolve('public'),
    build: {
      rollupOptions: {
        input: client ? resolve('index-client.html') : resolve('index.html'),
      },
      outDir: client ? resolve('dist-client') : resolve('dist'),
    },
    plugins,
    server: {
      proxy: {
        '/api': {
          target: 'http://test.com',
        },
      },
    },
    resolve: {
      alias,
      extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // ignore external sass warnings for "10px / 2px"
          quietDeps: true,
          // resolve start path for "~", like: "~external/style/var.scss"
          importer: (url: string) => {
            return {
              file: resolveWithAlias(
                url.startsWith('~') ? url.slice(1) : url,
                alias,
              ),
            };
          },
        },
      },
    },
    define: {
      // define package build info, print them in console
      __BUILD__: JSON.stringify({
        name: pkg.name,
        version: pkg.version,
        dateTime: new Date().toLocaleString(),
      }),
    },
    test: {
      environment: 'jsdom',
    },
  });
};
