# Robôs & Drones - Assistente Especializado

Um chat interativo e avançado voltado estritamente para o universo da robótica e dos drones. A interface web foca na imersão, contando com um "Robô" 3D minimalista que acompanha os movimentos da interface e conta com efeitos de carregamento visuais. O backend é energizado pelo **Google Agent Development Kit (ADK)** usando modelos Gemini de alta resposta.

---

## 🎯 Objetivo Arquitetural
A aplicação visa demonstrar uma interface fluida com animações realistas (usando Framer Motion e CSS 3D), suportado por um robusto back-end estruturado (FastAPI) acoplado a um orquestrador de agentes LLM focado em contexto restrito (apenas robótica e drones).

## 🛠️ Tecnologias Utilizadas

**Frontend:**
- [React (Vite)](https://vitejs.dev/) - Framework UI
- [Framer Motion](https://www.framer.com/motion/) - Animações fluidas do "rosto" do robô e mensagens
- [React Markdown](https://github.com/remarkjs/react-markdown) - Melhor formatação do texto retornado pela IA.
- CSS Modules & Inline Styling 3D para o visual do robô de vidro metálico.

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) - Servidor web rápido em Python
- [Google ADK](https://github.com/google/agent-development-kit) (`google.adk`) - Gerenciamento de agentes e da memória de longo/curto prazo da sessão.
- Servidor REST assíncrono para respostas em pipeline.

---

## ⚙️ Pré-requisitos
- **Node.js** (v18 ou superior)
- **Python** (3.10 ou superior)
- Recomenda-se o uso de um Virtual Environment (venv ou Conda) para o backend.

---

## 🚀 Como instalar e rodar localmente

Por padrão, a aplicação foi dividida em duas instâncias (backend de IA e frontend web). O backend rodará na porta `8000` e o frontend rodará na `5173`.

### 1. Instruções do Backend (A.I. Server)

Abra o seu terminal na raiz do projeto:

1. Instale as dependências essenciais do Python:
   ```bash
   pip install fastapi uvicorn pydantic python-dotenv google-genai
   ```
   *(Nota: certifique-se também de baixar o pacote oficial do Google ADK referente à sua versão, caso necessário no seu setup).*

2. Configure suas Variáveis de Ambiente (`.env`):
   O Chatbot exige uma chave do Google Gemini para processar a inteligência artificial. Siga os passos:
   
   - Vá até o [Google AI Studio](https://aistudio.google.com/) e crie uma nova API Key (gratuita).
   - Dentro da pasta `backend/`, crie um novo arquivo com o nome exato `.env`.
   - Cole o seguinte conteúdo dentro do arquivo:
   
   ```ini
   GEMINI_API_KEY=AIzaSySuaChaveGeradaNoGoogleAqui...
   ```

3. Inicie o servidor:
   ```bash
   python backend/app.py
   ```
   Seu servidor estará girando no `http://localhost:8000`.

### 2. Instruções do Frontend (UI Client)

Num tempo e terminal separados, prepare o lado do cliente:

1. Entre no diretório do front:
   ```bash
   cd frontend
   ```

2. Instale as dependências Node:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento Vite:
   ```bash
   npm run dev
   ```
   Abra no seu navegador: `http://localhost:5173`

---

## 💡 Como Usar & Funcionalidades Extras
- **Pergunte Livremente:** Digite qualquer dúvida sobre drones FPV, baterias lipo, robótica Boston Dynamics, motores Brushless, etc. O robô irá dar insights fantásticos formatados devidamente em Markdown.
- **Filtro Estrito:** Tente perguntar ao robô qual é a receita de uma lasanha ou tópicos sobre carros e esportes. O orquestrador ADK o obrigará educadamente a negar e redirecionar a conversa para assuntos mecânicos/robóticos.
- **Estética Viva:** Repare como o hardware "olhos" do robô segue levemente os movimentos do seu mouse nos eixos (graças a callbacks virtuais), encolhendo ao engatar processamento.

---

## 📁 Estrutura Externa

```
Rob-s-e-Drones/
 ├── backend/
 │   ├── app.py           (Inicialização do agente e da API via FastAPI)
 │   └── .env             (Proteção da chave de API)
 └── frontend/
     ├── src/
     │   ├── components/
     │   │   └── RobotFace.jsx  (O complexo script 3D do visor + olho do mascote)
     │   ├── App.jsx            (A interface de chat)
     │   ├── index.css          (Background da sala e estilos em glassmorphism)
     │   └── main.jsx
     └── package.json
```
