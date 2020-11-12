var express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
  const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const options = {
    definition: {
      info: {
        title: "Student api",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:5000/api/students",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

app.use("/api/students", require("./routes/students"));

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);