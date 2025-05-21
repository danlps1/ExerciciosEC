import Fastify from "fastify";
import formbody from "@fastify/formbody";

const fastify = Fastify({
  logger: true,
});

fastify.register(formbody); 

const veiculos = [];
const marcas = [];

fastify.get("/", (req, res)=> {
  res.send("Ate então nada de errado, servidor online!");
});


fastify.get("/allVeiculos", (req, res) => {
  res.send(`Carros na agência: \n${JSON.stringify(veiculos)}`);
});


fastify.get("/allMarcas", (req, res) => {
  res.send(`Marca adicionadas: \n${JSON.stringify(marcas)}`);
});


fastify.get("/buscar/:id", (req, res) => {
  const { id } = req.params;

  const veiculoAchado = veiculos.findIndex((v) => v.id == id);
  res.send(veiculos[veiculoAchado]);
});


fastify.post("/add", (req, res) => {
  const { nome, placa, marca } = req.body;

  const veiculo = {
    id: veiculos.length + 1,
    nome: nome,
    placa: placa,
    marca: marca,
  };

  veiculos.push(veiculo);
  res.send(`${JSON.stringify(veiculo)} adicionado com sucesso!`);
});


fastify.post("/cadastroMarca", (req, res) => {
  const { nome } = req.body;

  const marca = {
    id: marcas.length + 1,
    nome: nome,
  };

  marcas.push(marca);
  res.send(`Marca adicionada com sucesso: ${JSON.stringify(marca)}`);
});


fastify.put("/alterar/:id", (req, res) => {
  const { id } = req.params;
  const { newNome, newPlaca, newMarca } = req.body;

  const index = veiculos.findIndex((v) => v.id == id);

  if (newNome) veiculos[index].nome = newNome;
  if (newPlaca) veiculos[index].placa = newPlaca;
  if (newMarca) veiculos[index].marca = newMarca;

  res.send(`Veículo atualizado com sucesso!`);
});


fastify.delete("/deletar/:id", (req, res) => {
  const { id } = req.params;

  const index = veiculos.findIndex((v) => v.id == id);
  veiculos.splice(index, 1);
  res.send(`Veiculos exlcuído com sucesso!`);
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
