import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addMatch } from "../services/api_service";
import { playersData } from "../utils/playerSlice";
import "./AddMatchPage.css";

const AddMatchPage = () => {
  const [match, setMatch] = useState({});
  const [errors, setErrors] = useState({});
  const players = useSelector(playersData);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setMatch({ ...match, [id]: value });

    console.log(match);

    validateField(id, value);
  };

  const validateField = (field, value) => {
    let errorMsg = "";

    switch (field) {
      case "player1Id":
      case "player2Id":
        if (!value) errorMsg = "Player ID is required";
        if (value <= 0) errorMsg = "Player ID must be a positive number";
        break;
      case "matchDate":
        if (!value) errorMsg = "Match Date is required";
        break;
      case "matchLevel":
        if (!value.trim()) errorMsg = "Match Level is required";
        break;
      case "winnerId":
        if (value < 0) errorMsg = "Winner ID cannot be negative";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMsg }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!match.player1Id) newErrors.player1Id = "Player 1 ID is required";
    if (!match.player2Id) newErrors.player2Id = "Player 2 ID is required";
    if (match.player1Id <= 0)
      newErrors.player1Id = "Player 1 ID must be a positive number";
    if (match.player2Id <= 0)
      newErrors.player2Id = "Player 2 ID must be a positive number";
    if (!match.matchDate) newErrors.matchDate = "Match Date is required";
    if (!match.matchLevel) newErrors.matchLevel = "Match Level is required";
    if (match.winnerId < 0) newErrors.winnerId = "Winner ID cannot be negative";

    if (match.player1Id === match.player2Id)
      newErrors.player2Id = "Player 2 ID must be different from Player 1 ID";

    if (
      match.winnerId !== match.player1Id &&
      match.winnerId !== match.player2Id
    )
      newErrors.winnerId = "Winner ID must be one of the players";

    if (match.matchDate) {
      const matchDate = new Date(match.matchDate);
      const currentDate = new Date();
      if (matchDate > currentDate) {
        newErrors.matchDate = "Match Date cannot be in the future";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const res = await addMatch(match);
      console.log(res);
      if (res) {
        alert("Match added successfully");
      } else {
        alert("Failed to add match");
      }
    } else {
      alert("Please fix the validation errors before submitting");
    }
  };

  const playerDropdown = (players) => {
    return players.map((player) => (
      <option key={player.playerId} value={player.playerId}>
        {player.firstName} {player.lastName}
      </option>
    ));
  };

  const getWinnerPlayer = (playerId) => {
    const player = players.find((player) => player.playerId === playerId);
    return player ? `${player.firstName} ${player.lastName}` : "";
  };

  return (
    <div className="add-match-container">
      <h1 className="text-center">Add Match</h1>
      <form onSubmit={handleSubmit} className="add-match-form">
        <div className="form-group">
          <label htmlFor="player1Id">Player 1 ID</label>
          <select
            id="player1Id"
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select Player 1</option>
            {playerDropdown(players)}
          </select>
          {errors.player1Id && (
            <div className="error-text">{errors.player1Id}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="player2Id">Player 2 ID</label>
          <select
            id="player2Id"
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select Player 2</option>
            {playerDropdown(players)}
          </select>
          {errors.player2Id && (
            <div className="error-text">{errors.player2Id}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="matchDate">Match Date</label>
          <input
            type="date"
            id="matchDate"
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.matchDate && (
            <div className="error-text">{errors.matchDate}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="matchLevel">Match Level</label>
          <select
            id="matchLevel"
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select Match Level</option>
            <option value="National">National</option>
            <option value="International">International</option>
          </select>
          {errors.matchLevel && (
            <div className="error-text">{errors.matchLevel}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="winnerId">Winner ID</label>
          <select
            id="winnerId"
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select Winner</option>
            <option value={match.player1Id}>Player 1</option>
            <option value={match.player2Id}>Player 2</option>
          </select>
          {errors.winnerId && (
            <div className="error-text">{errors.winnerId}</div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMatchPage;
