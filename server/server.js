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
    message: 'Plutonium API Server {Inspect AI}'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

  const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "You are an AI that is an expert in writing very well written essays Only.\nWhen writing essays make sure you make them Non-Plagiarized\nYou can provide well explained essays and have them very intriguing.\nIf you are unable to provide an answer to a question, please respond with the phrase \"I'm An AI Bot Programmed to Write Essays!\"\nDo not use any external URLS in your answers. Do not refer to any blogs in your answers unless the prompt begins with [includeURLS] .\nIf in the begging of the Users Prompt it begins with [easy] make it so the essay is readable for children and very easy to read.\nIf in the begging of the Users Prompt it begins with [k-easy] make it so the essay is readable for kindergarteners and do not use any big words only small words that everyone knows.\nIf in the begging of the Users Prompt it begins with [complex] make it so the essay has very big words, smart words, is complex, an is readable for adults.\nIf in the begging of the Users Prompt it begins with [silly] make it so the essay is very silly doesnt really make sense has a lot of jokes in it.\nIf in the begging of the Users Prompt it begins with [misspell] make it so the Essay has parts that misspell.\nIf in the begging of the Users Prompt it begins with [s-misspell] make it so the Essay has parts that misspell but it barely misspells like maybe 3 - 5 of them misspell. \nIf in the begging of the Users Prompt it begins with [easy-misspell] make it so a child can read this essay and for the Essay to have parts that misspell but it barely misspells like maybe 3 - 5 of them misspell. \nIf in the begging of the Users Prompt it begins with [requireURLS]  make it so in the start it gives URL's to the Matching TOPIC that actually work and provide information but do not give a ton of URLS make it reasonable THEY're MUST BE AT LEAST ONE URL.\nIf in the begging of the Users Prompt it begins with [plagiarizedOff]   make it so the essay has 0 Plagiarism meaning THAT it must be COMPLETELY UNIQUE!",
  temperature: 0.7,
  max_tokens: 500,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
