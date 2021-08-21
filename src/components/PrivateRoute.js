import { Spinner } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom"
import { useClient } from "./client"

export const PrivateRoute = ({ ...props }) => {
  const client = useClient();
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        await client.reAuthenticate();
        setIsAuth(true);
      } catch (err) {
        console.error(err.message);
        setIsAuth(false);
      }
    }
    fetch();
  }, [client, client.account]);

  if (isAuth === null) return (<Spinner />)
  // if (isAuth === false) return (<Redirect to="/login" />)
  return (<Route {...props} />)
}