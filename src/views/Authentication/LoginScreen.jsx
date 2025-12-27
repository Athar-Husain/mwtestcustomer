import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, Typography } from "@mui/material";
// import { uiSlice } from "./store/uiSlice"; // Uncomment when your slice is set up
// import { authSlice } from "./store/authSlice"; // Uncomment when your slice is set up

const LoginScreen = () => {
    const dispatch = useDispatch();
    // const mobileNumber = useSelector((state) => state.auth.mobileNumber); // Uncomment when your slice is set up
    // const countryCode = useSelector((state) => state.auth.countryCode); // Uncomment when your slice is set up

    // Dummy values for mobile number and country code
    const mobileNumber = "+1234567890"; // Dummy mobile number
    const countryCode = "+1"; // Dummy country code

    const [mobile, setMobile] = useState(mobileNumber);
    const [code, setCode] = useState(countryCode);
    const [error, setError] = useState("");

    const mobileInputRef = useRef(null);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

    // Dummy function to validate the mobile number
    const validateMobile = (m) => /^\d{10}$/.test(m);

    const onSubmit = (data) => {
        const { mobile, code } = data;

        setError("");
        if (!validateMobile(mobile.trim())) {
            setError("Please enter a valid 10-digit mobile number.");
            mobileInputRef.current?.focus();
            return;
        }

        // Dummy dispatch actions (replace with real dispatch once store is set up)
        console.log("Show loader...");
        setTimeout(() => {
            console.log("Hide loader...");
            console.log("Set mobile number:", mobile.trim());
            console.log("Set country code:", code);
            console.log("OTP sent to:", `${code} ${mobile.trim()}`);
            // Simulate screen change or navigation
            console.log("Navigating to OTP screen...");
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
            aria-label="Login Screen"
        >
            <Typography variant="h4" color="primary" mb={4}>
                Login to Your Account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }} noValidate>
                <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="country-code-label">Country Code</InputLabel>
                        <Select
                            labelId="country-code-label"
                            id="country-code"
                            value={code}
                            label="Country Code"
                            onChange={(e) => setCode(e.target.value)}
                            {...register("code")}
                        >
                            <MenuItem value="+91">+91</MenuItem>
                            <MenuItem value="+1">+1</MenuItem>
                            <MenuItem value="+44">+44</MenuItem>
                            <MenuItem value="+61">+61</MenuItem>
                            <MenuItem value="+81">+81</MenuItem>
                            <MenuItem value="+49">+49</MenuItem>
                            <MenuItem value="+33">+33</MenuItem>
                            <MenuItem value="+7">+7</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    placeholder="Enter mobile number"
                    maxLength="10"
                    required
                    error={!!errors.mobile || !!error}
                    helperText={errors.mobile ? "Please enter a valid 10-digit mobile number." : error}
                    {...register("mobile", {
                        required: "Mobile number is required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Mobile number must be 10 digits",
                        },
                    })}
                    sx={{ mb: 2 }}
                    inputRef={mobileInputRef}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%", py: 2 }}
                >
                    Send OTP
                </Button>
            </form>

            <footer style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#888" }}>
                Need help? Call{" "}
                <a href="tel:+18001234567" style={{ color: "#1976d2", textDecoration: "underline" }}>
                    Customer Support
                </a>
            </footer>
        </Box>
    );
};

export default LoginScreen;
