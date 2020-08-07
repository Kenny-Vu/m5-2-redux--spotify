export function fetchArtistProfile(token, artistId) {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const url = `https://api.spotify.com/v1/artists/${artistId}`;

  return fetch(url, options).then((response) => {
    return response.json();
  });
}

export const abbreviateNumber = (amount) => {
  if (amount.toString().length > 6) {
    return `${Math.floor(amount / 1000000)}M`;
  }
  if (amount.toString().length > 3) {
    return `${Math.floor(amount / 1000)}K`;
  } else {
    return amount;
  }
};
