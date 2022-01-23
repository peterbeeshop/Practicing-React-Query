import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const Planets = () => {
  const [page, setPage] = useState(1);

  const fetchPlanets = async (key, page) => {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    return res.json();
  };

  const { data, status } = useQuery("planets", fetchPlanets);
  console.log(data);
  return (
    <div>
      <h2>Planets</h2>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => {
            return <Planet key={planet.name} planet={planet} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Planets;
