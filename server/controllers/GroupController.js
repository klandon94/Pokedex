const Group = require("../models/Group");

class GroupController {
    create(req, res) {
        let group = new Group(req.body);
        group.save(errs => {
            if (errs) return res.json(errs);
            return res.json(group);
        })
    }

    all(req,res) {
        Group.find({})
        .populate({
            path: "pokemons",
            model: "Pokemon"
        })
        .exec((err, groups) => {
            if (err || !groups) return res.json(err);
            return res.json(groups);
        })
    }

    findById(req,res) {
        Group.find({_id:req.params.id})
        .populate({
            path: "pokemons",
            model: "Pokemon"
        })
        .exec((err, group) => {
            if (err || !group) return res.json(err);
            return res.json(group);
        })
    }
}

module.exports = new GroupController();