import './App.css'
import CustomRoutes from './Routes/CustomRoutes';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className='app-wrapper'>
      <h1 className='app-heading'>
          <Link to="/">Pokedex.co</Link>
      </h1>
      <CustomRoutes />
    </div>
  );
}

export default App;
