/* eslint-disable nuxt/no-cjs-in-config */
const path = require('path')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const CKEditorStyles = require('@ckeditor/ckeditor5-dev-utils').styles

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-ckeditor5',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins/ckeditor.js',
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '@/components/base', extensions: ['vue'] }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
    plugins: [
      // If you set ssr: true that will cause the following error. This error does not affect the operation.
      // ERROR  [CKEditorWebpackPlugin] Error: No translation has been found for the zh language.
      new CKEditorWebpackPlugin({
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: 'en',
        additionalLanguages: 'all',
        addMainLanguageTranslationsToAllAssets: true,
      }),
    ],
    // If you don't add postcss, the CKEditor css will not work.
    postcss: CKEditorStyles.getPostCssConfig({
      themeImporter: {
        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
      },
      minify: true,
    }),

    extend(config, ctx) {
      // If you do not exclude and use raw-loader to load svg, the following errors will be caused.
      // Cannot read property 'getAttribute' of null
      const svgRule = config.module.rules.find((item) => {
        return /svg/.test(item.test)
      })
      svgRule.exclude = [path.join(__dirname, 'node_modules', '@ckeditor')]

      // add svg to load raw-loader
      config.module.rules.push({
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader'],
      })
    },
  },
}
