//importando express dentro de uma variável chamada express
const express = require('express');
const { uuid, isUuid } = require('uuidv4');
// declarando uma variável app que é igual a express agora a aplicação já está criada
const app = express();

app.use(express.json());

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

/** Middleware:
* * Middleware:
* interceptador de requisições, ele pode interromper totalmente a requisição.
* alterar dados da requisição.
*/
// função de logs do middleware de logs do backend
function logRequests(request, response, next){
    const {method, url} = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next(); // próximo middleware
}
//função para validar o ID
function validateProjectId(request, response, next){
    const {id} = request.params;

    if(!isUuid(id)){
        return response.status(400).json({ error: 'Invalid project ID.'});
    }
    return next();
}

//chamando o middleware de log do backend
app.use(logRequests)

//chamando o middleware de validação de id
app.use('/projects/:id', validateProjectId);

const projects = [];
//rota para listar
app.get ('/projects', (request, response) => {
    // solicitação de pesquisa
    const {title} = request.query;

    // todo retorno da rota precisa utilizar o response
    // sempre retornar o json, com um array ou um objeto
    const results = title
     ? projects.filter(project => project.title.includes(title))
     : projects;
    return response.json(results);
});
//rota para criar
app.post('/projects', (request, response) => {
    const {title, owner } = request.body;
    
    const project = {id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);
})
//rota para alterar
app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const {title, owner } = request.body;
    
    const projectIndex = projects.findIndex(project => project.id == id);
    
    if(projectIndex < 0){
       return response.status(400).json({ error: 'Project not found'}) 
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
    
})
//rota para deletar
app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);
    
    if(projectIndex < 0){
       return response.status(400).json({ error: 'Project not found'}) 
    }

    projects.splice(projectIndex, 1)

    return response.status(204).send()
})
//precisamos ouvir uma porta por padrão é usada a 3333 para a aplicação iniciar
//adiconando uma arrow function para inserir mensagem no backend
app.listen(3333, () => {
    console.log(' Back-end started!')
});