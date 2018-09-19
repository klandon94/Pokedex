const GroupController = require("../controllers/GroupController");
const PokemonController = require("../controllers/PokemonController");
const path = require("path");

module.exports = app => {
    // GroupController
    app.get("/api/groups", GroupController.all);
    app.get("/api/groups/:id", GroupController.findById);
    app.post("/api/groups", GroupController.create);
    // PokemonController
    app.get("/api/pokemons/:gid", PokemonController.all);
	app.post("/api/pokemons/:gid", PokemonController.create);
	app.get("/api/pokemons/:id", PokemonController.findById);
	app.patch("/api/pokemons/:id", PokemonController.update);
	app.delete("/api/pokemons/:id", PokemonController.destroy);
    
    app.all("*",(req,res,next)=>{
		res.sendFile(path.resolve("./client/public/dist/public/index.html"));
	});
}