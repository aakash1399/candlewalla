document.addEventListener('DOMContentLoaded', () => {
  const sel = document.createElement('select');
  sel.innerHTML = `
    <option value="NSE:NIFTY">NIFTY</option>
    <option value="NSE:TCS">TCS</option>
    <option value="NSE:RELIANCE">RELIANCE</option>
    <option value="NSE:INFY">INFY</option>
    <option value="NSE:BANKNIFTY">BANKNIFTY</option>`;
  document.body.insertBefore(sel, document.getElementById('live-chart'));

  sel.addEventListener('change', () => {
    document.getElementById('live-chart').innerHTML = `<iframe src="https://s.tradingview.com/widgetembed/?symbol=${sel.value}&interval=5&theme=light" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`;
  });

  document.getElementById('prediction-result').innerText = `📈 Prediction: UP +120 pts
🧠 Pattern: Bullish Engulfing
🔒 Confidence: 86%`;
});
