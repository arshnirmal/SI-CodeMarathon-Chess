import React, { useEffect, useState } from "react";
import { getMatches, getPlayers } from "../services/api_service";
import "./HomePage.css";

function Home() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  const fetchApiData = async () => {
    const playerdata = await getPlayers();
    setPlayers(playerdata);

    const matchdata = await getMatches();
    setMatches(matchdata);
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <div className="home-container m-4">
      <div className="banner">
        <h1>Welcome to Chess Performance Tracker</h1>
        <p>Track and analyze the performance of top chess players</p>
      </div>

      <div className="scroll-container">
        <h2>Top Players</h2>
        <div className="scrolling-wrapper">
          {players.map((player) => (
            <div className="card" key={player.id}>
              <h3>{player.name}</h3>
              <p>World Ranking: {player.ranking}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-container">
        <h2>Recent Matches</h2>
        <div className="scrolling-wrapper">
          {matches.map((match) => (
            <div className="card" key={match.id}>
              <h3>
                {match.player1} vs {match.player2}
              </h3>
              <p>Date: {match.date}</p>
              <p>Winner: {match.winner}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
