import { useNav } from 'pages/Root/hoc'
import FourOFour from "pages/404";
import React from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router'

const Router = () => {
  const { path } = useRouteMatch();
  const navigation = useNav(path);
  return (
    <Switch>
      {/* <Route exact path={'/akademik-mahasiswa'}>
        <Redirect to={'/akademik-mahasiswa/mahasiswa'} />
      </Route> */}
      {navigation.items.map((item) => (
        <Route
          exact={item.exact}
          key={item.path}
          path={`${item.path}`}
          component={item.component}
        />
      ))}
      {navigation.items.length > 0 &&
        <Route
          exact={true}
          path={path}
          render={() => <Redirect to={navigation.items[0].path} />}
        />}
      <Route component={FourOFour} />
    </Switch>
  )
}

export default Router
