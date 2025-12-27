import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, TextField, CircularProgress, Typography, Box } from "@mui/material";
import { Refresh } from "@mui/icons-material";
// import { uiSlice } from "./store/uiSlice"; // Adjust the import based on your structure
// import { authSlice } from "./store/authSlice"; // Adjust the import based on your structure

const OTPScreen = () => {
  const dispatch = useDispatch();
  // const mobileNumber = useSelector((state) => state.auth.mobileNumber); // Uncomment when your slice is set up
  // const countryCode = useSelector((state) => state.auth.countryCode); // Uncomment when your slice is set up
  const [countdown, setCountdown] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const timerRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const otp = watch("otp");

  // Dummy data for mobile number and country code
  const mobileNumber = "+1234567890"; // Dummy mobile number
  const countryCode = "+1"; // Dummy country code

  useEffect(() => {
    startCountdown();
    return () => clearInterval(timerRef.current);
  }, []);

  const startCountdown = () => {
    setResendDisabled(true);
    setCountdown(30);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onResend = () => {
    if (resendDisabled) return;
    // Dummy dispatch actions (replace with real dispatch once store is set up)
    console.log("Show loader...");
    setTimeout(() => {
      console.log("Hide loader...");
      console.log("OTP resent");
      startCountdown();
    }, 1000);
  };

  const onSubmit = (data) => {
    const { otp } = data;
    if (!/^\d{4,6}$/.test(otp.trim())) {
      return;
    }
    // Dummy dispatch actions (replace with real dispatch once store is set up)
    console.log("Show loader...");
    setTimeout(() => {
      console.log("Hide loader...");
      if (otp === "1234" || otp === "123456") {
        console.log("OTP verified successfully");
        // Simulate navigation or state changes here
        console.log("Navigating to setup screen...");
      } else {
        console.log("Verification Failed. Incorrect OTP");
        // Simulate showing a modal
        console.log("Showing modal: Verification Failed");
      }
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 4,
        maxWidth: "md",
        mx: "auto",
      }}
      aria-label="OTP Verification Screen"
    >
      <Typography variant="h4" color="primary" mb={4}>
        Verify OTP
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }} noValidate>
        <TextField
          label="Enter OTP"
          variant="outlined"
          fullWidth
          inputProps={{
            maxLength: 6,
            inputMode: "numeric",
          }}
          error={!!errors.otp}
          helperText={errors.otp ? "Please enter a valid 4 or 6 digit OTP." : ""}
          {...register("otp", {
            required: "OTP is required",
            pattern: {
              value: /^[0-9]{4,6}$/,
              message: "OTP should be between 4 to 6 digits",
            },
          })}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              fontSize: "1.25rem",
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: "0.1em",
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            variant="text"
            color="primary"
            onClick={onResend}
            disabled={resendDisabled}
            startIcon={resendDisabled ? <CircularProgress size={20} color="inherit" /> : <Refresh />}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {resendDisabled ? `Resend OTP (${countdown}s)` : "Resend OTP"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ px: 4, py: 2 }}
            disabled={resendDisabled}
          >
            Verify OTP
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OTPScreen;
