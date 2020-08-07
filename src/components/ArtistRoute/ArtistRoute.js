import React, { Component } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchArtistProfile,
  abbreviateNumber,
} from "../../helpers/api-helpers";
import {
  requestArtistInfo,
  receiveArtistInfo,
  receiveArtistError,
} from "../../actions";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const artistId = useParams().id;
  const accessToken = useSelector((state) => state.auth.token);
  const artistProfile = useSelector((state) => state.artists.currentArtist);

  React.useEffect(() => {
    if (accessToken) {
      dispatch(requestArtistInfo());
      fetchArtistProfile(accessToken, artistId)
        .then((response) => {
          dispatch(receiveArtistInfo(response));
        })
        .catch((error) => dispatch(receiveArtistError()));
    }
  }, [accessToken]);

  return artistProfile ? (
    <div>
      <img src={artistProfile.profile.images[0].url} />
      <h1>{artistProfile.profile.name}</h1>
      <div>
        <span>
          {abbreviateNumber(artistProfile.profile.followers.total)} followers
        </span>
      </div>
      <h2>Tags</h2>
      <span>{`${artistProfile.profile.genres[0]}, ${artistProfile.profile.genres[1]}`}</span>
    </div>
  ) : (
    <div>LOADING...</div>
  );
};

export default ArtistRoute;
