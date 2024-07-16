import { Hercai } from 'hercai';

export const gpt = async (req, res) => {
    const pergunta = req.query.pergunta;
    if (!pergunta) {
        return res.send("ERRRO, SEM PERGUNTA")
    }
    try {
        const herc = new Hercai();
        herc.question({ model: "v3", content: pergunta }).then(response => {
            return res.json(response.reply)
        });
    } catch (err) {
        return res.send("ERRO")
        console.log(err)
    }
};