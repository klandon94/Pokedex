let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    weight: {
        type: Number,
        required: [true, "Please enter a weight"],
        min: [0, "Must be over 0"]
    },
    abilities: [{
        type: String,
        required: false
    }],
    number: {
        type: Number
    },
    group: {type: Schema.Types.ObjectId, ref: "Group"}
});

var Pokemon = mongoose.model("Pokemon", PokemonSchema);
module.exports = Pokemon;