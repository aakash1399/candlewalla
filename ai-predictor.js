/**
 * ai-predictor.js
 * Contains the logic for analyzing candlestick patterns and generating AI predictions.
 *
 * This version uses simplified, rule-based logic for demonstration.
 * For a real-world application, consider machine learning models or more complex
 * technical indicators for better accuracy and point estimation.
 */

/**
 * Checks if a candle is bullish (green).
 * @param {object} candle - {open, high, low, close}
 * @returns {boolean}
 */
const isBullish = (candle) => candle.close > candle.open;

/**
 * Checks if a candle is bearish (red).
 * @param {object} candle - {open, high, low, close}
 * @returns {boolean}
 */
const isBearish = (candle) => candle.close < candle.open;

/**
 * Calculates the real body size of a candle.
 * @param {object} candle - {open, high, low, close}
 * @returns {number}
 */
const getBodySize = (candle) => Math.abs(candle.close - candle.open);

/**
 * Calculates the total range of a candle (high - low).
 * @param {object} candle - {open, high, low, close}
 * @returns {number}
 */
const getRange = (candle) => candle.high - candle.low;

/**
 * Determines the prediction based on the detected pattern.
 * @typedef {object} Prediction
 * @property {string} pattern - The name of the detected pattern.
 * @property {string} direction - Predicted direction (e.g., "⬆️ UP", "⬇️ DOWN", "↔️ NEUTRAL").
 * @property {number} points - Estimated point change.
 * @property {number} confidence - Confidence score (0-100%).
 */

/**
 * Analyzes the latest candlestick data to predict the next move.
 * @param {Array<object>} candles - Array of candlestick data objects, sorted by time (oldest first).
 * Each object: {time, open, high, low, close}.
 * @returns {Prediction}
 */
const analyzeCandleData = (candles) => {
    const numCandles = candles.length;
    if (numCandles < 1) {
        return { pattern: 'No Data', direction: 'N/A', points: 0, confidence: 0 };
    }

    const lastCandle = candles[numCandles - 1];
    const secondLastCandle = numCandles > 1 ? candles[numCandles - 2] : null;
    const thirdLastCandle = numCandles > 2 ? candles[numCandles - 3] : null;

    // --- Default Prediction (if no specific pattern detected) ---
    let prediction = {
        pattern: 'No Clear Pattern',
        direction: '↔️ NEUTRAL',
        points: 0,
        confidence: 30
    };

    // Helper to calculate a simple point estimate based on recent volatility
    const calculatePointEstimate = (directionFactor, volatilityMultiplier = 1) => {
        if (numCandles < 5) return 0;
        const recentCandles = candles.slice(-5); // Look at last 5 candles
        let avgRange = recentCandles.reduce((sum, c) => sum + getRange(c), 0) / recentCandles.length;
        // Adjust for typical market moves, round to a sensible number
        return parseFloat((directionFactor * avgRange * volatilityMultiplier * (Math.random() * 0.5 + 0.75)).toFixed(0));
    };


    // --- 1. Doji ---
    // A very small body relative to its total range.
    if (getBodySize(lastCandle) < (0.05 * getRange(lastCandle))) {
        prediction = {
            pattern: 'Doji (Indecision)',
            direction: '↔️ NEUTRAL',
            points: 0,
            confidence: 50 // Doji signals indecision, so confidence in direction is low
        };
        // If Doji after a strong trend, it might signal reversal
        if (numCandles >= 5) {
             const recentMoves = candles.slice(-5).map(c => c.close - c.open);
             const strongUptrend = recentMoves.every(move => move > 0) && recentMoves.reduce((s,m)=>s+m,0) > (getRange(lastCandle) * 3);
             const strongDowntrend = recentMoves.every(move => move < 0) && recentMoves.reduce((s,m)=>s+m,0) < -(getRange(lastCandle) * 3);

             if (strongUptrend) {
                 prediction.direction = '⬇️ Possible DOWN';
                 prediction.pattern += ' (Potential Bearish Reversal)';
                 prediction.points = calculatePointEstimate(-1, 1.2); // More aggressive down move
                 prediction.confidence = 60;
             } else if (strongDowntrend) {
                 prediction.direction = '⬆️ Possible UP';
                 prediction.pattern += ' (Potential Bullish Reversal)';
                 prediction.points = calculatePointEstimate(1, 1.2); // More aggressive up move
                 prediction.confidence = 60;
             }
        }
    }

    // --- 2. Hammer ---
    // Appears in a downtrend. Small body at the top, long lower wick (2x body), little/no upper wick.
    if (secondLastCandle && isBearish(secondLastCandle) && isBullish(lastCandle) &&
        getBodySize(lastCandle) <= (0.3 * getRange(lastCandle)) && // Small body
        (lastCandle.open - lastCandle.low) >= (2 * getBodySize(lastCandle)) && // Long lower wick
        (lastCandle.high - lastCandle.close) < (0.2 * getBodySize(lastCandle)) // Small upper wick
    ) {
        prediction = {
            pattern: 'Hammer',
            direction: '⬆️ UP',
            points: calculatePointEstimate(1, 1.5), // Bullish move
            confidence: 70
        };
    }

    // --- 3. Engulfing Pattern ---
    if (secondLastCandle) {
        const body1 = getBodySize(secondLastCandle);
        const body2 = getBodySize(lastCandle);

        // Bullish Engulfing: Small bearish candle followed by large bullish candle engulfing it.
        if (isBearish(secondLastCandle) && isBullish(lastCandle) &&
            lastCandle.close > secondLastCandle.open &&
            lastCandle.open < secondLastCandle.close && // 2nd candle's body engulfs 1st
            body2 > body1 * 1.5 // Significant engulfing
        ) {
            prediction = {
                pattern: 'Bullish Engulfing',
                direction: '⬆️ Strong UP',
                points: calculatePointEstimate(1, 2.0), // Strong bullish move
                confidence: 85
            };
        }
        // Bearish Engulfing: Small bullish candle followed by large bearish candle engulfing it.
        else if (isBullish(secondLastCandle) && isBearish(lastCandle) &&
            lastCandle.close < secondLastCandle.open &&
            lastCandle.open > secondLastCandle.close && // 2nd candle's body engulfs 1st
            body2 > body1 * 1.5 // Significant engulfing
        ) {
            prediction = {
                pattern: 'Bearish Engulfing',
                direction: '⬇️ Strong DOWN',
                points: calculatePointEstimate(-1, 2.0), // Strong bearish move
                confidence: 85
            };
        }
    }

    // --- 4. Three Red Candles (Three Black Crows simplified) ---
    // Three consecutive bearish candles, each closing lower than the previous.
    if (numCandles >= 3 &&
        isBearish(lastCandle) && isBearish(secondLastCandle) && isBearish(thirdLastCandle) &&
        lastCandle.close < secondLastCandle.close &&
        secondLastCandle.close < thirdLastCandle.close &&
        getBodySize(lastCandle) > 0 && getBodySize(secondLastCandle) > 0 && getBodySize(thirdLastCandle) > 0 // Ensure they are not Dojis
    ) {
        prediction = {
            pattern: 'Three Red Candles (Downtrend)',
            direction: '⬇️ DOWN',
            points: calculatePointEstimate(-1, 1.8), // Significant down move
            confidence: 80
        };
    }


    // Ensure points are reasonable for simulated data
    if (Math.abs(prediction.points) > 500) { // Cap for very large index movements
         prediction.points = prediction.points > 0 ? 500 : -500;
    }


    return prediction;
};
