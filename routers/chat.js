const express = require('express');
const router = express.Router();
const {
  Product
} = require('../models/product');
const user = require('../models/user');
const users = require('../controllers/userprofileController');
const {
  Configuration,
  OpenAIApi
} = require('openai');

const dotenv = require('dotenv');
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



router.get('/', (req, res) => {
  
  res.render('pages/chatbot', {
    user
  })
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
        bot: 'Hi there! I am a Clementine chatbot. How can I assist you today?',
      });
      return;
    }

    else if (/cancel my order/i.test(prompt)) {
      res.status(200).send({
        bot: 'Cancellations are allowed within 48 hours of placing the order. Kindly send us an email through the contact us page with the request and we’ll get back to you.',
      });
      return;
    }
    else if (/hi  /i.test(prompt)) {
      res.status(200).send({
        bot: 'Hi there! I am a Clementine chatbot. How can I assist you today?',
      });
      return;
    }
    else if (/track my order/i.test(prompt)) {
      res.status(200).send({
        bot: 'Your order status will be automatically updated with every progress. You can track it through your profile.',
      });
      return;
    }
    else if (/Where can i find you/i.test(prompt)) {
      res.status(200).send({
        bot: 'We are a boutique jewellery studio based in Cairo, Egypt. ',
      });
      return;
    }
    else if (/are returns allowed/i.test(prompt)) {
      res.status(200).send({
        bot: 'Returns are allowed only within two weeks of the purchase date.',
      });
      return;
    }
   
    else if (/current time/i.test(prompt)) {
      const currentTime = new Date().toLocaleTimeString();
      res.status(200).send({
        bot: `The current time is ${currentTime}. I'm a Clementine chatbot, happy to assist you!`,
      });
      return;
    }
    else if (/do you think that we will win the best project award/i.test(prompt)) {
      const currentTime = new Date().toLocaleTimeString();
      res.status(200).send({
        bot: ` I firmly believe that your project has all the ingredients necessary to win the prize for the best project. The hard work, innovation, and dedication you have put into it make it a standout entry. Good luck, and may your project's success be recognized and rewarded!`,
      });
      return;
    }
    else if (/who are you/i.test(prompt)) {
      const currentTime = new Date().toLocaleTimeString();
      res.status(200).send({
        bot: `I'm Clementine chatbot, happy to assist you!`,
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

    const botResponse = response.data.choices[0].text;

  // Customize the response based on the jewelry boutique persona
  const jewelryBotResponse = `i am a jewelry boutique assistant, here I can provide some general insights: ${botResponse}`;


    res.status(200).send({
      bot: jewelryBotResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

module.exports = router;