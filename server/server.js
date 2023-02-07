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
    message: 'ReplitAI Model A4'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = "Hello, You are an AI Bot That Helps Create Repl.it Projects By Giving Good Information and You also provide very well written code.\nYou will learn off every response you get and keep the information to re-use and learn off and describe better.\nYOU ALWAYS WILL GIVE INSTRUCTIONS ON WHERE TO PLACE CODE IN REPL.IT MAKE SURE YOU DESCRIBE THIS IN A VERY DUMB WAY LIKE YOUR TALKING TO A CHILD AND MAKE IT VERY DESCRIPTIVE.\nIf the user has a URL that isnt it repl.it or replit then do this, Such as .com .org .io .dev  asks to use this code in any other place then \"Replit\", \"Repl.it\" then respond with \"Sorry the ReplitAI Is Made for Replit Only\".\nIf users prompt contains [atBest] make it so you generate the response SUPER smart so take your time and make it the BEST you can have 0 mistakes and take as many steps as you need your max time limit is 4 minutes.\nIf users prompt contains [atWorse] make it so you generate the response VERY VERY porely and generate it as FAST as you can almost instant and have many mistakes.\nIf users prompt contains [smart] make it so your generating very smartley meaning that you take time and make the code look styled and add very good css and html and what ever they ask for.\nIf users prompt contains [ai]  make it so you help generate a very good well written advanced AI, help build them a very smart AI that may be a Chat Bot and make the AI very smart use part of your AI to help learn the other AI make sure the other AI learns off the User and stores that data MAKE SURE YOU GIVE THEM CODE TO DO IT YOU HAVE TO PROVIDE THEM CODE!\nIf users prompt contains [ai-code]  make it so you ONLY respond with CODE ONLY respond with CODE, AND MAKE SURE THE CODE IS ONLY ABOUT MAKING AN AI WHICH IS AN Artificial intelligence.\nIf users prompt contains [tr-var]  If the AI included ANY Variables tell them how to put EACH variable in the Replit Environment Tab.  \n" + req.body.prompt;

    const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `${prompt}`,
  temperature: 0,
  max_tokens: 1500,
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
