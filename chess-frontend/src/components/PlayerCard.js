const PlayerCard = ({ player }) => {
  return (
    <div key={player.playerId} className="player-card">
      <div className="row">
        <div className="col-8">
          <div className="player-card-title">
            {player.firstName} {player.lastName}
          </div>
          <div className="player-card-subtitle">{player.country}</div>
          <div className="player-card-info">
            <p>World Ranking: {player.currentWorldRanking}</p>
            <p>Matches Played: {player.totalMatchesPlayed}</p>
          </div>
        </div>
        <div className="col-4 player-image">
          <img
            src={player.imageURL}
            alt="player"
            className="player-card-image"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
