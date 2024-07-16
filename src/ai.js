import express from 'express';
import { Hercai } from 'hercai';
import cors from 'cors';
const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));

app.get("/gpt", async (req, res)=>{
    const pergunta = req.query.pergunta;
    if (!pergunta) {
        return res.send("ERRRO, SEM PERGUNTA")
    }
    try{
        const herc = new Hercai();
        herc.question({model:"v3",content: pergunta}).then(response => {
        /* The module will reply based on the message! */
        return res.json(response.reply)
        });
    }catch(err){
        console.log(err)
    }
})

app.get("/ai", (req, res)=>{
    return res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reconhecimento de Voz</title>
</head>
<body>
    <button id="startButton">Iniciar Reconhecimento</button>
    <button id="stopButton">Parar Reconhecimento</button>
    <p id="result"></p>

    <script>
        const synth = window.speechSynthesis;
        
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'pt-BR';
        // recognition.continuous = true;
        recognition.onresult = (event) => {
            const voz = synth.getVoices();
            const transcript = event.results[0][0].transcript.trim();
            document.getElementById('result').textContent = transcript;
            const toSpeak = new SpeechSynthesisUtterance(transcript);
            // Set speech rate (0.1 - 2.0, 1.0 is default)
            toSpeak.rate = 3.0;

            // Set speech pitch (0.0 - 2.0, 1.0 is default)
            toSpeak.pitch = 0.2;

            // Set speech volume (0.0 - 1.0, 1.0 is default)
            toSpeak.volume = 1.0;
            //Configurando voz
            toSpeak.voice = voz[1];
            
            synth.speak(toSpeak);
            // Aqui você pode comparar 'transcript' com palavras específicas para executar funções
            // Por exemplo: if (transcript === 'play') { executarVideo(); }
        };
        
        recognition.onend = () => {
            recognition.start();
        };
        // recognition.interimResults = true;

          document.getElementById('startButton').addEventListener('click', () => {
              recognition.start();
          });

          document.getElementById('stopButton').addEventListener('click', () => {
              recognition.stop();
          });
    </script>
</body>
</html>
`);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("Conexão ativa na porta: "+port));