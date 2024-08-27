import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../services/api_service";
import {
  fetchCountriesFailure,
  fetchCountriesStart,
  fetchCountriesSuccess,
} from "../utils/countrySlice";

const SearchPlayersPage = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.countries);
  const countryStatus = useSelector((state) => state.country.status);
  const error = useSelector((state) => state.country.error);

  const fetchCountries = async () => {
    dispatch(fetchCountriesStart());
    try {
      const data = await getAllCountries();
      dispatch(fetchCountriesSuccess(data));
    } catch (e) {
      dispatch(fetchCountriesFailure(e.message));
    }
  };

  useEffect(() => {
    dispatch(fetchCountries());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryStatus, dispatch]);

  return (
    <div>
      <h1>Search Players</h1>
      {countryStatus === "loading" ? (
        <p>Loading...</p>
      ) : countryStatus === "failed" ? (
        <p>{error}</p>
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPlayersPage;
