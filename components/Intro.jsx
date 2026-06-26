import { Box, Button, Typography, Container, Grid, Card, CardContent, Avatar, Switch, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import SpeedIcon from "@mui/icons-material/Speed";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const Intro = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: (t) =>
          mode === "dark"
            ? "radial-gradient(circle at 10% 20%, rgba(37, 50, 60, 0.9) 0%, rgba(18, 25, 32, 1) 90.1%)"
            : "radial-gradient(circle at 10% 20%, rgba(240, 244, 248, 1) 0%, rgba(220, 230, 242, 1) 90%)",
        paddingY: { xs: 4, md: 8 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Theme Switch */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            {mode === "dark" ? <Brightness4Icon color="primary" /> : <Brightness7Icon color="primary" />}
            <Typography variant="body2" color="text.secondary">Theme</Typography>
            <Switch checked={mode === "dark"} onChange={toggleTheme} color="primary" />
          </Stack>
        </Box>

        <Grid container spacing={6} alignItems="center">
          {/* Left Column: Hero Text */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  lineHeight: 1.2,
                  background: "linear-gradient(45deg, #FF8A65 30%, #FFB74D 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: 2,
                }}
              >
                Connect. Chat. Collaborate.
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  fontWeight: 400,
                  lineHeight: 1.6,
                  marginBottom: 4,
                  maxWidth: "500px",
                  marginX: { xs: "auto", md: 0 },
                }}
              >
                A fast, secure, and modern chat application built for real-time messaging. Share thoughts, create group channels, and stay connected with friends instantly.
              </Typography>
              <Button
                variant={mode === "dark" ? "outlined" : "contained"}
                size="large"
                onClick={() => router.push("/auth")}
                sx={{
                  paddingX: 5,
                  paddingY: 1.5,
                  borderRadius: "2rem",
                  fontSize: "1.1rem",
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: mode === "dark" ? "none" : 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: (t) =>
                      mode === "dark"
                        ? "0 0 15px rgba(255, 138, 101, 0.4)"
                        : "0 5px 15px rgba(25, 118, 210, 0.4)",
                  },
                }}
              >
                Get Started Now
              </Button>
            </Box>
          </Grid>

          {/* Right Column: Premium Mock Chat UI */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                perspective: "1000px",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "1.5rem",
                  boxShadow: (t) =>
                    mode === "dark"
                      ? "0 10px 30px rgba(0,0,0,0.5)"
                      : "0 10px 30px rgba(25, 118, 210, 0.1)",
                  border: (t) =>
                    mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid rgba(0, 0, 0, 0.05)",
                  background: (t) =>
                    mode === "dark" ? "rgba(33, 43, 54, 0.9)" : "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  transform: "rotateY(-5deg) rotateX(5deg)",
                  transition: "all 0.5s ease",
                  "&:hover": {
                    transform: "none",
                  },
                }}
              >
                {/* Mock Chat Header */}
                <Box
                  sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    borderBottom: (t) =>
                      mode === "dark"
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <Avatar sx={{ bgcolor: "primary.main", marginRight: 1.5 }}>A</Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Aditya Raul
                    </Typography>
                    <Typography variant="caption" color="success.main" sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: 6, height: 6, bgcolor: "success.main", borderRadius: "50%", marginRight: 0.5 }} />
                      Online
                    </Typography>
                  </Box>
                </Box>

                {/* Mock Messages */}
                <CardContent sx={{ height: "250px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 1.5 }}>
                  {/* Left message */}
                  <Box sx={{ display: "flex", gap: 1, maxWidth: "80%" }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: "0.75rem" }}>A</Avatar>
                    <Box sx={{ bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "#F0F2F5", padding: 1.5, borderRadius: "0 12px 12px 12px" }}>
                      <Typography variant="body2">Hey! Did you check out the new chat features yet? 🚀</Typography>
                    </Box>
                  </Box>

                  {/* Right message */}
                  <Box sx={{ display: "flex", gap: 1, maxWidth: "80%", alignSelf: "flex-end" }}>
                    <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", padding: 1.5, borderRadius: "12px 0px 12px 12px" }}>
                      <Typography variant="body2">Yes, they are awesome! Ticks and typing indicators feel so snappy. 🔥</Typography>
                    </Box>
                  </Box>
                  
                  {/* Status Indicator */}
                  <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "flex-end", fontSize: "0.7rem", marginTop: -1 }}>
                    Read 09:40 AM
                  </Typography>
                </CardContent>

                {/* Mock Input Bar */}
                <Box sx={{ padding: 2, display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "#F0F2F5",
                      borderRadius: "1.5rem",
                      padding: "8px 16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">Type a message...</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                    <ChatIcon sx={{ fontSize: "1.2rem", color: "primary.contrastText" }} />
                  </Avatar>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {/* Feature Highlights Grid */}
        <Grid container spacing={4} sx={{ marginTop: { xs: 6, md: 10 } }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "100%", borderRadius: "1rem", border: "1px solid rgba(255, 255, 255, 0.05)", background: "transparent", boxShadow: "none" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, textAlign: { xs: "center", md: "left" } }}>
                <Avatar sx={{ bgcolor: "rgba(25, 118, 210, 0.1)", color: "primary.main", marginBottom: 2 }}>
                  <SpeedIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>Real-time Delivery</Typography>
                <Typography variant="body2" color="text.secondary">Immediate message updates and delivery checkmarks using Socket.IO engine.</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "100%", borderRadius: "1rem", border: "1px solid rgba(255, 255, 255, 0.05)", background: "transparent", boxShadow: "none" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, textAlign: { xs: "center", md: "left" } }}>
                <Avatar sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", color: "success.main", marginBottom: 2 }}>
                  <GroupsIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>Group Collaborations</Typography>
                <Typography variant="body2" color="text.secondary">Create groups easily, manage participants, and collaborate with your teammates effortlessly.</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "100%", borderRadius: "1rem", border: "1px solid rgba(255, 255, 255, 0.05)", background: "transparent", boxShadow: "none" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" }, textAlign: { xs: "center", md: "left" } }}>
                <Avatar sx={{ bgcolor: "rgba(244, 67, 54, 0.1)", color: "error.main", marginBottom: 2 }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>Secure Connections</Typography>
                <Typography variant="body2" color="text.secondary">Strict cookie authentication, password hashing, and secure token verification protocols.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
