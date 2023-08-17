import React from "react";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = React.useState<string[]>([]);

  const loadPokemons = async () => {
    let offset = 0;
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then(({ data }) => {
        const newPokemons: string[] = [];
        data.results.forEach((p: any) => newPokemons.push(p.name));
        setPokemon((oldPokemon: string[]) => [...oldPokemon, ...newPokemons]);
      })
      .catch((err) => console.log(err));
    offset += 10;
  };

  const handleScroll = (e: any) => {
    console.log("Hi");
    console.log("top: ", e.target.documentElement.scrollTop); // scroll from the top of the document;
    console.log("window: ", window.innerHeight); // height of the browser window;
    console.log("height: ", e.target.documentElement.scrollHeight); // total height of the content in the document, including the part that is not currently visible due to scrolling;

    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      console.log("scrolled to bottom");
      loadPokemons();
    }
  };

  React.useEffect(() => {
    loadPokemons();
    window.addEventListener("scroll", handleScroll);
  }, []);

  // console.log(pokemon);
  return (
    <main className="p-8 flex flex-col justify-center items-center">
      {pokemon.map((p, i) => {
        return (
          <main key={i} className="h-40 w-80  bg-gray-100 rounded-md mb-10">
            <div className="flex justify-center items-center h-full">
              {i + 1}.{p}
            </div>
          </main>
        );
      })}
    </main>
  );
};

export default App;
