const natural = require('natural');

// Simple demo showing tokenization and sentiment analysis using 'natural'
const tokenizer = new natural.WordTokenizer();
const SentimentAnalyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;

const analyzer = new SentimentAnalyzer('English', stemmer, 'afinn');

const examples = [
  'I love this product, it is amazing and works well.',
  'This is the worst purchase I ever made. Very disappointed.',
  'It is okay, not great but not terrible either.',
  'Absolutely fantastic! Best decision ever.'
];

examples.forEach((text) => {
  const tokens = tokenizer.tokenize(text);
  const score = analyzer.getSentiment(tokens);
  console.log('Text:', text);
  console.log('Tokens:', tokens.join(' '));
  console.log('Sentiment score (AFINN):', score);
  console.log('---');
});
