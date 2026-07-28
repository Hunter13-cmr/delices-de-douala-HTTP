
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
    'index.csr.html': {size: 1040, hash: '9a8b40f771f436f69534a33b4ce4b1b83f06602befd1b8be3c442da4ed56ca78', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1127, hash: '191d3e4952609374a1ee8ea29a926f610dac0f998a18c3ca03fd1f16097841a6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 29229, hash: '9bf460f33f4a743d89fbae7b04ada01b194ae2f74f67dcd17a65f4e96081edcc', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-U2QXMRYN.css': {size: 301, hash: 'OzdcJcCSzQA', text: () => import('./assets-chunks/styles-U2QXMRYN_css.mjs').then(m => m.default)}
  },
};
