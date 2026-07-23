
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
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
    'index.csr.html': {size: 860, hash: 'a0022d73869ba8a0dc16f46d87026d9bb40350c6d998da6c96c645026fd3d0e2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 947, hash: '8ccec190d5110031ce805035aad0f320ae95308a8dada4461b0a2e7a18f32816', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 15012, hash: 'c2ceb137fbcab78ec8ccb254851738701f6013734ee1955cf9c6df676ba947dc', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-U2QXMRYN.css': {size: 301, hash: 'OzdcJcCSzQA', text: () => import('./assets-chunks/styles-U2QXMRYN_css.mjs').then(m => m.default)}
  },
};
