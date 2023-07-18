import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPokemon, getTypes} from '../src/redux/actions';

import {Detail, Error, Form, Home, LP} from './views/indexViews.js';
import {NavBar} from './components/indexComponents';

function App() {

  const location = useLocation()
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      dispatch(getAllPokemon());
      dispatch(getTypes());
      setInitialized(true);
    }
  }, [dispatch, initialized]);

  return (
    <div className="App">
      {location.pathname !== ('/') && <NavBar/>}
      <Routes>
        <Route path= "*" element={<Error/>}/>
        <Route path= "/" element={<LP/>}/>
        <Route path= "/home" element={<Home/>}/>
        <Route path= "/form" element={<Form/>}/>
        <Route path= "/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
