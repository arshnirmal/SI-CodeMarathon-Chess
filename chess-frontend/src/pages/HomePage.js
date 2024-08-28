import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatches, getPlayers } from "../services/api_service";
import { playersData, setPlayers } from "../utils/playerSlice";
import "./HomePage.css";

function Home() {
  const dispatch = useDispatch();
  const players = useSelector(playersData);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchApiData = async () => {
      const playerdata = await getPlayers();
      dispatch(setPlayers(playerdata));

      const matchdata = await getMatches();
      setMatches(matchdata);
    };

    fetchApiData();
  }, [dispatch]);

  const renderplayers = (player) => {
    return (
      <div className="card" key={player.id}>
        <img src={player.imageUrl} alt={player.firstName} height={"150px"} />
        <h3>{player.firstName + " " + player.lastName}</h3>
        <p>World Ranking: {player.currentWorldRanking}</p>
      </div>
    );
  };

  return (
    <div className="home-container m-4">
      <div className="banner">
        <h1>Welcome to Chess Performance Tracker</h1>
        <p>Track and analyze the performance of top chess players</p>
      </div>

      <div className="scroll-container">
        <h2>Top Players</h2>
        <div className="scrolling-wrapper">
          {players.map((player) => renderplayers(player))}
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
