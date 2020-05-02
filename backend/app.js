const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const path = require('path');
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

const app = express();
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options_swagger)));

//rrHBFZBZLouDAGSo
//app db connection
//?retryWrites=true&w=majority
//

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

  const connectionString = `mongodb+srv://master:${process.env.MONGO_ATLAS_PWD}@cluster0-2xvlb.mongodb.net/node-angular`;
  //'mongodb://127.0.0.1:27017/node-angular';

      // .connect(`mongodb+srv://master:${process.env.MONGO_ATLAS_PWD}@cluster0-2xvlb.mongodb.net/node-angular`,
    // options)

mongoose
    .connect(connectionString,
    options)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(() => {
        console.log('Connection Failed');
    })

//adding middlewares to parsebody/URI
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

//CORS Enabled
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    next();
});

app.use('/api/posts',postRoutes);
app.use('/api/user',userRoutes);

module.exports = app;