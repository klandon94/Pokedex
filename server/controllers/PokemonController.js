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
        })
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
                            if (err) {
                                group.pokemons.pop();
                                Pokemon.findOneAndDelete({_id:pokemon._id}, err2 => {return res.json(err);})
                            }
                            else return res.json(pokemon);
                        })
                    }
                    else return res.json(err);
                })
            }
        })
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
        })
    }

    update(req,res) {
        Pokemon.findById(req.params.id, (err,pokemon) => {
            if (!pokemon) return res.json(err);
            pokemon.set(req.body);
            pokemon.save((err, updatedPokemon) => {
                if (err) return res.json(err);
                return res.json(updatedPokemon);
            })
        })
    }

    destroy(req,res) {
        Pokemon.findOne({_id:req.params.id}, (err,pokemon) => {
            if (!pokemon) return res.json(err);
            Pokemon.remove({_id:req.params.id}, err => {
                if (err) return res.json(err);
                return res.json(pokemon);
            })
        })
    }
}

module.exports = new PokemonController();