document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeSwitch = document.getElementById('checkbox');
    const languageSelector = document.getElementById('language-selector');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    // --- Theme Toggle ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeSwitch.checked = true;
        }
    } else {
        // Set default theme based on system preference or light
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
        } else {
            body.setAttribute('data-theme', 'light');
            themeSwitch.checked = false;
        }
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        // Re-render chart if on AI page to apply new colors
        if (window.location.pathname.includes('ai.html')) {
            updateChartColors();
        }
    });

    // --- Language Switch ---
    const translations = {
        en: {
            // General Nav
            'Home': 'Home',
            'AI Prediction': 'AI Prediction',
            'Learn': 'Learn',
            'About': 'About',
            'Dark Mode': 'Dark Mode',
            // Index page
            'Your Gateway to Market Insights': 'Your Gateway to Market Insights',
            'Candlewalla helps you understand market trends and make informed decisions with AI-powered predictions and educational resources.': 'Candlewalla helps you understand market trends and make informed decisions with AI-powered predictions and educational resources.',
            'Get AI Prediction': 'Get AI Prediction',
            // AI Prediction page
            'AI-Powered Candlestick Prediction': 'AI-Powered Candlestick Prediction',
            'Select Stock:': 'Select Stock:',
            'AI Prediction': 'AI Prediction', // Re-use
            'Pattern:': 'Pattern:',
            'Direction:': 'Direction:',
            'Move:': 'Move:',
            'Confidence:': 'Confidence:',
            'How Candlewalla Predicts': 'How Candlewalla Predicts',
            'Our AI analyzes real-time OHLC (Open, High, Low, Close) data using a set of known candlestick pattern rules. When a pattern is detected, it generates a prediction for the next candle\'s direction and estimated point movement.': 'Our AI analyzes real-time OHLC (Open, High, Low, Close) data using a set of known candlestick pattern rules. When a pattern is detected, it generates a prediction for the next candle\'s direction and estimated point movement.',
            'Key patterns analyzed include Doji (uncertainty/reversal), Hammer (possible uptrend), Engulfing (strong reversal), and three consecutive Red Candles (downtrend).': 'Key patterns analyzed include Doji (uncertainty/reversal), Hammer (possible uptrend), Engulfing (strong reversal), and three consecutive Red Candles (downtrend).',
            'Company Insights (Placeholder)': 'Company Insights (Placeholder)',
            'This section will feature real-time company news, historical performance, and future outlook. (Requires integration with external APIs for live data).': 'This section will feature real-time company news, historical performance, and future outlook. (Requires integration with external APIs for live data).',
            'Latest News Headline 1...': 'Latest News Headline 1...',
            'Latest News Headline 2...': 'Latest News Headline 2...',
            // About page
            'About Candlewalla': 'About Candlewalla',
            'Candlewalla is an open-source project designed to provide insights into stock market trends through candlestick pattern analysis. Our goal is to make technical analysis more accessible and understandable for everyone, from beginners to experienced traders.': 'Candlewalla is an open-source project designed to provide insights into stock market trends through candlestick pattern analysis. Our goal is to make technical analysis more accessible and understandable for everyone, from beginners to experienced traders.',
            'While our AI prediction feature uses known technical analysis patterns to give an estimated next move, it\'s crucial to remember that all market predictions carry inherent risks and should not be taken as financial advice. Always do your own research and consult with a financial advisor before making any investment decisions.': 'While our AI prediction feature uses known technical analysis patterns to give an estimated next move, it\'s crucial to remember that all market predictions carry inherent risks and should not be taken as financial advice. Always do your own research and consult with a financial advisor before making any investment decisions.',
            'Our Vision': 'Our Vision',
            'To empower individuals with tools and knowledge to better understand market dynamics and make more informed trading decisions.': 'To empower individuals with tools and knowledge to better understand market dynamics and make more informed trading decisions.',
            'Technology Used': 'Technology Used',
            // Learn page
            'Learn Candlestick Patterns': 'Learn Candlestick Patterns',
            'Understanding candlestick patterns is crucial for technical analysis. These patterns provide insights into market sentiment and potential future price movements.': 'Understanding candlestick patterns is crucial for technical analysis. These patterns provide insights into market sentiment and potential future price movements.',
            '1. Anatomy of a Candlestick': '1. Anatomy of a Candlestick',
            'Every candlestick tells a story about the price action during a specific period. It consists of a \'real body\' and \'wicks\' (or shadows).': 'Every candlestick tells a story about the price action during a specific period. It consists of a \'real body\' and \'wicks\' (or shadows).',
            '**Open:** The price at the beginning of the period.': '**Open:** The price at the beginning of the period.',
            '**Close:** The price at the end of the period.': '**Close:** The price at the end of the period.',
            '**High:** The highest price reached during the period.': '**High:** The highest price reached during the period.',
            '**Low:** The lowest price reached during the period.': '**Low:** The lowest price reached during the period.',
            '**Real Body:** The rectangular part, showing the range between open and close.': '**Real Body:** The rectangular part, showing the range between open and close.',
            '**Wicks/Shadows:** Thin lines extending from the body, showing the high/low range.': '**Wicks/Shadows:** Thin lines extending from the body, showing the high/low range.',
            '**Green/White Candle:** Close price is higher than the open price (bullish).': '**Green/White Candle:** Close price is higher than the open price (bullish).',
            '**Red/Black Candle:** Close price is lower than the open price (bearish).': '**Red/Black Candle:** Close price is lower than the open price (bearish).',
            '2. Key Candlestick Patterns Analyzed by Candlewalla AI': '2. Key Candlestick Patterns Analyzed by Candlewalla AI',
            'Our AI uses specific logic to detect the following common patterns:': 'Our AI uses specific logic to detect the following common patterns:',
            'Doji': 'Doji',
            'A Doji forms when the open and close prices are virtually the same. It looks like a cross, inverted cross, or plus sign. It indicates indecision between buyers and sellers, and can often signal a potential reversal when appearing after a strong trend.': 'A Doji forms when the open and close prices are virtually the same. It looks like a cross, inverted cross, or plus sign. It indicates indecision between buyers and sellers, and can often signal a potential reversal when appearing after a strong trend.',
            'Prediction:': 'Prediction:',
            'Uncertainty, potential reversal.': 'Uncertainty, potential reversal.',
            'Hammer': 'Hammer',
            'The Hammer is a bullish reversal pattern, appearing at the bottom of a downtrend. It has a small body near the top of the trading range, a long lower wick (at least twice the length of the body), and a little to no upper wick. It suggests that despite selling pressure, buyers stepped in to push prices back up.': 'The Hammer is a bullish reversal pattern, appearing at the bottom of a downtrend. It has a small body near the top of the trading range, a long lower wick (at least twice the length of the body), and a little to no upper wick. It suggests that despite selling pressure, buyers stepped in to push prices back up.',
            'Possible uptrend or bullish reversal.': 'Possible uptrend or bullish reversal.',
            'Engulfing Pattern (Bullish/Bearish)': 'Engulfing Pattern (Bullish/Bearish)',
            'This is a strong reversal pattern. It consists of two candles, where the second candle\'s body completely \'engulfs\' the first candle\'s body.': 'This is a strong reversal pattern. It consists of two candles, where the second candle\'s body completely \'engulfs\' the first candle\'s body.',
            'Bullish Engulfing:': 'Bullish Engulfing:',
            'A small bearish candle is followed by a large bullish candle that completely engulfs the previous one, often at the end of a downtrend.': 'A small bearish candle is followed by a large bullish candle that completely engulfs the previous one, often at the end of a downtrend.',
            'Bearish Engulfing:': 'Bearish Engulfing:',
            'A small bullish candle is followed by a large bearish candle that completely engulfs the previous one, often at the end of an uptrend.': 'A small bullish candle is followed by a large bearish candle that completely engulfs the previous one, often at the end of an uptrend.',
            'Strong reversal signal.': 'Strong reversal signal.',
            'Three Red Candles (Three Black Crows)': 'Three Red Candles (Three Black Crows)',
            'This pattern consists of three consecutive long bearish (red) candlesticks that open within the body of the previous candle and close lower than the previous candle\'s low. It\'s a strong bearish reversal pattern, indicating persistent selling pressure and the likely continuation of a downtrend.': 'This pattern consists of three consecutive long bearish (red) candlesticks that open within the body of the previous candle and close lower than the previous candle\'s low. It\'s a strong bearish reversal pattern, indicating persistent selling pressure and the likely continuation of a downtrend.',
            'Strong downtrend likely to continue.': 'Strong downtrend likely to continue.',
            '3. How Candlewalla\'s AI Learns and Predicts': '3. How Candlewalla\'s AI Learns and Predicts',
            'Our AI system analyzes the Open, High, Low, and Close (OHLC) prices of each candlestick. It doesn\'t \'learn\' in the typical machine learning sense with neural networks (in this version). Instead, it applies a set of pre-defined, rule-based logic to identify the specific patterns described above.': 'Our AI system analyzes the Open, High, Low, and Close (OHLC) prices of each candlestick. It doesn\'t \'learn\' in the typical machine learning sense with neural networks (in this version). Instead, it applies a set of pre-defined, rule-based logic to identify the specific patterns described above.',
            'For example, to detect a \'Doji\', it checks if the absolute difference between the open and close price is very small compared to the candle\'s total range. For \'Hammer\', it checks the ratio of the lower wick to the body and the overall shape.': 'For example, to detect a \'Doji\', it checks if the absolute difference between the open and close price is very small compared to the candle\'s total range. For \'Hammer\', it checks the ratio of the lower wick to the body and the overall shape.',
            'Based on the detected pattern, our system then provides a prediction (Up/Down/Neutral), an estimated point move, and a confidence level derived from the strength and typical reliability of that pattern.': 'Based on the detected pattern, our system then provides a prediction (Up/Down/Neutral), an estimated point move, and a confidence level derived from the strength and typical reliability of that pattern.',
            'Future Upgrade:': 'Future Upgrade:',
            'This system can be upgraded in the future to incorporate real machine learning models that \'learn\' from vast historical data, sentiment analysis from news, and other complex factors for more advanced predictions.': 'This system can be upgraded in the future to incorporate real machine learning models that \'learn\' from vast historical data, sentiment analysis from news, and other complex factors for more advanced predictions.',
        },
        hi: {
            // General Nav
            'Home': 'होम',
            'AI Prediction': 'एआई भविष्यवाणी',
            'Learn': 'सीखें',
            'About': 'हमारे बारे में',
            'Dark Mode': 'डार्क मोड',
            // Index page
            'Your Gateway to Market Insights': 'बाजार की जानकारी का आपका प्रवेश द्वार',
            'Candlewalla helps you understand market trends and make informed decisions with AI-powered predictions and educational resources.': 'कैंडलवाला आपको एआई-संचालित भविष्यवाणियों और शैक्षिक संसाधनों के साथ बाजार के रुझानों को समझने और सूचित निर्णय लेने में मदद करता है।',
            'Get AI Prediction': 'एआई भविष्यवाणी प्राप्त करें',
            // AI Prediction page
            'AI-Powered Candlestick Prediction': 'एआई-संचालित कैंडलस्टिक भविष्यवाणी',
            'Select Stock:': 'स्टॉक चुनें:',
            'AI Prediction': 'एआई भविष्यवाणी', // Re-use
            'Pattern:': 'पैटर्न:',
            'Direction:': 'दिशा:',
            'Move:': 'मूव:',
            'Confidence:': 'आत्मविश्वास:',
            'How Candlewalla Predicts': 'कैंडलवाला कैसे भविष्यवाणी करता है',
            'Our AI analyzes real-time OHLC (Open, High, Low, Close) data using a set of known candlestick pattern rules. When a pattern is detected, it generates a prediction for the next candle\'s direction and estimated point movement.': 'हमारा एआई ज्ञात कैंडलस्टिक पैटर्न नियमों के एक सेट का उपयोग करके वास्तविक समय ओएचएलसी (ओपन, हाई, लो, क्लोज) डेटा का विश्लेषण करता है। जब एक पैटर्न का पता चलता है, तो यह अगली कैंडल की दिशा और अनुमानित बिंदु गति के लिए एक भविष्यवाणी उत्पन्न करता है।',
            'Key patterns analyzed include Doji (uncertainty/reversal), Hammer (possible uptrend), Engulfing (strong reversal), and three consecutive Red Candles (downtrend).': 'विश्लेषण किए गए प्रमुख पैटर्न में डोजी (अनिश्चितता/रिवर्सल), हैमर (संभावित अपट्रेंड), एनगल्फिंग (मजबूत रिवर्सल), और लगातार तीन लाल कैंडल (डाउनट्रेंड) शामिल हैं।',
            'Company Insights (Placeholder)': 'कंपनी अंतर्दृष्टि (प्लेसहोल्डर)',
            'This section will feature real-time company news, historical performance, and future outlook. (Requires integration with external APIs for live data).': 'इस खंड में वास्तविक समय कंपनी समाचार, ऐतिहासिक प्रदर्शन और भविष्य का दृष्टिकोण शामिल होगा। (लाइव डेटा के लिए बाहरी एपीआई के साथ एकीकरण की आवश्यकता है)।',
            'Latest News Headline 1...': 'नवीनतम समाचार शीर्षक 1...',
            'Latest News Headline 2...': 'नवीनतम समाचार शीर्षक 2...',
            // About page
            'About Candlewalla': 'कैंडलवाला के बारे में',
            'Candlewalla is an open-source project designed to provide insights into stock market trends through candlestick pattern analysis. Our goal is to make technical analysis more accessible and understandable for everyone, from beginners to experienced traders.': 'कैंडलवाला कैंडलस्टिक पैटर्न विश्लेषण के माध्यम से शेयर बाजार के रुझानों में अंतर्दृष्टि प्रदान करने के लिए डिज़ाइन किया गया एक ओपन-सोर्स प्रोजेक्ट है। हमारा लक्ष्य शुरुआती लोगों से लेकर अनुभवी व्यापारियों तक सभी के लिए तकनीकी विश्लेषण को अधिक सुलभ और समझने योग्य बनाना है।',
            'While our AI prediction feature uses known technical analysis patterns to give an estimated next move, it\'s crucial to remember that all market predictions carry inherent risks and should not be taken as financial advice. Always do your own research and consult with a financial advisor before making any investment decisions.': 'हालांकि हमारी एआई भविष्यवाणी सुविधा अनुमानित अगली चाल देने के लिए ज्ञात तकनीकी विश्लेषण पैटर्न का उपयोग करती है, यह याद रखना महत्वपूर्ण है कि सभी बाजार भविष्यवाणियों में अंतर्निहित जोखिम होते हैं और इन्हें वित्तीय सलाह के रूप में नहीं लिया जाना चाहिए। कोई भी निवेश निर्णय लेने से पहले हमेशा अपना खुद का शोध करें और एक वित्तीय सलाहकार से परामर्श करें।',
            'Our Vision': 'हमारा दृष्टिकोण',
            'To empower individuals with tools and knowledge to better understand market dynamics and make more informed trading decisions.': 'व्यक्तियों को बाजार की गतिशीलता को बेहतर ढंग से समझने और अधिक सूचित व्यापारिक निर्णय लेने के लिए उपकरणों और ज्ञान के साथ सशक्त बनाना।',
            'Technology Used': 'उपयोग की गई तकनीक',
            // Learn page
            'Learn Candlestick Patterns': 'कैंडलस्टिक पैटर्न सीखें',
            'Understanding candlestick patterns is crucial for technical analysis. These patterns provide insights into market sentiment and potential future price movements.': 'तकनीकी विश्लेषण के लिए कैंडलस्टिक पैटर्न को समझना महत्वपूर्ण है। ये पैटर्न बाजार की भावना और संभावित भविष्य की कीमत गतिविधियों में अंतर्दृष्टि प्रदान करते हैं।',
            '1. Anatomy of a Candlestick': '1. एक कैंडलस्टिक की संरचना',
            'Every candlestick tells a story about the price action during a specific period. It consists of a \'real body\' and \'wicks\' (or shadows).': 'हर कैंडलस्टिक एक विशिष्ट अवधि के दौरान मूल्य कार्रवाई के बारे में एक कहानी बताती है। इसमें एक \'वास्तविक शरीर\' और \'विक\' (या छाया) शामिल होते हैं।',
            '**Open:** The price at the beginning of the period.': '**ओपन:** अवधि की शुरुआत में कीमत।',
            '**Close:** The price at the end of the period.': '**क्लोज:** अवधि के अंत में कीमत।',
            '**High:** The highest price reached during the period.': '**हाई:** अवधि के दौरान पहुंची उच्चतम कीमत।',
            '**Low:** The lowest price reached during the period.': '**लो:** अवधि के दौरान पहुंची निम्नतम कीमत।',
            '**Real Body:** The rectangular part, showing the range between open and close.': '**वास्तविक शरीर:** आयताकार भाग, जो ओपन और क्लोज के बीच की सीमा को दर्शाता है।',
            '**Wicks/Shadows:** Thin lines extending from the body, showing the high/low range.': '**विक/छाया:** शरीर से फैली हुई पतली रेखाएं, जो उच्च/निम्न सीमा को दर्शाती हैं।',
            '**Green/White Candle:** Close price is higher than the open price (bullish).': '**हरा/सफेद कैंडल:** क्लोज कीमत ओपन कीमत से अधिक है (तेजी)।',
            '**Red/Black Candle:** Close price is lower than the open price (bearish).': '**लाल/काला कैंडल:** क्लोज कीमत ओपन कीमत से कम है (मंदी)।',
            '2. Key Candlestick Patterns Analyzed by Candlewalla AI': '2. कैंडलवाला एआई द्वारा विश्लेषण किए गए प्रमुख कैंडलस्टिक पैटर्न',
            'Our AI uses specific logic to detect the following common patterns:': 'हमारा एआई निम्नलिखित सामान्य पैटर्न का पता लगाने के लिए विशिष्ट तर्क का उपयोग करता है:',
            'Doji': 'डोजी',
            'A Doji forms when the open and close prices are virtually the same. It looks like a cross, inverted cross, or plus sign. It indicates indecision between buyers and sellers, and can often signal a potential reversal when appearing after a strong trend.': 'डोजी तब बनता है जब ओपन और क्लोज की कीमतें वस्तुतः समान होती हैं। यह एक क्रॉस, उलटा क्रॉस, या प्लस चिह्न जैसा दिखता है। यह खरीदारों और विक्रेताओं के बीच अनिश्चितता को इंगित करता है, और अक्सर एक मजबूत प्रवृत्ति के बाद दिखाई देने पर संभावित उलटफेर का संकेत दे सकता है।',
            'Prediction:': 'भविष्यवाणी:',
            'Uncertainty, potential reversal.': 'अनिश्चितता, संभावित उलटफेर।',
            'Hammer': 'हैमर',
            'The Hammer is a bullish reversal pattern, appearing at the bottom of a downtrend. It has a small body near the top of the trading range, a long lower wick (at least twice the length of the body), and a little to no upper wick. It suggests that despite selling pressure, buyers stepped in to push prices back up.': 'हैमर एक तेजी का उलटफेर पैटर्न है, जो डाउनट्रेंड के निचले भाग में दिखाई देता है। इसमें ट्रेडिंग रेंज के शीर्ष के पास एक छोटा शरीर, एक लंबी निचली विक (शरीर की लंबाई का कम से कम दोगुना) और बहुत कम या कोई ऊपरी विक नहीं होता है। यह बताता है कि बिकवाली के दबाव के बावजूद, खरीदारों ने कीमतों को वापस ऊपर धकेलने के लिए कदम बढ़ाया।',
            'Possible uptrend or bullish reversal.': 'संभावित अपट्रेंड या तेजी का उलटफेर।',
            'Engulfing Pattern (Bullish/Bearish)': 'एंगल्फिंग पैटर्न (तेजी/मंदी)',
            'This is a strong reversal pattern. It consists of two candles, where the second candle\'s body completely \'engulfs\' the first candle\'s body.': 'यह एक मजबूत उलटफेर पैटर्न है। इसमें दो कैंडल शामिल होते हैं, जहां दूसरी कैंडल का शरीर पहली कैंडल के शरीर को पूरी तरह से \'निगल\' लेता है।',
            'Bullish Engulfing:': 'तेजी का एंगल्फिंग:',
            'A small bearish candle is followed by a large bullish candle that completely engulfs the previous one, often at the end of a downtrend.': 'एक छोटी मंदी वाली कैंडल के बाद एक बड़ी तेजी वाली कैंडल होती है जो पिछली वाली को पूरी तरह से निगल जाती है, अक्सर एक डाउनट्रेंड के अंत में।',
            'Bearish Engulfing:': 'मंदी का एंगल्फिंग:',
            'A small bullish candle is followed by a large bearish candle that completely engulfs the previous one, often at the end of an uptrend.': 'एक छोटी तेजी वाली कैंडल के बाद एक बड़ी मंदी वाली कैंडल होती है जो पिछली वाली को पूरी तरह से निगल जाती है, अक्सर एक अपट्रेंड के अंत में।',
            'Strong reversal signal.': 'मजबूत उलटफेर संकेत।',
            'Three Red Candles (Three Black Crows)': 'तीन लाल कैंडल (थ्री ब्लैक क्रो)',
            'This pattern consists of three consecutive long bearish (red) candlesticks that open within the body of the previous candle and close lower than the previous candle\'s low. It\'s a strong bearish reversal pattern, indicating persistent selling pressure and the likely continuation of a downtrend.': 'इस पैटर्न में लगातार तीन लंबी मंदी वाली (लाल) कैंडलस्टिक शामिल होती हैं जो पिछली कैंडल के शरीर के भीतर खुलती हैं और पिछली कैंडल के निचले स्तर से कम पर बंद होती हैं। यह एक मजबूत मंदी का उलटफेर पैटर्न है, जो लगातार बिकवाली के दबाव और डाउनट्रेंड की संभावित निरंतरता को दर्शाता है।',
            'Strong downtrend likely to continue.': 'मजबूत डाउनट्रेंड जारी रहने की संभावना।',
            '3. How Candlewalla\'s AI Learns and Predicts': '3. कैंडलवाला का एआई कैसे सीखता और भविष्यवाणी करता है',
            'Our AI system analyzes the Open, High, Low, and Close (OHLC) prices of each candlestick. It doesn\'t \'learn\' in the typical machine learning sense with neural networks (in this version). Instead, it applies a set of pre-defined, rule-based logic to identify the specific patterns described above.': 'हमारा एआई सिस्टम प्रत्येक कैंडलस्टिक के ओपन, हाई, लो और क्लोज (ओएचएलसी) कीमतों का विश्लेषण करता है। यह न्यूरल नेटवर्क के साथ विशिष्ट मशीन लर्निंग अर्थ में \'सीखता\' नहीं है (इस संस्करण में)। इसके बजाय, यह ऊपर वर्णित विशिष्ट पैटर्न की पहचान करने के लिए पूर्वनिर्धारित, नियम-आधारित तर्क का एक सेट लागू करता है।',
            'For example, to detect a \'Doji\', it checks if the absolute difference between the open and close price is very small compared to the candle\'s total range. For \'Hammer\', it checks the ratio of the lower wick to the body and the overall shape.': 'उदाहरण के लिए, 'डोजी' का पता लगाने के लिए, यह जांचता है कि ओपन और क्लोज कीमत के बीच पूर्ण अंतर कैंडल की कुल सीमा की तुलना में बहुत कम है या नहीं। 'हैमर' के लिए, यह निचले विक और शरीर के अनुपात और समग्र आकार की जांच करता है।',
            'Based on the detected pattern, our system then provides a prediction (Up/Down/Neutral), an estimated point move, and a confidence level derived from the strength and typical reliability of that pattern.': 'पता लगाए गए पैटर्न के आधार पर, हमारा सिस्टम फिर एक भविष्यवाणी (ऊपर/नीचे/न्यूट्रल), एक अनुमानित बिंदु चाल, और उस पैटर्न की ताकत और विशिष्ट विश्वसनीयता से प्राप्त आत्मविश्वास स्तर प्रदान करता है।',
            'Future Upgrade:': 'भविष्य का अपग्रेड:',
            'This system can be upgraded in the future to incorporate real machine learning models that \'learn\' from vast historical data, sentiment analysis from news, and other complex factors for more advanced predictions.': 'इस प्रणाली को भविष्य में वास्तविक मशीन लर्निंग मॉडल को शामिल करने के लिए अपग्रेड किया जा सकता है जो विशाल ऐतिहासिक डेटा, समाचारों से भावना विश्लेषण और अधिक उन्नत भविष्यवाणियों के लिए अन्य जटिल कारकों से \'सीखते\' हैं।',
        }
    };

    let currentLanguage = localStorage.getItem('language') || 'en';

    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-en]').forEach(element => {
            const key = element.getAttribute('data-en');
            if (translations[lang] && translations[lang][key]) {
                // For list items with bold text, ensure bolding is preserved
                if (element.tagName === 'LI' && translations[lang][key].includes('**')) {
                    element.innerHTML = translations[lang][key].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        localStorage.setItem('language', lang);
    };

    languageSelector.value = currentLanguage;
    applyTranslations(currentLanguage);

    languageSelector.addEventListener('change', (event) => {
        currentLanguage = event.target.value;
        applyTranslations(currentLanguage);
    });

    // --- Mobile Navigation Toggle ---
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // --- Charting Logic (only for ai.html) ---
    if (window.location.pathname.includes('ai.html')) {
        const chartElement = document.getElementById('candlestick-chart');
        const stockSelect = document.getElementById('stock-select');
        const predictedPatternElem = document.getElementById('predicted-pattern');
        const predictedDirectionElem = document.getElementById('predicted-direction');
        const predictedPointsElem = document.getElementById('predicted-points');
        const predictedConfidenceElem = document.getElementById('predicted-confidence');

        let chart;
        let candlestickSeries;
        let updateInterval;
        let currentStockData = [];
        let simulationTimer;

        // Initialize chart
        const initializeChart = () => {
            if (chart) {
                chart.remove(); // Remove existing chart instance
            }

            const chartOptions = {
                layout: {
                    backgroundColor: getComputedStyle(document.body).getPropertyValue('--chart-bg').trim(),
                    textColor: getComputedStyle(document.body).getPropertyValue('--chart-text').trim(),
                },
                grid: {
                    vertLines: {
                        color: getComputedStyle(document.body).getPropertyValue('--chart-grid').trim(),
                    },
                    horzLines: {
                        color: getComputedStyle(document.body).getPropertyValue('--chart-grid').trim(),
                    },
                },
                rightPriceScale: {
                    borderColor: getComputedStyle(document.body).getPropertyValue('--chart-border').trim(),
                },
                timeScale: {
                    borderColor: getComputedStyle(document.body).getPropertyValue('--chart-border').trim(),
                    timeVisible: true,
                    secondsVisible: false,
                },
                crosshair: {
                    mode: LightweightCharts.CrosshairMode.Normal,
                },
            };

            chart = LightweightCharts.createChart(chartElement, chartOptions);

            candlestickSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',   // Green for bullish
                downColor: '#ef5350', // Red for bearish
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
            });

            // Handle chart resizing
            new ResizeObserver(entries => {
                if (entries.length === 0 || entries[0].contentRect.width === 0) return;
                chart.applyOptions({ width: entries[0].contentRect.width, height: 400 });
            }).observe(chartElement);

            // Initial resize
            chart.applyOptions({ width: chartElement.clientWidth, height: 400 });
        };

        // Function to update chart colors on theme change
        const updateChartColors = () => {
            if (chart) {
                chart.applyOptions({
                    layout: {
                        backgroundColor: getComputedStyle(document.body).getPropertyValue('--chart-bg').trim(),
                        textColor: getComputedStyle(document.body).getPropertyValue('--chart-text').trim(),
                    },
                    grid: {
                        vertLines: {
                            color: getComputedStyle(document.body).getPropertyValue('--chart-grid').trim(),
                        },
                        horzLines: {
                            color: getComputedStyle(document.body).getPropertyValue('--chart-grid').trim(),
                        },
                    },
                    rightPriceScale: {
                        borderColor: getComputedStyle(document.body).getPropertyValue('--chart-border').trim(),
                    },
                    timeScale: {
                        borderColor: getComputedStyle(document.body).getPropertyValue('--chart-border').trim(),
                    },
                });
            }
        };

        // --- Simulated Data Generation ---
        const generateInitialData = (numCandles, basePrice, volatilityFactor) => {
            const data = [];
            let currentPrice = basePrice;
            for (let i = 0; i < numCandles; i++) {
                const time = Date.now() - (numCandles - 1 - i) * 60 * 1000; // 1-minute intervals
                const open = currentPrice;
                const high = open + Math.random() * volatilityFactor * 2;
                const low = open - Math.random() * volatilityFactor * 2;
                const close = open + (Math.random() - 0.5) * volatilityFactor * 4;

                currentPrice = close; // Set next open close to current close for continuity
                data.push({
                    time: time / 1000, // Lightweight Charts expects seconds
                    open: parseFloat(open.toFixed(2)),
                    high: parseFloat(Math.max(open, high, close).toFixed(2)), // Ensure high is actual high
                    low: parseFloat(Math.min(open, low, close).toFixed(2)),   // Ensure low is actual low
                    close: parseFloat(close.toFixed(2))
                });
            }
            return data;
        };

        const generateNewCandle = (lastCandle, volatilityFactor) => {
            const open = lastCandle.close;
            const high = open + Math.random() * volatilityFactor * 2;
            const low = open - Math.random() * volatilityFactor * 2;
            const close = open + (Math.random() - 0.5) * volatilityFactor * 4;
            
            return {
                time: (lastCandle.time * 1000 + 60 * 1000) / 1000, // Add 1 minute
                open: parseFloat(open.toFixed(2)),
                high: parseFloat(Math.max(open, high, close).toFixed(2)),
                low: parseFloat(Math.min(open, low, close).toFixed(2)),
                close: parseFloat(close.toFixed(2))
            };
        };

        const updateChartData = (stockSymbol) => {
            if (simulationTimer) {
                clearInterval(simulationTimer);
            }

            let basePrice = 1000; // Default base price
            let volatility = 10; // Default volatility
            switch (stockSymbol) {
                case 'NIFTY': basePrice = 22000; volatility = 50; break;
                case 'BANKNIFTY': basePrice = 48000; volatility = 80; break;
                case 'RELIANCE': basePrice = 2900; volatility = 20; break;
                case 'TCS': basePrice = 3800; volatility = 15; break;
                case 'INFOSYS': basePrice = 1600; volatility = 12; break;
            }

            currentStockData = generateInitialData(100, basePrice, volatility); // 100 historical candles
            candlestickSeries.setData(currentStockData);

            // Simulate real-time updates
            simulationTimer = setInterval(() => {
                const lastCandle = currentStockData[currentStockData.length - 1];
                const newCandle = generateNewCandle(lastCandle, volatility);
                currentStockData.push(newCandle);
                candlestickSeries.update(newCandle);

                // Keep only a reasonable number of candles for performance
                if (currentStockData.length > 150) {
                    currentStockData.shift(); // Remove oldest candle
                    candlestickSeries.setData(currentStockData); // Re-set data to reflect shift
                }

                // Run AI prediction on the latest data
                if (currentStockData.length >= 3) { // Need at least 3 candles for some patterns
                    const prediction = analyzeCandleData(currentStockData);
                    displayPrediction(prediction);
                }
            }, 5000); // Update every 5 seconds (simulating 1-min candles for chart)
        };

        const displayPrediction = (prediction) => {
            predictedPatternElem.textContent = prediction.pattern;
            predictedDirectionElem.textContent = prediction.direction;
            predictedPointsElem.textContent = prediction.points !== undefined ? `${prediction.points > 0 ? '+' : ''}${prediction.points} points` : 'N/A';
            predictedConfidenceElem.textContent = `${prediction.confidence}%`;

            // Optional: Add color coding to direction
            predictedDirectionElem.style.color = ''; // Reset
            if (prediction.direction.includes('UP') || prediction.direction.includes('Bullish')) {
                predictedDirectionElem.style.color = '#26a69a'; // Green
            } else if (prediction.direction.includes('DOWN') || prediction.direction.includes('Bearish')) {
                predictedDirectionElem.style.color = '#ef5350'; // Red
            }
            predictedPointsElem.style.color = predictedDirectionElem.style.color; // Match points color to direction
        };

        // Event listener for stock selection
        stockSelect.addEventListener('change', (event) => {
            updateChartData(event.target.value);
            // Reset prediction display while new data loads/analyzes
            predictedPatternElem.textContent = 'Analyzing...';
            predictedDirectionElem.textContent = '...';
            predictedPointsElem.textContent = '...';
            predictedConfidenceElem.textContent = '...';
            predictedDirectionElem.style.color = '';
            predictedPointsElem.style.color = '';
        });

        // Initialize on page load for AI page
        initializeChart();
        updateChartData(stockSelect.value); // Load data for initial stock (NIFTY)
    }
});
