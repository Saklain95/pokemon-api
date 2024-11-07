import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import './PokemonDetails.css';

function PokemonDetails() {
    const { id } = useParams();
    console.log(id);
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        // console.log(response);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        });
    }

    useEffect(() => {
        downloadPokemon();
    }, []); // Add id as a dependency to refetch when it changes

    return (
        <div className="pd-wrapper">
            {pokemon.image && <img className='pokemon-details-image' src={pokemon.image} alt={pokemon.name} />}
            <div className="pokemon-details-name">{pokemon.name}</div>
            <div className='pokemon-details-wh'>Weight: {pokemon.weight}</div>
            <div className='pokemon-details-wh'>Height: {pokemon.height}</div>
            <div className='pokemon-details-types'>{pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}</div>
        </div>
    );
}

export default PokemonDetails;
