const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
const cors=require ('cors');
require("./database/client");
app.use(express.json());

app.use(cors());

//For the pokemons list data
const pokemonslist=require("./data/pokemonslist");

//For the Ranking data in MongoDB
const Ranking = require("./models/Ranking"); 

app.get('/', (req, res) => {
    console.log("welcome");
  res.send('Welcome to the Pokefight Database')
})

app.get('/pokemon', (req, res) => {
    /* console.log("Hola"); */
    res.json(pokemonslist);
  })

app.get("/pokemon/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const onePokemon = pokemonslist.find((x) => x.id === Number(req.params.id));

    if (onePokemon) {
        res.json(onePokemon);
        //By Default express sends 200 all the time
      } else {
        res.status(404).send("The requested Pokemon doesn't exists");//404 Ressource doesn't exist or was found
      }
      }); 


/* RANKING: we need only upsert(with modification of wins/loses in the frontend) or get all itmes */
//GET Ranking
app.get("/ranking", async (req, res) => {
  try {
      const ranking = await Ranking.find({});
      res.json(ranking);
  } catch {
      (error) => console.log(error.message);
  }
  });
//Get one item of the Ranking for modifications
app.get("/ranking/:pokeName", async (req, res) => {
  const {pokeName } = req.params;    
  
  try {
      const rankingItem = await Ranking.find({"poke_name":pokeName});        
      res.json(rankingItem);
  } catch {
      (error) => console.log(error.message);
  }
  });  

//Create new item
app.post("/ranking/addNew", async (req, res) => {
  const {
    rank,
    poke_name, 
    type, 
    wins,
    loses,
    points,
    } = req.body;

  try {
      const newItemRanking = await Ranking.create(req.body);
      res.json(newItemRanking);
  } catch {
      (error) => console.log(error.message);
  }
  });



//Patch item
app.put("/ranking/:winLose/:pokeName", async (req, res) => {

  const { pokeName, winLose } = req.params;
   
  const updation=(winLose)=>{
    let update="";
    if (winLose==="win"){
      update={"$inc": { "wins": 1, "points": 1 } }, { "upsert": true } ;
    }else{
      update={"$inc": { "loses": 1, "points": -1 } }, { "upsert": true } ;
    }
    return update;
  }
  
  try {
    const updatedItemRanking = await Ranking.updateOne({"poke_name":pokeName},updation(winLose), { "upsert": true }  );
    console.log(updatedItemRanking);
    if (!updatedItemRanking)
    return res
        .status(404)
        .send("This item does not exist in the Ranking list, and has to be created before");

    res.json(updatedItemRanking).send("Item patched succesfully!");
} catch {
    (error) => console.log(error.message);
}
  
});  
      

app.listen(port, () => {
  console.log(`Pokemons app listening on port ${port}`)
})