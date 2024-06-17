import { useEffect, useReducer, useState } from 'react';
import './App.css';

const getRandomNumberFromAPI = async (): Promise<number> => {
  const response = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
  );
  const numberString = await response.text();
  // throw new Error('Ups! Error');
  return +numberString;
};

export const App = () => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefetch] = useReducer(x => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    setError('');
    getRandomNumberFromAPI()
      .then(setNumber)
      .catch(e => setError(e.message));
  }, [key]);

  useEffect(() => {
    if (number) setIsLoading(false);
  }, [number]);

  useEffect(() => {
    if (error) setIsLoading(false);
  }, [error]);

  return (
    <div className="card">
      {!isLoading && error && <h2>Error: {error}</h2>}
      {!isLoading && !error && <h2>Number: {number}</h2>}
      {isLoading && <h2>Loading...</h2>}
      <button onClick={forceRefetch}>New Number</button>
    </div>
  );
};
