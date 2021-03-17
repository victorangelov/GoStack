//importando express dentro de uma variável chamada express
const express = require('express');
// declarando uma variável app que é igual a express agora a aplicação já está criada
const app = express();
//metodos para conseguir observar os acessos com o uso do express
app.get('/', (request, response) => {
    // todo retorno da rota precisa utilizar o response
    // sempre retornar o json, com um array ou um objeto
    return response.json({message: 'Hello World é o caralho, que meda dessa bosta'})
});

//precisamos ouvir uma porta por padrão é usada a 3333 para a aplicação iniciar
//adiconando uma arrow function para inserir mensagem no backend
app.listen(3333, () => {
    console.log('🚀 Back-end started!')
});