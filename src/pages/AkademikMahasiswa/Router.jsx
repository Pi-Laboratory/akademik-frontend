import { useNav } from 'pages/Root/hoc'
import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
<<<<<<< HEAD
import DaftarMahasiswa from '../Akademik.DaftarMahasiswa';
import DetailMahasiswa from '../AkademikMahasiswa.Mahasiswa.Detail';
=======
import DaftarMahasiswa from './DaftarMahasiswa';
import DetailMahasiswa from './DaftarMahasiswa/Detail';
>>>>>>> 1a2f1a62ed0287d6acabbe721f3e0447b2b1eae9

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
