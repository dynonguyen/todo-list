(function () {
  const theme = localStorage.getItem('dodo-theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();
