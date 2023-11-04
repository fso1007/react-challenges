import axios from "axios";
import { useEffect, useState } from "react";
import "./pokemonApi/pokemonApi.scss"

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function Pokemon({ details }) {
  if (details === null) {
    return <div>-</div>;
  }

  return (
    <div className="m-2 flex border-2 items-center">
      <img
        src={details.sprites.front_default}
        alt={details.name}
        className="border-r-2 w-24 h-24 "
      />
      <div className="mx-2">
        <p className="font-medium">{details.name.toUpperCase()}</p>
        <p>EXP: {details.base_experience}</p>
      </div>
    </div>
  );
}

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      const sortedArray = [...response.data.results];
      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      const promisesArr = sortedArray.map((item) => {
        return axios.get(item.url);
      });

      Promise.all(promisesArr).then((values) => {
        setList(values);
      });
    });
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-center">consumir api pokémon</h1>
      <hr />
      {list.length === 0 && 'loading pokemons...'}
      {list.map((item) => (
        <Pokemon key={item.data.name} details={item.data} />
      ))}
    </div>
  );
}

export default App;
