const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerSpec = swaggerJSDoc({
//     explorer: true
//   });

var swaggerDefinition = {
   info: {
     title: 'Node Swagger API',
     version: '1.0.0',
     description: 'Demonstrating how to describe a RESTful API with Swagger',
   },
   host: 'localhost:3000',
   basePath: '/',
 };
 
 // options for the swagger docs
 var options_swagger = {
   // import swaggerDefinitions
   swaggerDefinition: swaggerDefinition,
   // path to the API docs
   apis: ['./routes/*.js'],
 };

//  module.exports=(req,res,next)=>{

// return swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options_swagger)));
// next();
//  }