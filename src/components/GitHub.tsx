import { FC, useEffect, useState } from 'react';
import { github } from '../links';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface Owner {
  login: string;
  avatar_url: string;
  html_url: string;
}

const GitHub: FC = () => {
  const [repo, setRepo] = useState<Repository | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);

  useEffect(() => {
    const fetchRepo = async () => {
      const response = await fetch(github.repo.api);
      const data = await response.json();
      setRepo(data);
    };

    const fetchOwner = async () => {
      const response = await fetch(github.owner.api);
      const data = await response.json();
      setOwner(data);
    };

    fetchRepo();
    fetchOwner();
  }, []);

  if (!repo || !owner) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className='external'>{repo.html_url}</a>
      </p>
      <p>Stars: {repo.stargazers_count}</p>
      <p>Forks: {repo.forks_count}</p>
      <p>Open issues: {repo.open_issues_count}</p>
      <h2>Owner Information</h2>
      <p>Username: {owner.login}</p>
      <p>
        <a href={owner.html_url} target="_blank" rel="noopener noreferrer" className='external'>{owner.html_url}</a>
      </p>
      <img src={owner.avatar_url} alt={owner.login} />
    </div>
  );
};

export default GitHub;