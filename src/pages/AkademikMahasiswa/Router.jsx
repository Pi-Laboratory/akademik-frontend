import { useNav } from 'pages/Root/hoc'
import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import DaftarMahasiswa from './DaftarMahasiswa';
import DetailMahasiswa from './DaftarMahasiswa/Detail';

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
          path={item.path}
          component={item.component}
        />
      ))}
      <Route path={`${path}/angkatan/1`} exact component={DaftarMahasiswa} />
      <Route path={`${path}/angkatan/1/detail/1`} exact component={DetailMahasiswa} />
    </Switch>
  )
}

export default Router
