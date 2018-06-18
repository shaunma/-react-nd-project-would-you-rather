import {Redirect, Route} from "react-router-dom"
import React from 'react';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {from: props.location}
          }}
        />
      )
    }
  />
);
export default PrivateRoute
