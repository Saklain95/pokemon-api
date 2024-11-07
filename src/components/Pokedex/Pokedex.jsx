import './Pokedex.css'
import Search from '../Search/Search';
import PokemonList from '../PokemonList/PokemonList';

function Pokedex() {
    return (
        <div className='pokedex-wrapper'>
            <center> <Search/> </center>
            <PokemonList />
        </div>
    );
}

export default Pokedex;