import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import List from 'pages/Mahasiswa.List';
import Detail from 'pages/Mahasiswa.Details';

const Router = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:nim`} exact component={Detail} />
      <Route path={`${path}/`} exact component={List} />
    </Switch>
  )
}

export default Router
