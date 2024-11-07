import { useEffect, useState } from 'react';
import './PokemonList.css';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';
// import { Vortex } from 'react-loader-spinner'; // Uncomment if using a loader spinner

function PokemonList() {
    // State to hold the list of Pokémon
    const [pokemonList, setPokemonList] = useState([]);
    // State to manage loading state
    const [isLoading, setIsLoading] = useState(true);
    
    // State to manage the API URL for the Pokémon list
    const [pokedex_url, setPokedex_url] = useState('https://pokeapi.co/api/v2/pokemon/');

    // State to hold URLs for pagination
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    // Function to fetch Pokémon data
    async function downloadPokemons() {
        setIsLoading(true); // Set loading to true before fetching

        // Fetch the Pokémon data which is present in the website through the API
        const response = await axios.get(pokedex_url);  
        console.log('getting url',response); // Log the response for debugging

        // Update the state with next and previous URLs for pagination
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        // Get the Pokémon results from the response
        const pokemonResult = response.data.results; 
        console.log(pokemonResult); // Log the Pokémon results for debugging

        // Create an array of promises to fetch details for each Pokémon url
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
        console.log(pokemonResultPromise); // Log the array of promises for debugging

        // Resolve all the promises to get detailed Pokémon data or wait untill all pokemonResultPromise array is loaded fully
        const pokemonData = await axios.all(pokemonResultPromise); // Array of detailed Pokémon data
        console.log(pokemonData)

        // Map the detailed data to a simpler format for rendering
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data; // Get the detailed Pokémon data
            return {
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default, // Get the Pokémon image
                types: pokemon.types, // Get Pokémon types
                id: pokemon.id // Get Pokémon ID
            }
        });
        // Update the state with the formatted Pokémon list
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false); // Set loading to false after data is fetched
    }

    // useEffect to call downloadPokemons when the component mounts or when pokedex_url changes
    useEffect(() => {
        downloadPokemons();
    }, [pokedex_url]);

    return (
        <div className='PokemonList-wrapper'>
            {/* Optional header for the Pokémon list */}
            {/* <h3>Pokemon Lists here</h3> */}
            <div className='pokemon-wrapper'>
                {/* Conditional rendering for loading state */}
                {(isLoading) ? <p id='loading-display'>Loading the data please wait....</p> : 
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
            </div>
            <div className='btn-wrapper'>
                {/* Button to go to the previous page of Pokémon */}
                <button className='btn' disabled={prevUrl == null} onClick={() => setPokedex_url(prevUrl)}>Prev</button>
                {/* Button to go to the next page of Pokémon */}
                <button className='btn' onClick={() => setPokedex_url(nextUrl)}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;
