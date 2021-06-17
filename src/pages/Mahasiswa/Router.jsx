import { useNav } from 'pages/Root/hoc'
import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import { Detail } from './Detail';
import List from './List';

const Router = () => {
  const { path } = useRouteMatch();
  const navigation = useNav(path);
  return (
    <Switch>
      <Route path={`${path}/:nim`} exact component={Detail} />
      <Route path={`${path}/`} exact component={List} />
    </Switch>
  )
}

export default Router
