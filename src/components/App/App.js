import React from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import GlobalStyles from "../GlobalStyles";
import ArtistRoute from "../ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

const App = () => {
  const dispatch = useDispatch();
  const DEFAULT_ARTIST_ID = "0du5cEVh5yTK9QJze8zA0C";

  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((response) => response.json())
      .then((data) => {
        dispatch(receiveAccessToken(data.access_token));
      })
      .catch((err) => {
        dispatch(receiveAccessTokenError());
        console.error(err);
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={`/artist/${DEFAULT_ARTIST_ID}`} />
          </Route>
          <Route path="/artist/:id" component={ArtistRoute} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
