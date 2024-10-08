﻿using chess_backend.Models;
using Npgsql;

namespace chess_backend.DataAccessLayers {
    public class ChessDAO : IChessDAO {
        private readonly NpgsqlConnection _connection;

        public ChessDAO(NpgsqlConnection connection) {
            _connection = connection;
        }

        public async Task<List<Player>> GetPlayers() {
            string query = @"SELECT 
                                player_id, first_name, last_name, country, current_world_ranking, total_matches_played
                            FROM 
                                chess.players";

            List<Player> players = [];

            try {
                await _connection.OpenAsync();
                var cmd = new NpgsqlCommand(query, _connection);

                using(cmd) {
                    var reader = await cmd.ExecuteReaderAsync();

                    using(reader) {
                        while(reader.Read()) {
                            players.Add(
                                new Player {
                                    PlayerId = int.TryParse(reader["player_id"].ToString(), out int playerId) ? playerId : -1,
                                    FirstName = reader["first_name"].ToString() ?? "null",
                                    LastName = reader["last_name"].ToString() ?? "null",
                                    Country = reader["country"].ToString() ?? "null",
                                    CurrentWorldRanking = int.TryParse(reader["current_world_ranking"].ToString(), out int currentWorldRanking) ? currentWorldRanking : -1,
                                    TotalMatchesPlayed = int.TryParse(reader["total_matches_played"].ToString(), out int totalMatchesPlayed) ? totalMatchesPlayed : -1
                                }
                            );
                        }
                    }
                }
            } catch(Exception e) {
                Console.WriteLine(e);
            } finally {
                await _connection.CloseAsync();
            }

            return players;
        }

        public async Task<Player> GetPlayerById(int playerId) {
            string query = @"SELECT 
                                player_id, first_name, last_name, country, current_world_ranking, total_matches_played
                            FROM 
                                chess.players
                            WHERE 
                                player_id = @playerId";

            Player player = null;

            try {
                await _connection.OpenAsync();
                var cmd = new NpgsqlCommand(query, _connection);

                using(cmd) {
                    cmd.Parameters.AddWithValue("playerId", NpgsqlTypes.NpgsqlDbType.Integer, playerId);
                    var reader = await cmd.ExecuteReaderAsync();

                    using(reader) {
                        if(reader.Read()) {
                            player = new Player {
                                PlayerId = int.TryParse(reader["player_id"].ToString(), out int id) ? id : -1,
                                FirstName = reader["first_name"].ToString() ?? "null",
                                LastName = reader["last_name"].ToString() ?? "null",
                                Country = reader["country"].ToString() ?? "null",
                                CurrentWorldRanking = int.TryParse(reader["current_world_ranking"].ToString(), out int currentWorldRanking) ? currentWorldRanking : -1,
                                TotalMatchesPlayed = int.TryParse(reader["total_matches_played"].ToString(), out int totalMatchesPlayed) ? totalMatchesPlayed : -1
                            };
                        }
                    }
                }
            } catch(Exception e) {
                Console.WriteLine(e);
            } finally {
                await _connection.CloseAsync();
            }

            return player;
        }

        public async Task<List<String>> GetPlayerCountries() {
            string query = @"SELECT DISTINCT country FROM chess.players";

            List<String> countries = [];

            try {
                await _connection.OpenAsync();
                var cmd = new NpgsqlCommand(query, _connection);

                using(cmd) {
                    var reader = await cmd.ExecuteReaderAsync();

                    using(reader) {
                        while(reader.Read()) {
                            countries.Add(reader["country"].ToString() ?? "null");
                        }
                    }
                }
            } catch(Exception e) {
                Console.WriteLine(e);
            } finally {
                await _connection.CloseAsync();
            }

            return countries;
        }

        public async Task<List<Match>> GetMatches() {
            string query = @"SELECT 
                                m.match_id,
                                p.first_name || ' ' || p.last_name AS player1_name,
                                p2.first_name || ' ' || p2.last_name AS player2_name,
                                m.match_date,
                                m.match_level,
                                p3.first_name || ' ' || p3.last_name AS winner_name
                            FROM
                                chess.matches m
                            LEFT JOIN
                                chess.players p ON m.player1_id = p.player_id
                            LEFT JOIN
                                chess.players p2 ON m.player2_id = p2.player_id
                            LEFT JOIN
                                chess.players p3 ON m.winner_id = p3.player_id";

            List<Match> matches = [];

            try {
                await _connection.OpenAsync();
                var cmd = new NpgsqlCommand(query, _connection);

                using(cmd) {
                    var reader = await cmd.ExecuteReaderAsync();

                    using(reader) {
                        while(reader.Read()) {
                            matches.Add(
                                new Match {
                                    MatchId = int.TryParse(reader["match_id"].ToString(), out int matchId) ? matchId : -1,
                                    Player1Name = reader["player1_name"].ToString() ?? "null",
                                    Player2Name = reader["player2_name"].ToString() ?? "null",
                                    MatchDate = DateTime.TryParse(reader["match_date"].ToString(), out DateTime matchDate) ? matchDate : DateTime.MinValue,
                                    MatchLevel = reader["match_level"].ToString() ?? "null",
                                    WinnerName = reader["winner_name"].ToString() ?? "null"
                                }
                            );
                        }
                    }
                }
            } catch(Exception e) {
                Console.WriteLine(e);
            } finally {
                await _connection.CloseAsync();
            }

            return matches;
        }

        public async Task<bool> PlayerExists(int playerId) {
            string query = "SELECT COUNT(*) FROM chess.players WHERE player_id = @        public async Task<bool> PlayerExists(int playerId) {\r\n";

            try {
                await _connection.OpenAsync();
                var cmd = new NpgsqlCommand(query, _connection);

                using(cmd) {
                    cmd.Parameters.AddWithValue("playerId", playerId);
                    var result = (long)(await cmd.ExecuteScalarAsync() ?? 0);
                    return result > 0;
                }
            } catch(Exception e) {
                Console.WriteLine(e);
                return false;
            } finally {
                await _connection.CloseAsync();
            }
        }

        public async Task<bool> AddMatch(AddMatchRequest match) {
            bool playersExists = await PlayerExists(match.Player1Id) && await PlayerExists(match.Player2Id);
            if(!playersExists) {
                return false;
            }

            string query = @"INSERT INTO 
                                chess.matches (player1_id, player2_id, match_date, match_level, winner_id) 
                            VALUES 
                                (@player1Id, @player2Id, @matchDate, @matchLevel, @winnerId)";

            try {
                await _connection.OpenAsync();
                var cmd = new NpgsqlCommand(query, _connection);
                using(cmd) {
                    cmd.Parameters.AddWithValue("player1Id", NpgsqlTypes.NpgsqlDbType.Integer, match.Player1Id);
                    cmd.Parameters.AddWithValue("player2Id", NpgsqlTypes.NpgsqlDbType.Integer, match.Player2Id);
                    cmd.Parameters.AddWithValue("matchDate", NpgsqlTypes.NpgsqlDbType.Date, match.MatchDate);
                    cmd.Parameters.AddWithValue("matchLevel", NpgsqlTypes.NpgsqlDbType.Text, match.MatchLevel);
                    cmd.Parameters.AddWithValue("winnerId", NpgsqlTypes.NpgsqlDbType.Integer, match.WinnerId);

                    await cmd.ExecuteNonQueryAsync();
                    return true;
                }

            } catch(Exception e) {
                Console.WriteLine(e);
                return false;
            } finally {
                await _connection.CloseAsync();
            }
        }

        public async Task<List<Player>> GetPlayersByCountry(string country, bool isDesc) {
            string query = $@"SELECT 
                                player_id, first_name, last_name, country, current_world_ranking, total_matches_played
                            FROM 
                                chess.players 
                            WHERE 
                                country = @country
                            ORDER BY 
                                current_world_ranking {(isDesc ? "DESC" : "")}";

            List<Player> players = [];

            try {
                await _connection.OpenAsync();
                var cmd = new NpgsqlCommand(query, _connection);

                using(cmd) {
                    cmd.Parameters.AddWithValue("country", NpgsqlTypes.NpgsqlDbType.Text, country);
                    var reader = await cmd.ExecuteReaderAsync();

                    using(reader) {
                        while(reader.Read()) {
                            players.Add(
                                new Player {
                                    PlayerId = int.TryParse(reader["player_id"].ToString(), out int playerId) ? playerId : -1,
                                    FirstName = reader["first_name"].ToString() ?? "null",
                                    LastName = reader["last_name"].ToString() ?? "null",
                                    Country = reader["country"].ToString() ?? "null",
                                    CurrentWorldRanking = int.TryParse(reader["current_world_ranking"].ToString(), out int currentWorldRanking) ? currentWorldRanking : -1,
                                    TotalMatchesPlayed = int.TryParse(reader["total_matches_played"].ToString(), out int totalMatchesPlayed) ? totalMatchesPlayed : -1
                                }
                            );
                        }
                    }
                }
            } catch(Exception e) {
                Console.WriteLine(e);
            } finally {
                await _connection.CloseAsync();
            }

            return players;
        }

        public async Task<List<PlayerPerformance>> GetPlayerPerformances() {
            string query = @"SELECT 
                                p.player_id,
                                p.first_name || ' ' || p.last_name AS full_name,
                                COUNT(m.match_id) AS total_matches,
                                COUNT(CASE WHEN m.winner_id = p.player_id THEN 1 END) AS total_wins,
                                COALESCE(
                                    ROUND(
                                        (COUNT(CASE WHEN m.winner_id = p.player_id THEN 1 END)::decimal / COUNT(m.match_id)) * 100, 2
                                    ), 0
                                ) AS win_percentage
                            FROM chess.players p
                            LEFT JOIN chess.matches m ON p.player_id = m.player1_id OR p.player_id = m.player2_id
                            GROUP BY p.player_id, p.first_name, p.last_name
                            ORDER BY win_percentage DESC, full_name";

            List<PlayerPerformance> playerPerformances = [];

            try {
                await _connection.OpenAsync();
                var cmd = new NpgsqlCommand(query, _connection);

                using(cmd) {
                    await cmd.ExecuteNonQueryAsync();
                    var reader = await cmd.ExecuteReaderAsync();

                    using(reader) {
                        while(reader.Read()) {
                            playerPerformances.Add(
                                new PlayerPerformance {
                                    PlayerId = int.TryParse(reader["player_id"].ToString(), out int playerId) ? playerId : -1,
                                    FullName = reader["full_name"].ToString() ?? "null",
                                    TotalMatches = int.TryParse(reader["total_matches"].ToString(), out int totalMatches) ? totalMatches : -1,
                                    TotalWins = int.TryParse(reader["total_wins"].ToString(), out int totalWins) ? totalWins : -1,
                                    WinPercentage = decimal.TryParse(reader["win_percentage"].ToString(), out decimal winPercentage) ? winPercentage : -1
                                }
                            );
                        }
                    }
                }
            } catch(Exception e) {
                Console.WriteLine(e);
            } finally {
                await _connection.CloseAsync();
            }

            return playerPerformances;
        }

        public async Task<List<PlayerPerformance>> GetPlayersWithMostWins() {
            string query = @"
                            WITH average_wins AS (
                                SELECT AVG(total_wins) AS avg_wins
                                FROM (
                                    SELECT COUNT(CASE WHEN m.winner_id = p.player_id THEN 1 END) AS total_wins
                                    FROM chess.players p
                                    LEFT JOIN chess.matches m ON p.player_id = m.player1_id OR p.player_id = m.player2_id
                                    GROUP BY p.player_id
                                )
                            )
                            SELECT 
                                p.player_id,
                                p.first_name || ' ' || p.last_name AS full_name,
                                COUNT(CASE WHEN m.winner_id = p.player_id THEN 1 END) AS total_wins,
                                COALESCE(
                                    ROUND(
                                        (COUNT(CASE WHEN m.winner_id = p.player_id THEN 1 END)::decimal / COUNT(m.match_id)) * 100, 2
                                    ), 0
                                ) AS win_percentage
                            FROM 
                                chess.players p
                            LEFT JOIN 
                                chess.matches m ON p.player_id = m.player1_id OR p.player_id = m.player2_id
                            GROUP BY 
                                p.player_id, p.first_name, p.last_name
                            HAVING 
                                COUNT(CASE WHEN m.winner_id = p.player_id THEN 1 END) > (SELECT avg_wins FROM average_wins)
                            ORDER BY 
                                total_wins DESC";

            List<PlayerPerformance> players = [];

            try {
                await _connection.OpenAsync();
                var cmd = new NpgsqlCommand(query, _connection);

                using(cmd) {
                    await cmd.ExecuteNonQueryAsync();
                    var reader = await cmd.ExecuteReaderAsync();

                    using(reader) {
                        while(reader.Read()) {
                            players.Add(
                                new PlayerPerformance {
                                    PlayerId = int.TryParse(reader["player_id"].ToString(), out int playerId) ? playerId : -1,
                                    FullName = reader["full_name"].ToString() ?? "null",
                                    TotalWins = int.TryParse(reader["total_wins"].ToString(), out int totalWins) ? totalWins : -1,
                                    WinPercentage = decimal.TryParse(reader["win_percentage"].ToString(), out decimal winPercentage) ? winPercentage : -1
                                }
                            );
                        }
                    }
                }
            } catch(Exception e) {
                Console.WriteLine(e);
            } finally {
                await _connection.CloseAsync();
            }

            return players;
        }
    }
}