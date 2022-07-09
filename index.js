const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors=require ('cors');

app.use(cors());

//For the data
const pokemonslist=require("./data/pokemonslist");

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



app.listen(port, () => {
  console.log(`Pokemons app listening on port ${port}`)
})