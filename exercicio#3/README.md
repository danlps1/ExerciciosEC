### EXERCÍCIO 3

Levando como base a aplicação NodeJS criada anteriormente, evolua a aplicação para suportar as seguintes características:

Para o sistema de veículos, crie três tabelas de Marca, Categoria e Veículo.

A marca tem um identificador incremental e nome da Marca. Ex: 1 - Fiat

Em Categoria deve armazenar os tipos de veículo. Deve ser criado um Enum com as opções: MOTOCICLETA, CARRO, CAMINHAO. Deve ser armazenado o identificador da categoria e tipo que é a referência deste enum. Deve ser inserido diretamente no banco estes dados. Ex: 1 - CAMINHAO

O Veículo possui um relacionamento com Categoria e Marca. O Veículo irá possuir um identificador incremental, nome do veiculo, modelo do veículo, ano do veículo, cor do veículo, categoria e marca. Ex: 1 - Punto - T JET - 2016 - Preto - 2 - 1. 

2 refere-se a CARRO no relacionamento e 1 refere-se a Fiat na Marca.

• Um endpoint para buscar uma marca por Id

• Um endpoint para cadastrar uma nova marca

• Um endpoint para cadastrar um novo veículo

• Um endpoint para editar os dados de um veículo

• Um endpoint para deletar um veículo por Id

• Um endpoint para buscar um veículo por Id

• Um endpoint para listar todos os veículos

Como requisitos não funcionais, utilizar banco de dados Mysql.