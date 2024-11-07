import './Pokemon.css';
import { Link } from 'react-router-dom';

function Pokemon({ name, image, id }) {
  return (
    <div className='p-wrapper'>
       <Link to={`/pokemon/${id}`}>
       <h5 id='h5'>{name}</h5>
       <img id='img' src={image} />
       </Link>
    </div>
  );
}

export default Pokemon;