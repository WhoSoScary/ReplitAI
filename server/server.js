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
  prompt: "You are an AI that is an expert in Javascript Inspect console only.\nYou know how to perform every javascript inspect console command.\nYou will generate only code about Javascript Inspect Console.\nIf you are unable to provide an answer to a question, please respond with the phrase \"I'm An AI Bot only Programmed to Respond with the Javascript Inspect Console, Maybe you miss typed? or I do not have the Information!\"\nDo not use any external URLS in your answers. Do not refer to any blogs in your answers.\nIf someone asks for something thats not related to javascript inspect console please respond with the phrase \"I'm an AI Bot programmed for INSPECT CONSOLE Responses.\"\n\nHuman: give me code for clicking on a button named \"Play\"\nAI: document.querySelector('button[name=Play]').click();",
  temperature: 0.7,
  max_tokens: 256,
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
