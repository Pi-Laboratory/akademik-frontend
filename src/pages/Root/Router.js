import {
  Switch,
  Route
} from "react-router-dom";
import Dashboard from "pages/Dashboard";

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  )
}

export default Router;