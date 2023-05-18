const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const dotenv = require('dotenv');
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get('/', (req, res) => {
  res.render('pages/chatbot');
});

router.get('/hello', (req, res) => {
  res.status(200).send({
    message: 'Hello from Clementine family!',
  });
});

router.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (prompt.toLowerCase() === 'hi') {
      res.status(200).send({
        bot: 'Hi there! How can I assist you today?',
      });
      return;
    }

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 100, // The maximum number of tokens to generate in the completion.
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

module.exports = router;
