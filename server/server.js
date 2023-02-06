import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Plutonium API Server'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    let model = "text-davinci-003";
    let temperature = 0;
    let max_tokens = 225;
    let top_p = 1;
    let frequency_penalty = 0.5;
    let presence_penalty = 0;

    if (prompt.startsWith("[easy]")) {
      temperature = 3;
    } else if (prompt.startsWith("[k-easy]")) {
      // adjust parameters for very simple essays for kindergarteners
    } else if (prompt.startsWith("[complex]")) {
      // adjust parameters for complex essays for adults
    } else if (prompt.startsWith("[silly]")) {
      // adjust parameters for silly essays
    } else if (prompt.startsWith("[misspell]")) {
      // adjust parameters for essays with misspelled words
    } else if (prompt.startsWith("[s-misspell]")) {
      // adjust parameters for essays with slightly misspelled words
    } else if (prompt.startsWith("[easy-misspell]")) {
      // adjust parameters for easy-to-read essays with slightly misspelled words
    } else if (prompt.startsWith("[requireURLS]")) {
      // adjust parameters for essays with URLs
    } else if (prompt.startsWith("[plagiarizedOff]")) {
      // adjust parameters for non-plagiarized essays
    }

    const response = await openai.createCompletion({
      model: model,
      prompt: `${prompt}`,
      temperature: temperature,
      max_tokens: max_tokens,
      top_p: top_p,
      frequency_penalty: frequency_penalty,
      presence_penalty: presence_penalty
    });

    if (!response.data.choices[0].text) {
      res.status(200).send({
        bot: "I'm An AI Bot Programmed to Write Essays!"
      });
    } else {
      res.status(200).send({
        bot: response.data.choices[0].text
      });
    }

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
