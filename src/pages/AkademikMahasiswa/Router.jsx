import { useNav } from 'pages/Root/hoc'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

const Router = () => {
  const navigation = useNav();

  return (
    <Switch>
      <Route exact path={'/akademik-mahasiswa'}>
        <Redirect to={'/akademik-mahasiswa/mahasiswa'} />
      </Route>
      {navigation.items.map((item) => (
        <Route
          exact={item.exact}
          key={item.path}
          path={`${item.path}`}
          component={item.component}
        />
      ))}
    </Switch>
  )
}

export default Router
