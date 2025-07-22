document.getElementById('stock-selector')?.addEventListener('change', function() {
  const selectedStock = this.value;
  document.getElementById('live-chart').innerHTML = `<iframe src='https://s.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=5&theme=light' width='100%' height='400'></iframe>`;
});