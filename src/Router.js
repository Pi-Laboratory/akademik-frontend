import Admin from "./pages/Admin";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Login from "pages/Login";
import FourOFour from "pages/404";
import Root from "pages/Root";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Root} />
        <Route path="/" component={FourOFour} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;