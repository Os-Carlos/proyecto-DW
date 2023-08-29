const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {origin: "http://localhost:3001"};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("db sicronizada");
    })
    .catch((err) => {
        console.log("error al sincronizar db: " + err.message);
    });

//root
app.get("/", (req, res) => {
    res.json({ message: "API para el proyecto" });
});

require("./app/routes/clientes.routes")(app);
require("./app/routes/proveedores.routes")(app);
require("./app/routes/empleados.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

