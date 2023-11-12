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
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    newPassword: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Password don't match!")
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

  const handleSignup = async (data) => {
    const { email, newPassword: password } = data;
    signup(email, password)
      .then(() => navigate("/home"))
      .catch((e) => console.log(e));
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
          error={errors.newPassword ? true : false}
          helperText={errors.newPassword?.message}
          {...register("newPassword")}
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
