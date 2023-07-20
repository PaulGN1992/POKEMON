import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPokemon, getTypes} from '../src/redux/actions';

import {Detail, Error, Form, Home, LP} from './views/indexViews.js';
import {NavBar, Loading} from './components/indexComponents';

function App() {

  const location = useLocation()
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!initialized) {
      setIsLoading(true); 
      Promise.all([dispatch(getAllPokemon()), dispatch(getTypes())])
        .then(() => {
          setIsLoading(false); 
          setInitialized(true);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false); // En caso de error también se debe establecer isLoading en false
        });
    }
  }, [dispatch, initialized]);

  console.log(initialized)
 
  if(isLoading) {
    return <Loading/>
  }

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
