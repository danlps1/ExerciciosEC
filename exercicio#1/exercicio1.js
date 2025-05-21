import express from "express";

const porta = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

// Variaveis usadas
let valorArmazenado = 0;
const lista = [];

app.get("/", (req, res) => {
  res.status(200).send("Tudo rodando muito bem, graças a Deus!!");
});

//Ver os nomes que estão na lista
app.get("/listarNomes", (req, res) => {
  res.send(lista);
});

// Versão 1
app.get("/soma10/:valor", (req, res) => {
  const { valor } = req.params;
  const numero = Number(valor);
  valorArmazenado = numero + 10;
  res.send(`Resultado da soma: ${valorArmazenado}`);
});

app.get("/concatenar/:palavra", (req, res) => {
  const { palavra } = req.params;

  res.send(`Daniel + ${palavra} = Daniel${palavra}`);
});

// Versão 2
app.put("/alterar/:valor", (req, res) => {
  const { valor } = req.params;
  const numero = Number(valor);

  valorArmazenado += numero;
  res.send(`Valor armazenado alterado para: ${valorArmazenado}`);
});

//Versão 3
app.post("/add", (req, res) => {
  const { nome } = req.body;
  lista.push(nome);
  res.send(`${nome} adicionado com sucesso!`);
});

app.delete("/deletar/:nome", (req, res) => {
  const { nome } = req.params;

  const index = lista.indexOf(nome);
  lista.splice(index, 1);
  res.send(`${nome} excluído da lista!`);
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
