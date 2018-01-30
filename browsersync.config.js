module.exports = {
  ui: {
    port: 3002,
    weinre: {
      port: 8080,
    },
  },
  files: ['dist/**'],
  open: false,
  port: 3000,
  reloadDelay: 500,
  watchOptions: {
    ignoreInitial: false,
  },
  server: {
    baseDir: 'dist',
    index: 'index.html',
    serveStaticOptions: {
      extensions: ['html'],
    },
    routes: {
      '/docs': 'docs',
    },
  },
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn(snippet, match) {
        return snippet + match;
      },
    },
  },
};
