import FourOFour from "pages/404";
import { useNav } from "pages/Root/hoc"
import { Route, Switch, useRouteMatch } from "react-router-dom"

export const Router = () => {
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