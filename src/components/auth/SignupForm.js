import { Send } from "@mui/icons-material";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

export const SignupForm = () => {
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();

  // Schema
  const schema = yup.object().shape({
    name: yup.string().min(2).required(),
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password don't match!")
      .required(),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignup = async ({ name, email, password }) => {
    await signup({ name, email, password });
    navigate("/home");
  };

  return (
    <Container
      sx={{
        flexGrow: 1,
        m: 3,
      }}
    >
      <Typography variant="h4">Sign up</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSignup)}>
        <TextField
          margin="normal"
          label="Name"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          {...register("name")}
        />
        <TextField
          margin="normal"
          label="Email"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          margin="normal"
          label="New Password"
          variant="outlined"
          color="secondary"
          type="password"
          fullWidth
          required
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          {...register("password")}
        />

        <TextField
          margin="normal"
          label="Confirm Password"
          variant="outlined"
          color="secondary"
          type="password"
          fullWidth
          required
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<Send />}
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </form>
      {error && (
        <Typography mt={2} color="error">
          {error}
        </Typography>
      )}
    </Container>
  );
};
