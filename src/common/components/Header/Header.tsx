import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { containerSx } from "@/common/styles/container.styles";
import { getTheme } from "@/common/theme/theme";
import { NavButton } from "@/common/components/NavButton/NavButton";
import { LinearProgress } from "@mui/material";
import { logoutTC, selectIsLoggedIn, selectUserEmail } from "@/features/auth/model/slices/auth-slice";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const email = useAppSelector(selectUserEmail);
  const status = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {isLoggedIn && email}
            {isLoggedIn && <NavButton onClick={logoutHandler}>Logout</NavButton>}
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};
