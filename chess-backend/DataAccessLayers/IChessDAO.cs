using chess_backend.Models;

namespace chess_backend.DataAccessLayers {
    public interface IChessDAO {
        Task<List<Player>> GetPlayers();
        Task<Player> GetPlayerById(int playerId);
        Task<List<String>> GetPlayerCountries();
        Task<List<Match>> GetMatches();
        Task<bool> AddMatch(AddMatchRequest match);
        Task<List<Player>> GetPlayersByCountry(string country, bool isDesc);
        Task<List<PlayerPerformance>> GetPlayerPerformances();
        Task<List<PlayerPerformance>> GetPlayersWithMostWins();

    }
}
