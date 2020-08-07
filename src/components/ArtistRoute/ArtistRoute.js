import React from "react";
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
    <Main>
      <Avatar src={artistProfile.profile.images[0].url} />
      <Name>{artistProfile.profile.name}</Name>
      <Followers>
        <span>{abbreviateNumber(artistProfile.profile.followers.total)}</span>{" "}
        <span> followers</span>
      </Followers>
      <Tags>Tags</Tags>
      <GenreContainer>
        <Genre>{artistProfile.profile.genres[0]}</Genre>
        <Genre>{artistProfile.profile.genres[1]}</Genre>
      </GenreContainer>
    </Main>
  ) : (
    <div>LOADING...</div>
  );
};
const Main = styled.div`
  width: 375px;
  height: 812px;
  background: #0b0f14;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 50%;
  margin-top: 59px;
`;
const Name = styled.h1`
  margin-top: -40px;
  margin-bottom: 25px;
  font-size: 48px;
  top: 173px;
  color: #ffffff;
`;
const Followers = styled.div`
  span:first-child {
    color: #ff4fd8;
    font-weight: bold;
  }
  span:last-child {
    color: #ffffff;
  }
`;
const Tags = styled.h2`
  color: #ffffff;
`;
const GenreContainer = styled.div`
  display: flex;
`;

const Genre = styled.div`
  color: #ffffff;
  background: rgba(75, 75, 75, 0.4);
  border-radius: 4px;
  margin: 16px;
  padding: 8px 20px;
`;

export default ArtistRoute;
