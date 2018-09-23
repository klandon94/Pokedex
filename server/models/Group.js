let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let GroupSchema = new mongoose.Schema({
    user: {
        type: String, 
        required: [true, "Please enter a name"]
    },
    pokemons: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Pokemon'
        }],
        validate: [length, 'Can only have 6 pokemon']
    }
});

function length(val){
    return val.length <= 6;
}

var Group = mongoose.model("Group", GroupSchema);
module.exports = Group;