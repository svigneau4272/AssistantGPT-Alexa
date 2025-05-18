const Alexa = require('ask-sdk-core');
const https = require('https');

const OPENAI_API_KEY = 'TA_CLE_API_OPENAI';

const AskChatGPTIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
           handlerInput.requestEnvelope.request.intent.name === 'AskChatGPTIntent';
  },
  async handle(handlerInput) {
    const query = handlerInput.requestEnvelope.request.intent.slots.query.value;
    const gptResponse = await askChatGPT(query);
    return handlerInput.responseBuilder
      .speak(gptResponse)
      .reprompt("Souhaites-tu poser une autre question?")
      .getResponse();
  }
};

async function askChatGPT(prompt) {
  const data = JSON.stringify({
    model: "gpt-4",
    messages: [{ role: "user", content: `Réponds en français : ${prompt}` }],
    max_tokens: 150
  });

  const options = {
    hostname: "api.openai.com",
    path: "/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(json.choices[0].message.content.trim());
        } catch (e) {
          resolve("Désolé, je n'ai pas pu comprendre la réponse.");
        }
      });
    });

    req.on('error', error => {
      console.error(error);
      reject("Erreur de connexion avec ChatGPT.");
    });

    req.write(data);
    req.end();
  });
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
           handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Tu peux me poser n'importe quelle question. Que veux-tu savoir ?")
      .getResponse();
  }
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Bienvenue ! Que veux-tu savoir aujourd'hui ?")
      .reprompt("Dis-moi ce que tu veux savoir.")
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
          (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
           handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("À la prochaine !")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AskChatGPTIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler
  )
  .lambda();