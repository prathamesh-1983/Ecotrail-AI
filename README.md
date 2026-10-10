# 🌿 EcoTrail AI: Explore More, Scroll Less

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05).*

## What I Built

EcoTrail AI is a local-first outdoor exploration companion that uses open-source multimodal AI to help people learn about the natural world around them.

Users upload a photo of a plant, flower, tree, mushroom, or other outdoor scene. EcoTrail AI analyzes the image and returns a cautious identification, a confidence estimate, a short description, habitat notes, safety guidance, and a suggested outdoor activity. Users can save their discoveries in a simple observation journal.

The goal is to make the screen the shortest part of the experience: use AI to get a starting point, then put the phone away and explore outdoors.

**Who it is for:** hikers, walkers, gardeners, curious beginners, students, and anyone who wants to notice more of the nature around them.

**Safety note:** AI-generated identifications can be wrong. EcoTrail AI is an educational companion, not a scientific authority. Never eat or handle an unknown organism based only on an AI result.

For a local demo:

1. Start Ollama and make sure the `gemma3:4b` model is downloaded.
2. Run the FastAPI backend and React frontend using the steps in the repository README.
3. Upload a clear outdoor/nature photo.
4. Select **Analyze with local AI**.
5. Review the result and save it to the observation journal.
6. If demonstrating offline use, download the model first, then disconnect from the internet and test again.

## Code

**GitHub repository:** https://github.com/prathamesh-1983/Ecotrail-AI

The project includes:

- React + Vite frontend
- Python + FastAPI backend
- Ollama integration for local multimodal inference
- Gemma 3 4B vision model
- SQLite observation journal
- API endpoints for image analysis and saved observations
- Setup instructions, demo script, and submission outline

Suggested repository name: `ecotrail-ai`

Replace the placeholder with your actual GitHub username and repository URL before publishing.

## How I Built It

I built EcoTrail AI as a full-stack web application with a local-first AI architecture.

### Technology stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Python, FastAPI
- **AI runtime:** Ollama
- **Open-weight model:** Gemma 3 4B, which supports image and text input
- **Database:** SQLite
- **Communication:** REST API with JSON responses

### How the flow works

1. The user selects a nature photo in the React interface.
2. The frontend sends the image to the FastAPI `/api/analyze` endpoint.
3. The backend encodes the image and sends it to the locally running Ollama API.
4. Gemma 3 4B analyzes the image and returns structured JSON.
5. The interface displays the likely subject, confidence estimate, description, habitat, safety guidance, and an outdoor mission.
6. If the user saves the result, FastAPI stores it in SQLite and the journal displays it later.

### Why local inference?

After the model has been downloaded, inference can run on the user's own machine without sending the image to a hosted AI inference API. This makes local privacy and offline experimentation central to the project rather than add-on features. The web interface and backend still need to be running locally, and the initial model download requires internet access.

### Current scope and limitations

This submission is an MVP. Its predictions have not been scientifically validated, and the confidence value is model-generated rather than a calibrated probability. Image analysis requires a compatible local Ollama installation and enough hardware resources to run the model. The project should not be used for plant edibility, medical advice, or emergency decisions.

## Why Does Open Innovation Matter?

Open innovation made it possible to build the core experience around a model that can run locally instead of depending on a closed, hosted AI API.

For this project, that enables:

- **Privacy-oriented experimentation:** nature photos can stay on the local machine during inference.
- **More control:** the model, prompt, API flow, and application code can be inspected and adapted.
- **Offline potential:** once the model is installed, image analysis can work without an active internet connection, subject to the local setup.
- **Accessibility for builders:** developers and students can prototype multimodal AI without integrating a paid hosted inference API.
- **Room to improve:** the community can contribute better prompts, evaluation examples, accessibility improvements, additional languages, and outdoor features.

Open models do not automatically guarantee accuracy or safety. Testing, transparent limitations, and responsible user guidance remain essential.

## My Agent Session

Optional. Add a DevRelay agent-session link or embed after saving your session.

`<!-- Replace this comment with the DevRelay agent_session embed or link if available. -->`

## Prize Categories

- **Primary theme:** Touch Grass / outdoor exploration with open-source AI.

Check the challenge rules and list only the partner prize categories that EcoTrail AI genuinely qualifies for. Remove this section or update it if you are not entering a specific partner category.

---

## Before You Publish

- [ ] Replace the GitHub repository placeholder with your real public repository.
- [ ] Add a deployed demo or video link, if available.
- [ ] Add screenshots of the working app.
- [ ] Test the app with a real outdoor photo and describe what happened.
- [ ] Include a DevRelay session if you have one.
- [ ] Confirm the challenge deadline and prize-category rules.
- [ ] Keep claims about accuracy and offline behavior consistent with what you actually tested.
