import { useEffect, useState } from "react";
import { getMostWonPlayers } from "../services/api_service";
import "./MostWinsPage.css";

const MostWinsPage = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await getMostWonPlayers();
      setPlayers(res);

      console.log(res);
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <h3 className="text-center m-3">Most Wins</h3>
      <div className="d-flex justify-content-center">
        <table className="table player-performance-table w-75">
          <thead>
            <tr>
              <th>Player</th>
              <th>Total Wins</th>
              <th>Win Percentage</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.playerId}>
                <td>{player.fullName}</td>
                <td>{player.totalWins}</td>
                <td>{player.winPercentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MostWinsPage;
