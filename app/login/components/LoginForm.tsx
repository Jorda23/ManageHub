"use client";

import { useState, type FormEvent } from "react";

import { useRouter } from "next/navigation";

import { Box, Button, Checkbox, FormControlLabel, IconButton, Typography } from "@mui/material";

import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from "react-icons/fa";

import { FaArrowRightToBracket } from "react-icons/fa6";

import { LoginField } from "./LoginField";
import { useLogin } from "@/hook/useLogin";

const colors = {
  green: "#164c38",
  greenDark: "#073b2d",
  white: "#ffffff",
  text: "#101828",
  muted: "#667085",
};

export function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberSession, setRememberSession] = useState(false);

  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(
      {
        username,
        password,
      },
      {
        onSuccess: (response) => {
          const storage = rememberSession ? localStorage : sessionStorage;

          storage.setItem("access_token", response.token);

          storage.setItem("user_id", response.userId);

          storage.setItem("username", response.username);

          router.replace("/dashboard");
        },
      },
    );
  };

  const isFormInvalid = !username.trim() || !password.trim() || isPending;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <LoginField
        label="Usuario"
        placeholder="Ingresa tu usuario"
        icon={<FaUserAlt size={13} />}
        autoComplete="username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />

      <LoginField
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        icon={<FaLock size={13} />}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        endAdornment={
          <IconButton
            type="button"
            size="small"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={() => {
              setShowPassword((current) => !current);
            }}
            sx={{
              width: 30,
              height: 30,
              color: "#7a8883",
            }}
          >
            {showPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
          </IconButton>
        }
      />

      {isError && (
        <Typography
          role="alert"
          sx={{
            color: "error.main",
            fontSize: 12,
            fontWeight: 650,
          }}
        >
          {error?.message || "Usuario o contraseña incorrectos."}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isFormInvalid}
        endIcon={!isPending ? <FaArrowRightToBracket size={13} /> : undefined}
        sx={{
          mt: 0.7,
          minHeight: 48,
          borderRadius: "6px",
          bgcolor: colors.green,
          color: colors.white,
          fontSize: 12.5,
          fontWeight: 900,
          textTransform: "none",
          boxShadow: "0 10px 20px rgba(22,76,56,0.25)",

          "&:hover": {
            bgcolor: colors.greenDark,
            boxShadow: "0 13px 26px rgba(22,76,56,0.32)",
          },

          "&.Mui-disabled": {
            bgcolor: "#b6c5bf",
            color: colors.white,
          },
        }}
      >
        {isPending ? "Ingresando..." : "Ingresar al panel"}
      </Button>
    </Box>
  );
}
