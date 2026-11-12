/**
 * 动态标题：切换标签页时浏览器标题变化（文案来自 haiyong.site 教程）
 * 离开：w(ﾟДﾟ)w 不要走！再看看嘛！
 * 回来：♪(^∇^*)欢迎回来！+ 原标题，两秒后变回正常标题
 */
(() => {
  'use strict';
  if (window.__dynamicTitle) return;
  window.__dynamicTitle = true;

  const LEAVE = 'w(ﾟДﾟ)w 不要走！再看看嘛！';
  const BACK = '♪(^∇^*)欢迎回来！';
  const original = document.title;
  let timer;

  document.addEventListener('visibilitychange', () => {
    clearTimeout(timer);
    if (document.hidden) {
      document.title = LEAVE;
    } else {
      document.title = BACK + original;
      timer = setTimeout(() => { document.title = original; }, 2000);
    }
  });
})();
