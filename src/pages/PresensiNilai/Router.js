import FourOFour from "pages/404";
import { useNav } from "pages/Root/hoc"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"

export const Router = () => {
  const { path } = useRouteMatch();
  const navigation = useNav(path);
  console.log(navigation.items);
  return (
    <Switch>
      {
        navigation.items &&
        navigation.items.map((item) => (
          <Route
            exact={item.exact}
            key={item.path}
            path={item.path}
            component={item.component}
          />
        ))
      }
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