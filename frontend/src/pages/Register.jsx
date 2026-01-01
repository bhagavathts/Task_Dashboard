import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Link,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fade,
  Zoom,
  InputAdornment,
  IconButton,
  alpha,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const elegantTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { 
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#7c3aed",
    },
    secondary: { 
      main: "#6366f1",
    },
    background: {
      default: "#0a0a0f",
      paper: "#141419",
    },
    text: {
      primary: "#f8f9fa",
      secondary: "#9ca3af",
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", "Helvetica Neue", sans-serif',
    h4: { 
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.3px',
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    await axios.post("https://task-dashboard-wi7s.onrender.com/api/auth/register", form);
    alert("Registered successfully");
    window.location.href = "/login";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  return (
    <ThemeProvider theme={elegantTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0a0f 0%, #141419 50%, #1a1a24 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "10%",
            right: "15%",
            width: "500px",
            height: "500px",
            background: `radial-gradient(circle, ${alpha("#8b5cf6", 0.08)} 0%, transparent 70%)`,
            filter: "blur(80px)",
            animation: "float 20s ease-in-out infinite",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "10%",
            left: "15%",
            width: "400px",
            height: "400px",
            background: `radial-gradient(circle, ${alpha("#6366f1", 0.08)} 0%, transparent 70%)`,
            filter: "blur(80px)",
            animation: "float 25s ease-in-out infinite reverse",
          },
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(50px, -50px)" },
          },
        }}
      >
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Zoom in timeout={600}>
            <Card
              sx={{
                p: { xs: 3, sm: 5 },
                background: alpha("#141419", 0.7),
                backdropFilter: "blur(40px)",
                border: "1px solid",
                borderColor: alpha("#8b5cf6", 0.15),
                borderRadius: 4,
                boxShadow: `
                  0 20px 60px ${alpha("#000000", 0.5)},
                  0 0 100px ${alpha("#8b5cf6", 0.05)}
                `,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${alpha("#8b5cf6", 0.5)}, transparent)`,
                },
              }}
            >
              <CardContent>
                <Fade in timeout={800}>
                  <Box textAlign="center" mb={5}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${alpha("#8b5cf6", 0.15)}, ${alpha("#6366f1", 0.15)})`,
                          border: `1px solid ${alpha("#8b5cf6", 0.3)}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: -8,
                            borderRadius: "50%",
                            border: `1px solid ${alpha("#8b5cf6", 0.1)}`,
                            animation: "pulse 3s ease-in-out infinite",
                          },
                          "@keyframes pulse": {
                            "0%, 100%": { 
                              transform: "scale(1)",
                              opacity: 1,
                            },
                            "50%": { 
                              transform: "scale(1.1)",
                              opacity: 0.5,
                            },
                          },
                        }}
                      >
                        <StarIcon
                          sx={{
                            fontSize: 28,
                            color: "#8b5cf6",
                          }}
                        />
                      </Box>
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        color: "#f8f9fa",
                        mb: 1,
                        fontWeight: 700,
                      }}
                    >
                      Create Account
                    </Typography>

                    <Typography 
                      variant="body1" 
                      sx={{
                        color: alpha("#f8f9fa", 0.5),
                        fontSize: "0.95rem",
                      }}
                    >
                      Join us to start managing your tasks
                    </Typography>
                  </Box>
                </Fade>

                <Fade in timeout={1000}>
                  <Box>
                    <TextField
                      fullWidth
                      label="Full Name"
                      margin="normal"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      onKeyPress={handleKeyPress}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: alpha("#8b5cf6", 0.6), fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: alpha("#8b5cf6", 0.03),
                          borderRadius: 2,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "& fieldset": {
                            borderColor: alpha("#8b5cf6", 0.15),
                            borderWidth: 1,
                          },
                          "&:hover": {
                            background: alpha("#8b5cf6", 0.05),
                            transform: "translateY(-2px)",
                            "& fieldset": {
                              borderColor: alpha("#8b5cf6", 0.3),
                            },
                          },
                          "&.Mui-focused": {
                            background: alpha("#8b5cf6", 0.05),
                            "& fieldset": {
                              borderColor: "#8b5cf6",
                              borderWidth: 2,
                            },
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: alpha("#f8f9fa", 0.5),
                          fontSize: "0.95rem",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      margin="normal"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      onKeyPress={handleKeyPress}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: alpha("#6366f1", 0.6), fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: alpha("#6366f1", 0.03),
                          borderRadius: 2,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "& fieldset": {
                            borderColor: alpha("#6366f1", 0.15),
                            borderWidth: 1,
                          },
                          "&:hover": {
                            background: alpha("#6366f1", 0.05),
                            transform: "translateY(-2px)",
                            "& fieldset": {
                              borderColor: alpha("#6366f1", 0.3),
                            },
                          },
                          "&.Mui-focused": {
                            background: alpha("#6366f1", 0.05),
                            "& fieldset": {
                              borderColor: "#6366f1",
                              borderWidth: 2,
                            },
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: alpha("#f8f9fa", 0.5),
                          fontSize: "0.95rem",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      margin="normal"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      onKeyPress={handleKeyPress}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: alpha("#8b5cf6", 0.6), fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                              sx={{
                                color: alpha("#f8f9fa", 0.4),
                                "&:hover": {
                                  color: alpha("#f8f9fa", 0.8),
                                },
                              }}
                            >
                              {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: alpha("#8b5cf6", 0.03),
                          borderRadius: 2,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "& fieldset": {
                            borderColor: alpha("#8b5cf6", 0.15),
                            borderWidth: 1,
                          },
                          "&:hover": {
                            background: alpha("#8b5cf6", 0.05),
                            transform: "translateY(-2px)",
                            "& fieldset": {
                              borderColor: alpha("#8b5cf6", 0.3),
                            },
                          },
                          "&.Mui-focused": {
                            background: alpha("#8b5cf6", 0.05),
                            "& fieldset": {
                              borderColor: "#8b5cf6",
                              borderWidth: 2,
                            },
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: alpha("#f8f9fa", 0.5),
                          fontSize: "0.95rem",
                        },
                      }}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      onClick={submit}
                      sx={{
                        mt: 4,
                        py: 1.5,
                        background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                        borderRadius: 2,
                        boxShadow: `0 8px 24px ${alpha("#8b5cf6", 0.3)}`,
                        fontWeight: 600,
                        fontSize: "1rem",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                          transition: "left 0.5s",
                        },
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: `0 12px 32px ${alpha("#8b5cf6", 0.4)}`,
                          "&::before": {
                            left: "100%",
                          },
                        },
                        "&:active": {
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      Create Account
                    </Button>

                    <Box textAlign="center" mt={4}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha("#f8f9fa", 0.5),
                          fontSize: "0.9rem",
                        }}
                      >
                        Already have an account?{" "}
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => navigate("/login")}
                          sx={{
                            color: "#8b5cf6",
                            fontWeight: 600,
                            textDecoration: "none",
                            position: "relative",
                            transition: "all 0.3s ease",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: -2,
                              left: 0,
                              width: "0%",
                              height: "2px",
                              background: "linear-gradient(90deg, #8b5cf6, #6366f1)",
                              transition: "width 0.3s ease",
                            },
                            "&:hover": {
                              color: "#a78bfa",
                              "&::after": {
                                width: "100%",
                              },
                            },
                          }}
                        >
                          Sign in
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              </CardContent>
            </Card>
          </Zoom>
        </Container>
      </Box>
    </ThemeProvider>
  );
}