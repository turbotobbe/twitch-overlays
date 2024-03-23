import { FC, Dispatch, SetStateAction } from 'react';

interface HomeProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const Home: FC<HomeProps> = ({ count, setCount }) => {
  return (
    <div>
      <p>Home</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Home;