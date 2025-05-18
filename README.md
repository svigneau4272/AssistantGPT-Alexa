# Assistant GPT pour Alexa 🎙️🤖

Cette skill personnalisée permet d'intégrer **ChatGPT (OpenAI)** directement dans **Alexa**. Tu peux poser des questions vocalement à Alexa, qui transmet les requêtes à ChatGPT et te lit les réponses en français.

## 🚀 Fonctionnalités

- Pose une question en langage naturel (ex: _"Explique-moi les trous noirs"_)
- ChatGPT (GPT-4) génère une réponse et Alexa la lit
- Interaction 100% en **français**
- Code hébergé via **AWS Lambda** ou **Alexa Hosted (Node.js)**

## 📁 Arborescence du projet

```
AssistantGPT-Alexa/
├── lambda/
│   └── custom/
│       └── index.js          # Code principal de la skill
├── models/
│   └── fr-CA.json            # Modèle vocal Alexa (version canadienne-française)
├── skill.json                # Configuration de la skill (nom, endpoint, langue, etc.)
```

## 🔧 Préparation

1. Obtenir une clé API OpenAI : [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
2. Remplacer `TA_CLE_API_OPENAI` dans `index.js` par ta clé API
3. Déployer via Alexa Developer Console ou AWS Lambda

## 📌 Exemple d'utilisation

> “Alexa, demande à Assistant GPT de m'expliquer la relativité”  
> “Alexa, ouvre Assistant GPT”

## 📬 Auteurs

- 🔧 Développé pour usage personnel et éducatif
- 🧠 Basé sur l’API OpenAI GPT-4

## 📜 Licence

Ce projet est fourni **sans garantie**, pour usage personnel.  
Tu es libre de l’adapter et de le modifier selon tes besoins.
