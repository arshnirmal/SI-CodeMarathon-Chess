namespace chess_backend.Models {
    public class Match {
        public int MatchId { get; set; }
        public string Player1Name { get; set; }
        public string Player2Name { get; set; }
        public DateTime MatchDate { get; set; }
        public string MatchLevel { get; set; }
        public string WinnerName { get; set; }
    }
}
