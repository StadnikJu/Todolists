import { useAppSelector } from "@/common/hooks/useAppSelector";
import { getTheme } from "@/common/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { selectThemeMode } from "@/app/app-slice";
import { ErrorSnackBar, Header, Routing } from "@/common/components";
import { useAppDispatch } from "@/common/hooks";
import { authmeTC } from "@/features/auth/model/slices/auth-slice";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "./App.module.css";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);
  const dispatch = useAppDispatch();

  const [init, setInit] = useState(false);

  useEffect(() => {
    dispatch(authmeTC())
      .unwrap()
      .finally(() => {
        setInit(true);
      });
  }, []);

  if (!init) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackBar />
      </div>
    </ThemeProvider>
  );
};
