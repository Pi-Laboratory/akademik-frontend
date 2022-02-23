import { Classes } from "@blueprintjs/core";
import { Box, Divider } from "components";
import { useNav } from "pages/Root/hoc";
import { forwardRef } from "react";
import { NavLink, useLocation, useRouteMatch } from "react-router-dom";
import { Profile } from "./Profile";
import { Header } from "./Header";

const Layout = () => {
  const { path } = useRouteMatch();
  const navigation = useNav(path);
  const { pathname } = useLocation();
  return (
    <Box>
      <Box sx={{ px: 3, mb: 3 }}>
        <Header />
        <Box className={Classes.TABS}>
          <Box as="div" className={Classes.TAB_LIST} role="tablist">
            {navigation.items.map((item) => (
              <NavLink
                as="a"
                to={item.rendered}
                key={item.path}
                className={Classes.TAB}
                component={forwardRef(({ navigation, ...props }, ref) => (
                  <Box
                    ref={ref}
                    {...props}
                    aria-selected={pathname === item.rendered}
                  >
                    {item.title}
                  </Box>
                ))}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Divider sx={{ m: 0 }} />
      <Profile />
    </Box>
  )
}

export default Layout;