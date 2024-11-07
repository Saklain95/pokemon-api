import './Search.css';

function Search(){
    return(
        <div className='Search-wrapper'>
               <input className='search' type="text" placeholder='search pokemon name...' />
        </div>
    );
}

export default Search;