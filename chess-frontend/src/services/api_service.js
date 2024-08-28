import axios from "axios";

const BASE_URL = "https://localhost:7098/api/Chess";

export async function getPlayers() {
  const url = `${BASE_URL}/players`;
  const response = await axios.get(url);

  try {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching players");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getMatches() {
  const url = `${BASE_URL}/matches`;
  const response = await axios.get(url);

  try {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching matches");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function addMatch(match) {
  const response = await axios.post(`${BASE_URL}/match`, match);

  try {
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("Error adding match");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getPlayerByCountry(country, isDesc) {
  const url = `${BASE_URL}/players/by-country?country=${country}&isDesc=${isDesc}`;
  const response = await axios.get(url);

  try {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching players by country");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getTopPlayers() {
  const response = await axios.get(`${BASE_URL}/players/performance`);

  try {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching top players");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getMostWonPlayers() {
  const response = await axios.get(`${BASE_URL}/players/mostwins`);

  try {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching most won players");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getAllCountries() {
  const response = await axios.get(`${BASE_URL}/players/countries`);

  try {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching countries");
    }
  } catch (e) {
    console.log(e);
  }
}
