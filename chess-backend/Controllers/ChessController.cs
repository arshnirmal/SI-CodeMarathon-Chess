using chess_backend.DataAccessLayers;
using chess_backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace chess_backend.Controllers {
    [Route("api/[controller]")]
    public class ChessController : ControllerBase {
        private readonly IChessDAO _repository;
        public ChessController(IChessDAO repository) {
            _repository = repository;
        }

        [HttpPost("matches", Name = "AddMatch")]
        public async Task<IActionResult> AddMatch([FromBody] AddMatchRequest match) {
            if(match == null) {
                return BadRequest();
            }

            bool result = await _repository.AddMatch(match);
            if(result) {
                return Ok();
            } else {
                return BadRequest();
            }
        }

        [HttpGet("players/by-country", Name = "GetPlayersByCountry")]
        public async Task<IActionResult> GetPlayersByCountry([FromQuery] string country, [FromQuery] bool isDesc) {
            List<Player> players = await _repository.GetPlayersByCountry(country, isDesc);
            if(players.Count > 0) {
                return Ok(players);
            } else {
                return NotFound("No players found for the given country.");
            }
        }

        [HttpGet("players/performances", Name = "GetPlayerPerformances")]
        public async Task<IActionResult> GetPlayerPerformances() {
            List<PlayerPerformance> performances = await _repository.GetPlayerPerformances();
            if(performances.Count > 0) {
                return Ok(performances);
            } else {
                return NotFound("No player performances found.");
            }
        }

        [HttpGet("players/mostwins", Name = "GetPlayersWithMostWins")]
        public async Task<IActionResult> GetPlayersWithMostWins() {
            List<PlayerPerformance> players = await _repository.GetPlayersWithMostWins();
            if(players.Count > 0) {
                return Ok(players);
            } else {
                return NotFound("No players found.");
            }
        }

        [HttpGet("players", Name = "GetPlayers")]
        public async Task<IActionResult> GetPlayers() {
            List<Player> players = await _repository.GetPlayers();
            if(players.Count > 0) {
                return Ok(players);
            } else {
                return NotFound("No players found.");
            }
        }

        [HttpGet("player/{playerId}", Name = "GetPlayerById")]
        public async Task<IActionResult> GetPlayerById(int playerId) {
            Player player = await _repository.GetPlayerById(playerId);
            if(player != null) {
                return Ok(player);
            } else {
                return NotFound("Player not found.");
            }
        }

        [HttpGet("players/countries", Name = "GetPlayerCountries")]
        public async Task<IActionResult> GetPlayerCountries() {
            List<String> countries = await _repository.GetPlayerCountries();
            if(countries.Count > 0) {
                return Ok(countries);
            } else {
                return NotFound("No countries found.");
            }
        }

        [HttpGet("matches", Name = "GetMatches")]
        public async Task<IActionResult> GetMatches() {
            List<Match> matches = await _repository.GetMatches();
            if(matches.Count > 0) {
                return Ok(matches);
            } else {
                return NotFound("No matches found.");
            }
        }
    }
}
