import axios from "axios";

export async function getRecipe(keyword) {
  const response = await fetch(
    `https://openapi.foodsafetykorea.go.kr/api/607eeb411bbe475e9319/COOKRCP01/json/1/10/RCP_PARTS_DTLS=${keyword}`,
  );
  const data = response.json();
  return data;
}

export async function getPost(accessToken) {
  const data = await axios.get(`http://localhost:4000/post`, {
    headers: { "Content-Type": "application/json" },
    Authorization: accessToken,
    withCredentials: true,
  });
  return data;
}
