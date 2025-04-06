import React from "react";
import useSWR from "swr";
import { useAuth } from "../../AuthContext";

const List = () => {
  const { user } = useAuth();
  const { data, error, isLoading } = useSWR("https://api.github.com/repositories", (url) => fetch(url).then((res) => res.json()));

  return (
    <div className="list-wrapper">
      <div className="app-container">
        <h1 className="app-title">Welcome, {user?.username}</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {(data && !isLoading && !error) && (
          <ul className="list">
            {data && data.map((item) => (
              <li key={item.id} className="list-item">
                <a href={item.html_url} target="_blank">
                  <div className="list-item-image">
                    <img src={`https://opengraph.githubassets.com/123abc/${item.full_name}`} alt={item.full_name}></img>
                  </div>
                  <div className="list-item-content">
                    <p className="list-item-title">{item.full_name}</p>
                    <p className="list-item-subtitle">{item.description}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default List;
