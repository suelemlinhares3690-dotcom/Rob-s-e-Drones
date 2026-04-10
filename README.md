# Robôs & Drones - Assistente Inteligente

Este projeto é um site interativo que apresenta um robô especialista em robótica e drones. O robô utiliza o **Google Agent Development Kit (ADK)** para processar perguntas e garantir que o assunto permaneça dentro do escopo técnico solicitado.

## 🚀 Como Executar o Projeto

### 1. Requisitos Pró-Configurados
O projeto utiliza o ambiente Conda `solar_agent` para o backend Python.

### 2. Configuração do Backend (Python)
Entre na pasta do backend e configure sua chave de API do Google Cloud:
```bash
cd backend
# Crie um arquivo .env e adicione sua chave:
# GOOGLE_API_KEY=sua_chave_aqui
```

Para rodar o servidor:
```bash
conda activate solar_agent
python app.py
```
O servidor estará rodando em `http://localhost:8000`.

### 3. Configuração do Frontend (React)
O frontend foi construído com React e Vite, focado em uma estética premium e minimalista.
```bash
cd frontend
npm install
npm run dev
```
Acesse `http://localhost:5173` para interagir com o robô.

## 🛠️ Tecnologias Utilizadas
- **Frontend**: React, Framer Motion (animações), Lucide React (ícones), Vanilla CSS (Design Premium).
- **Backend**: Python, FastAPI, Google Agent Development Kit (ADK).
- **IA**: Google Gemini (via ADK) com instruções de sistema rigorosas.

## ✨ Funcionalidades
- **Interface Viva**: O robô segue o ponteiro do mouse com os olhos e pisca naturalmente.
- **Micro-animações**: Feedback visual quando o robô está pensando ou falando.
- **Restrição de Domínio**: O agente recusa educadamente perguntas que não sejam sobre robótica ou drones.
