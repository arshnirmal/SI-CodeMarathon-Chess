using chess_backend.Models;

namespace chess_backend.DataAccessLayers {
    public interface IChessDAO {
        Task<bool> AddMatch(AddMatchRequest request);

        Task<List<Player>> GetPlayersByCountry(string country, bool isDesc);

        Task<List<PlayerPerformance>> GetPlayerPerformances();

        Task<List<PlayerPerformance>> GetPlayersWithMostWins();

    }
}
