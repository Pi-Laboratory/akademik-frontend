import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";
import Login from "pages/Login";
import FourOFour from "pages/404";
import Root from "pages/Root";
import Registrasi from "pages/Registrasi";
import { PrivateRoute } from "components/PrivateRoute";
import Form from "pages/Form";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registrasi" exact component={Registrasi} />
        <Route path="/form" exact component={Form} />
        <PrivateRoute path="/" component={Root} />
        <Route path="/" component={FourOFour} />
      </Switch>
    </HashRouter>
  )
}

export default Router;