import axios from "axios";

const BASE_URL = "http://localhost:7098/api/Chess";

export async function getPlayers() {
  const response = await axios.get(`${BASE_URL}/players`);

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
  const response = await axios.get(`${BASE_URL}/matches`);

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
  const response = await axios.post(`${BASE_URL}/matches`, match);

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

export async function getPlayerByCountry({ country, isDesc }) {
  const response = await axios.get(
    `${BASE_URL}/players/by-country?country=${country}&isDesc=${isDesc}`
  );

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
