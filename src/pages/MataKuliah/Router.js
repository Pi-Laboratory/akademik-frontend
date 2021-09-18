import FourOFour from 'pages/404';
import { useNav } from 'pages/Root/hoc'
import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'

const Router = () => {
  const { path } = useRouteMatch();
  const navigation = useNav(path);
  return (
    <Switch>
      {navigation.items.map((item) => (
        <Route
          exact={item.exact}
          key={item.path}
          path={`${item.path}`}
          component={item.component}
        />
      ))}
      <Route component={FourOFour} />
    </Switch>
  )
}

export default Router
