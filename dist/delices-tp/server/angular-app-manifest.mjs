
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 389, hash: '834cfc0a57b08851a640bad045b2817d86c22cd64380f17fdb02fc4ae248eb86', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 929, hash: 'ab899592de2fadc2c41c92d487ed62bca86131697bac090f11eb0cdc70cb95b4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 23987, hash: 'a0df6b69f1ff97899518aa2cfe210e2e4a545abda296896fb9d3652dac3fcd2a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}
  },
};
