import './App.css';
import { useRandom } from './hooks/useRandom';

export const App = () => {
  const query = useRandom();

  return (
    <div className="card">
      {!query.isFetching && query.error && (
        <h2>Error: {query.error.message}</h2>
      )}
      {!query.isFetching && !query.error && <h2>Number: {query.data}</h2>}
      {query.isFetching && <h2>Loading...</h2>}
      <button onClick={() => query.refetch()}>New Number</button>
    </div>
  );
};
