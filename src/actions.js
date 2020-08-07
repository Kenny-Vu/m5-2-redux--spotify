//AUTH ACTIONS
export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

//ARTIST ACTIONS
export const requestArtistInfo = () => ({
  type: "REQUEST_ARTIST_INFO",
});
export const receiveArtistInfo = (currentArtist) => ({
  type: "RECEIVE_ARTIST_INFO",
  currentArtist,
});
export const receiveArtistError = () => ({
  type: "RECEIVE_ARTIST_ERROR",
});
