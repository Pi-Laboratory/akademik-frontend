import { Classes, H2 } from "@blueprintjs/core"
import { Box } from "components"
import { useNav } from "pages/Root/hoc"
import { useLocation, useRouteMatch } from "react-router"

export const Header = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const navigation = useNav(path);
  return (
    <Box sx={{ mx: 3 }}>
      <Box as={H2} sx={{ flexDirection: "column", height: "100%", mb: 4 }}>Staff Dan Pengajar</Box>
      <div className={Classes.TABS}>
        <div className={Classes.TAB_LIST} role="tablist" onChange={tab => navigation.go(tab)}>
          {
            navigation.items.map((item, i) => {
              return (
                <div
                  key={i}
                  aria-selected={pathname.indexOf(item.path) === 0 ? "true" : "false"}
                  className={Classes.TAB}
                  role="tab"
                  onClick={() => navigation.go(item.path)}
                >
                  {item.text}
                </div>
              )
            })
          }
        </div>
      </div>
    </Box>
  )
}