import FourOFour from "pages/404";
import {
  Switch,
  Route
} from "react-router-dom";
import { useNav } from "./hoc";

const Router = () => {
  const navigation = useNav();
  return (
    <Switch>
      {
        navigation.items.map((item) => (
          <Route
            exact={item.exact}
            key={item.path}
            path={`${item.path}`}
            component={item.component}
          />
        ))
      }
      <Route path="/" component={FourOFour} />
    </Switch>
  )
}

export default Router;