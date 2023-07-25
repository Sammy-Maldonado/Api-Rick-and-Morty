import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards/Cards';
import InputGroup from '../components/Filters/Category/InputGroup';

const Episodes = () => {
  let [id, setID] = useState(1);
  let [info, setInfo] = useState([]);
  let [results, setResults] = useState([]);
  let { air_date, name } = info;
  let api = `https://rickandmortyapi.com/api/episode/${id}`;

  useEffect(() => {
    //Función asíncrona autoejecutable para realizar la llamada a la API
    (async function () {
      //Obteniendo los datos las Localidades en la API de rym
      let data = await fetch(api)
        .then((res) => res.json());
      setInfo(data);  //Actualizando el estado "info"

      // Realizando múltiples llamadas a la API de los residentes de cada localidad
      let a = await Promise.all(
        data.characters.map((value) => {
          return fetch(value)
            .then((res) => res.json());
        })
      );
      setResults(a);  //Actualizando el estado "results"
    })();
  }, [api]);

  return (
    <div className='container'>
      <div className='row mb-4'><h1 className='ph1 text-center mb-4'>Episodio : {name === "" ? "Desconocido" : name}</h1>
        <h5 className='text-center'>Air Date {air_date === "" ? "Desconocido" : air_date}</h5>
      </div>

      <div className='row'>
        <div className='col-lg-3 col-12'>
          <h4 className='episodio-txt text-center mb-4'> Elige un episodio </h4>
          <InputGroup setID={setID} name='Episodio' total={51} />
        </div>
        
        <div className='col-lg-8 col-12'>
          <div className='row'>
            <Cards page='/episodes/' results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;