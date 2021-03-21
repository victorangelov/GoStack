//importando express dentro de uma variável chamada express
const express = require('express');

/* Métodos http
* GET: Buscar informações do back-end
* POST : Criar uma informação no back-end
* PUT/PATCH: Alterar informações no back-end
* DELETE: deletar uma informação no back-end

/* TIPOS DEPARAMETROS: formas do cliente enviar algum tipo de informação 
* Query params: filtros e paginação
* Route Params: 
* Request Body
*/

// declarando uma variável app que é igual a express agora a aplicação já está criada
const app = express();
//rota para listar
app.get ('/projects', (request, response) => {
    //solicitação de pesquisa
    const {title, owner} = request.query;
    console.log(title);
    console.log(owner)
    // todo retorno da rota precisa utilizar o response
    // sempre retornar o json, com um array ou um objeto
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
});
//rota para criar
app.post('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})
//rota para alterar
app.put('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})
//rota para deletar
app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})
//precisamos ouvir uma porta por padrão é usada a 3333 para a aplicação iniciar
//adiconando uma arrow function para inserir mensagem no backend
app.listen(3333, () => {
    console.log(' Back-end started!')
});