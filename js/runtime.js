// 页脚建站运行时间
(function () {
  const start = new Date('2025-01-01 00:00:00');

  const formatZero = (num) => (num > 9 ? num : '0' + num);

  function updateRuntime() {
    const workboard = document.getElementById('workboard');
    if (!workboard) return;

    const now = new Date();
    let diff = now - start;
    if (diff < 0) diff = 0;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    diff -= years * 1000 * 60 * 60 * 24 * 365;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    const currentHour = now.getHours();
    const statusHtml =
      currentHour >= 8 && currentHour < 22
        ? "<span class='boardsign-text'>🌞 小窝营业中 — </span>"
        : "<span class='boardsign-text'>🌙 小窝打烊了 — </span>";

    const timeHtml = `已度过 ${years} 年 ${days} 天 ${formatZero(hours)} : ${formatZero(minutes)} : ${formatZero(seconds)}`;
    workboard.innerHTML = `<div id="runtime">${statusHtml}${timeHtml}</div>`;
  }

  updateRuntime();
  setInterval(updateRuntime, 1000);
})();
