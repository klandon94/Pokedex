const Pokemon = require("../models/Pokemon");
const Group = require("../models/Group");

class PokemonController {
    all(req,res) {
        Pokemon.find({group:req.params.gid})
        .populate({
            path: "group",
            model: "Group"
        })
        .exec((err,pokemons) => {
            if (err) return res.json(err);
            else return res.json(pokemons);
        });
    }

    create(req,res) {
        let pokemon = new Pokemon(req.body);
        pokemon.group = req.params.gid;
        pokemon.save(err => {
            if (err) return res.json(err);
            else{
                Group.findOne({_id:req.params.gid}, (err,group) => {
                    if (group) {
                        group.pokemons.push(pokemon._id);
                        group.save(err => {
                            // If error occurs once group is saved, it is because the limit of 5 pokemon has been reached, therefore
                            // I need to pop the pokemon that was just added and delete the pokemon from the pokemons collection. The
                            // jsonified err must be returned that specifies the limit was reached, which is why err2 was declared in the
                            // findOneAndDelete method
                            if (err) {
                                group.pokemons.pop();
                                Pokemon.findOneAndDelete({_id:pokemon._id}, err2 => {
                                    return res.json(err);
                                });
                            }
                            else return res.json(pokemon);
                        });
                    }
                    else return res.json(err);
                });
            }
        });
    }

    findById(req,res) {
        Pokemon.findOne({_id:req.params.id})
        .populate({
            path: "group",
            model: "Group"
        })
        .exec((err, pokemon) => {
            if (err) return res.json(err);
            return res.json(pokemon);
        });
    }

    update(req,res) {
        Pokemon.findById(req.params.id, (err,pokemon) => {
            if (!pokemon) return res.json(err);
            pokemon.set(req.body);
            pokemon.save((err, updatedPokemon) => {
                if (err) return res.json(err);
                return res.json(updatedPokemon);
            });
        });
    }

    destroy(req,res) {
        Pokemon.findOne({_id:req.params.id}, (err,pokemon) => {
            if (err) return res.json(err);
            let groupid = pokemon.group;
            let pokeid = pokemon._id;
            Pokemon.remove({_id:req.params.id}, err => {
                if (err) return res.json(err);
                // Without this step, the pokemon would be removed from the pokemons collection but would still be present
                // in its group's list of pokemons. Therefore need to find the pokemon's group and splice its array at the index
                // of wherever the deleted pokemon's id was located at
                Group.findOne({_id:groupid}, (err, group) => {
                    if (err) return res.json(err);
                    let index = group.pokemons.map(i => {return i._id}).indexOf(pokeid);
                    group.pokemons.splice(index, 1);
                    group.save(err => {
                        return res.json(group);
                    });
                });
            });
        });
    }
}

module.exports = new PokemonController();