const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 1234;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/public/dist/public'));

app.listen(port, () => {
    console.log("Live on port " + port);
})

require("./server/config/mongoose");
require("./server/config/routes")(app);