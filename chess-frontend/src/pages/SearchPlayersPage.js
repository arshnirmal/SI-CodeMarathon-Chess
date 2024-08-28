import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerCard from "../components/PlayerCard";
import { getAllCountries, getPlayerByCountry } from "../services/api_service";
import { countriesData, setCountries } from "../utils/countrySlice";
import "./SearchPlayersPage.css";

const SearchPlayersPage = () => {
  const dispatch = useDispatch();
  const countries = useSelector(countriesData);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchApiData = async () => {
      const countriesdata = await getAllCountries();
      dispatch(setCountries(countriesdata));
    };

    fetchApiData();
  }, [dispatch]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const countriesList = countries.map((country) => {
    return (
      <option key={country} value={country}>
        {country}
      </option>
    );
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedCountry);

    const res = await getPlayerByCountry(selectedCountry, false);
    console.log(res);
    setPlayers(res);

    setSelectedCountry("");
  };

  return (
    <div>
      <h3 className="text-center m-3">Search Players</h3>
      <div className="d-flex justify-content-center">
        <select
          className="form-select w-50"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>
          {countriesList}
        </select>

        <button
          className="btn btn-primary mx-4"
          onClick={handleSubmit}
          disabled={!selectedCountry}
        >
          Search
        </button>
      </div>

      <div className="players-container mt-4 justify-content-center mt-4 d-flex flex-wrap">
        <div className="w-75">
          {players.length > 0 ? (
            players.map((player) => <PlayerCard player={player} />)
          ) : (
            <h5 className="text-center no-players-text">No Players Found</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPlayersPage;
