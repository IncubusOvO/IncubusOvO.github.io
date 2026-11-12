/**
 * Live2D 模型资源预热：在看板娘初始化前，带重试地把默认模型（蕾姆）的关键资源
 * 拉进浏览器 HTTP 缓存，规避网络偶发断流导致的渲染挂起。
 * 通过 inject.head 引入，顺序必须在 /live2d-widget/autoload.js 之前。
 */
(() => {
  'use strict';
  if (window.__l2dPreload) return;
  window.__l2dPreload = true;

  const FILES = [
    '/live2d-widget/models/rem/rem_a.json',
    '/live2d-widget/models/rem/remu.moc',
    '/live2d-widget/models/rem/remu2048_a/texture_00.png',
    '/live2d-widget/models/rem/remu.physics.json',
  ];
  const RETRY_WAIT = 800;

  const fetchWarm = (url, left) =>
    fetch(url, { cache: 'force-cache' }).catch(() => null).then(r => {
      if (r && r.ok) return;
      if (left <= 0) return;
      return new Promise(res => setTimeout(res, RETRY_WAIT)).then(() => fetchWarm(url, left - 1));
    });

  const imageWarm = (url, left) => {
    const img = new Image();
    img.onload = () => {};
    img.onerror = () => { if (left > 0) setTimeout(() => imageWarm(url, left - 1), RETRY_WAIT); };
    img.src = url;
  };

  FILES.forEach(u => {
    if (u.endsWith('.png')) imageWarm(u, 4);
    else fetchWarm(u, 4);
  });
})();
