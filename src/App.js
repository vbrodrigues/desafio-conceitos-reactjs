import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const { data: repo } = await api.post('repositories', {
      title: "front",
      url: "",
      techs: [
        "Python",
        "MySQL",
        "ExpressJS"
      ]
    });

    setRepositories([
      ...repositories,
      repo
    ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repoIndex = repositories.findIndex(repo => repo.id === id);
    console.log(repoIndex);

    if (repoIndex > -1) {
      const updatedRepositories = [...repositories]
      updatedRepositories.splice(repoIndex, 1);
      setRepositories(updatedRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
