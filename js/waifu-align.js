/**
 * 看板娘对话框与文章卡片左缘动态相切。
 * 运行时读取主栏卡片的真实左缘，把气泡右缘对齐到该位置，
 * 自适应不同屏幕宽度，避免写死像素在宽屏下留缝或压住正文。
 */
(() => {
  'use strict';

  function mainCard() {
    return (
      document.querySelector('#post') ||
      document.querySelector('#recent-posts .recent-post-item') ||
      document.querySelector('.article-sort-item') ||
      document.querySelector('.layout > div:first-child') ||
      null
    );
  }

  function align() {
    const waifu = document.getElementById('waifu');
    if (waifu && waifu.classList.contains('waifu-hidden')) return;

    const tips = document.getElementById('waifu-tips');
    const card = mainCard();
    if (!tips || !card) return;

    const cardLeft = card.getBoundingClientRect().left;
    const tipsLeft = tips.getBoundingClientRect().left;
    let w = cardLeft - tipsLeft;

    // 窄屏放不下时保持 CSS 默认宽度；超宽屏限制气泡不要拉得过长
    if (!Number.isFinite(w) || w < 180) return;
    if (w > 320) w = 320;

    // 样式表中 #waifu-tips 的宽度带 !important，内联普通写法会被覆盖，
    // 因此这里以 important 优先级写入
    tips.style.setProperty('width', w + 'px', 'important');
  }

  function schedule() {
    requestAnimationFrame(align);
  }

  // 气泡由 live2d 异步注入，监听 DOM 等它出现后再对齐
  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule);
  document.addEventListener('pjax:complete', schedule);

  // 模型切换 / 文案刷新后兜底重排
  setInterval(align, 1200);
})();
