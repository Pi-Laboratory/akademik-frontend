import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Login from "pages/Login";
import FourOFour from "pages/404";
import Root from "pages/Root";
import Registrasi from "pages/Registrasi";
import { PrivateRoute } from "components/PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registrasi" exact component={Registrasi} />
        <PrivateRoute path="/" component={Root} />
        <Route path="/" component={FourOFour} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;