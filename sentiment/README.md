# Sentiment demo

This small demo shows how to use the `natural` package for basic tokenization and sentiment analysis.

Files
- `demo.js` - simple script that tokenizes a few example sentences and prints AFINN sentiment scores.

Run the demo

1. Make sure dependencies are installed in the `sentiment` folder:

```powershell
cd sentiment
npm install
```

2. Run the demo:

```powershell
node demo.js
```

Interpreting results
- The demo prints a sentiment score using the AFINN lexicon. Scores > 0 are positive, < 0 are negative, and 0 is neutral.

Notes
- `natural` includes other tokenizers, stemmers, and classifiers. This demo uses `WordTokenizer`, `PorterStemmer`, and `SentimentAnalyzer` with the `afinn` lexicon.
