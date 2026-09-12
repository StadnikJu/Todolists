import { selectThemeMode, setIsLoggedInAC } from "@/app/app-slice";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { getTheme } from "@/common/theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../model/schemes";
import { LoginInputs } from "../../model/loginTypes";
import { useLazySecurityQuery, useLoginMutation } from "../../api/authApi";
import { ResultCode } from "@/common/enum/enums";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import styles from "./Login.module.css";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [getCaptcha, { data }] = useLazySecurityQuery();
  const [showPassword, setShowPassword] = useState(false);

  const captchaUrl = data?.url;

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
    formState: {},
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data: LoginInputs) => {
     console.log(data);
     console.log("SUBMIT");
    login(data)
      .unwrap()
      .then((response) => {
        if (response.resultCode === ResultCode.Success) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          dispatch(setIsLoggedInAC({ isLoggedIn: true }));
          reset();
        } else if(response.resultCode === ResultCode.CaptchaError) {
          getCaptcha();
        } 
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
              type={showPassword ? "text" : "password"}
              label="Password"
              margin="normal"
              error={!!errors.password}
              {...register("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" >
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            {captchaUrl && (
              <>
                <img src={captchaUrl} alt="Captcha" style={{ marginTop: "10px" }}/>
                <TextField label="Введите код" margin="normal" {...register("captcha")} />
              </>
            )}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  );
};


