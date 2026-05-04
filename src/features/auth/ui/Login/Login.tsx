import { selectThemeMode } from "@/app/app-slice";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { getTheme } from "@/common/theme";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../model/schemes";
import { LoginInputs } from "../../model/loginTypes";
import { loginTC } from "../../model/slices/auth-slice";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import styles from "./Login.module.css";

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
    formState: {},
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginInputs) => {
    dispatch(loginTC(data))
      .unwrap()
      .then(() => {
        reset();
      });
  };

  return (
    <Grid container justifyContent={"center"}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}

            <TextField
              type="password"
              label="Password"
              margin="normal"
              error={!!errors.password}
              {...register("password")}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
                  )}
                />
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  );
};
