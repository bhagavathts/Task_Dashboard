import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { LogoutRounded } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #0f0f1e 25%, #1a1a2e 50%, #16213e 75%, #1a1a2e 100%)",
        backgroundSize: "200% 200%",
        animation: "navGradientFlow 15s ease infinite",
        px: { xs: 2, sm: 4 },
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.1)",
        backdropFilter: "blur(20px)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1), transparent)",
          animation: "navShimmer 5s infinite",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.5) 25%, rgba(236, 72, 153, 0.5) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "navSlideGradient 4s linear infinite",
          boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
        },
        "@keyframes navGradientFlow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "@keyframes navShimmer": {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        "@keyframes navSlideGradient": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
      }}
      elevation={0}
    >
      <Toolbar 
        sx={{ 
          py: 1.5, 
          minHeight: { xs: 64, sm: 70 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left: Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)',
              animation: 'pulse 2s ease-in-out infinite',
              "@keyframes pulse": {
                "0%, 100%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
                "50%": {
                  transform: "scale(1.3)",
                  opacity: 0.7,
                },
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 1.5,
              background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: "relative",
              display: "inline-block",
              textShadow: "0 0 30px rgba(255,255,255,0.2)",
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -4,
                left: 0,
                width: "0%",
                height: "2px",
                background: "linear-gradient(90deg, #6366f1, #a78bfa, #ec4899)",
                transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
              },
              "&:hover::after": {
                width: "100%",
              },
              animation: "fadeInDown 0.8s ease",
              "@keyframes fadeInDown": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(-20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            Task Dashboard
          </Typography>
        </Box>

        {/* Right: Logout Button */}
        <Button
          onClick={logout}
          startIcon={<LogoutRounded />}
          sx={{
            color: "#fff",
            border: "1.5px solid rgba(99, 102, 241, 0.3)",
            borderRadius: "10px",
            px: { xs: 2, sm: 3.5 },
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            letterSpacing: 0.8,
            fontSize: { xs: '0.85rem', sm: '0.95rem' },
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.1))",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            animation: "fadeInUp 0.8s ease 0.2s backwards",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3), transparent)",
              transition: "left 0.6s",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "10px",
              padding: "1.5px",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(236, 72, 153, 0.4))",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              opacity: 0,
              transition: "opacity 0.4s",
            },
            "&:hover": {
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(236, 72, 153, 0.2))",
              borderColor: "rgba(99, 102, 241, 0.6)",
              transform: "translateY(-3px) scale(1.03)",
              boxShadow: "0 12px 40px rgba(99, 102, 241, 0.3), 0 0 40px rgba(236, 72, 153, 0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
              "&::before": {
                left: "100%",
              },
              "&::after": {
                opacity: 1,
              },
            },
            "&:active": {
              transform: "translateY(-1px) scale(1)",
            },
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}