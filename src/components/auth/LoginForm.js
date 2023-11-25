import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Send } from "@mui/icons-material";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";

export const LoginForm = () => {
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  // Schema
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    password: yup.string().min(4).max(20).required("Password is required!"),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    const { email, password } = data;
    await login(email, password);
    navigate("/home");
  };

  return (
    <Container sx={{ m: 3, flexGrow: 1 }}>
      <Typography variant="h4">Log in</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
        <TextField
          margin="normal"
          label="Email"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          margin="normal"
          label="Password"
          variant="outlined"
          color="secondary"
          type="password"
          required
          fullWidth
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<Send />}
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Container>
  );
};
