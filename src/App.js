import React from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [ pokemons, alteraPokemons] = React.useState([]);
  const [ txtPokemon, alteraTxtPokemon]= React.useState('');

  function buscaPokemon(){
    axios.get("https://pokeapi.co/api/v2/pokemon/"+ txtPokemon)
    .then(response=>{
      console.log("requisição bem sucedida!");
      console.log(response)
      alteraTxtPokemon (response.data.results);
    })
    .catch(response=>{
      console.log("Deu ruim na requisição");
      console.log(response);
    })

  }

  function buscaTodosPokemons(){
    //pokemon    -> busca todos pokemon
    //pokemon/limit=x -> busca todos com um numero limite
    //pokemon/nome ->  busca um pokemon especifico
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")
    .then(response=>{
      console.log("requisição bem sucedida!");
      console.log(response)
      alteraPokemons (response.data.results);
    })// Será executado quando a requisição terminar
    .catch(response=>{
      console.log("Deu ruim na requisição");
      console.log(response);
    })// É executado quando dá erro na requisição
    
  }
  // if(pokemons.length == 0){
  //   buscaTodosPokemons();
  // }
  React.useEffect( ()=>{
    buscaTodosPokemons();
  }, []);
  
  return (
    <div>
      <h1> Egmar Pokédex</h1> 
      <p> conheça os Pokémons mais famosos</p>

      <input onChange={(e)=> alteraTxtPokemon(e.target.value)} placeholder="Digite o nome de um pokémon"/>
      <button onClick={()=> buscaPokemon () }>Buscar</button>
      {
        pokemons.map( (pokemon, index) =>
          <div>
              <p>{pokemon.name}</p>
              <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+(index+1)+".gif"}/>
          </div>
          )
      }
    </div>
  );
}

export default App;
