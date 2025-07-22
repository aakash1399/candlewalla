// Rule-based prediction engine
function analyzeCandle(data) {
  const { open, high, low, close } = data;
  if (close > open && (close - open) > (high - low) * 0.6) {
    return { direction: 'UP', points: 120, confidence: 78, reason: 'Bullish Engulfing detected' };
  }
  return { direction: 'DOWN', points: -80, confidence: 65, reason: 'Bearish signal detected' };
}