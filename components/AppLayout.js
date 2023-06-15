import { useState, useEffect, useContext, createContext } from "react";
import AppBarMenu from "./AppBarMenu";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Link from "next/link";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LayoutSearchField from "./search/LayoutSearchField";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    //marginLeft: `-${drawerWidth}px`,
    marginLeft: `10px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 250,
    }),
  })
);

const MUIAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),

  opacity: 1.0,
  zIndex: 999,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const publicNavigation = [
  { name: "Home", href: "/", icon: <HomeIcon />, current: true },
  {
    name: "My Settings",
    href: "/settings",
    icon: <SettingsSuggestIcon />,
    current: false,
  },
];

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppLayout(props) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();

  // const [open, setOpen] = useState(isMdUp ? true : false);
  const [open, setOpen] = useState(false);
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    // setOpen(isMdUp ? true : false);
    setOpen(false);
  }, [isMdUp]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MUIAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />

          <LayoutSearchField />
          
          <Box sx={{ flexGrow: 1 }} />            
            {/* <Button
              variant="outlined"
              color="inherit"
              startIcon={<AccountCircleIcon />}
              // component={Link}              
              // href={"/login"}
              sx={{ ml: 2,  sm: 'none',  lg: 'block', xl: 'block' }}
              
            >
              Sign In
            </Button>
            
          <>
            <AppBarMenu handleDrawerOpen={handleDrawerOpen} session={""} />
          </> */}
        </Toolbar>
      </MUIAppBar>

      <Main open={open}>
        <DrawerHeader />

        <Container maxWidth="false" sx={{ marginTop: "10px" }}>
          {props.mainPage}
        </Container>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {publicNavigation.map((item, index) => (
            <>
              <ListItem
                key={index}
                component={Link}
                href={item.href}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon
                    style={{
                      color: router.asPath === item.href ? "blue" : "black",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.name}
                    style={{
                      color: router.asPath === item.href ? "blue" : "black",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </Drawer>
    </>
  );
}
