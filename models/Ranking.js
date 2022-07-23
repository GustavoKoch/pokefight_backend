const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const rankingSchema = new Schema({
    rank:{type:Number, required:true},
    poke_name:{type:String, min: 2, max:50, required:true},
    type:{type:Array}, 
    wins:{type:Number, required:true},
    loses:{type:Number, required:true},
    points:{type:Number, required:true},  
   
}, {timestamps:true}
)

//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const Ranking=mongoose.model('Ranking', rankingSchema);

module.exports = Ranking;