import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Form, Field } from 'formik';
import { validationSchema } from '../../utils/validation';
import { loginAction } from '../../app/auth/authSlice';
import Toaster from '../../containers/Toaster';
import { useDispatch } from 'react-redux';
import { handleForgot } from '../../app/users/userSlice';
import Logo from '../../assets/logo.webp';

const LoginPage = () => {
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values, { setSubmitting }) => {
    // Guard against multiple clicks if already loading
    if (loading) return;

    const { userName, password } = values;
    if (userName && password) {
      setLoading(true);
      try {
        const payload = {
          email: userName.trim(),
          password: password
        };
        await dispatch(loginAction(payload)).unwrap();
        setToast({ open: true, message: "Login successfully", severity: "success" });
        navigate('/dashboard');
      } catch (err) {
        const errorMessage =
          typeof err === 'string'
            ? err
            : err?.message || err?.error || "Invalid username or password";
        setToast({ open: true, message: errorMessage, severity: 'error' });
      } finally {
        setLoading(false);
        if (setSubmitting) setSubmitting(false);
      }
    } else {
      setToast({ open: true, message: "Please fill in all required fields", severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: { xs: '16px', sm: '24px' } }}>
      <Box paddingBottom={5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <img src={Logo} alt='logo_image' width={'130px'} height={'130px'} />
      </Box> 
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Welcome Back
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please sign in to continue to your dashboard.
      </Typography>
      <Formik
        initialValues={{ userName: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, isSubmitting }) => {
          const isButtonDisabled = loading || isSubmitting;
          return (
            <Form noValidate autoComplete="off">
              <Field
                as={TextField}
                name="userName"
                label="Username / Email"
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={isButtonDisabled}
                error={touched.userName && Boolean(errors.userName)}
                helperText={touched.userName && errors.userName}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={isButtonDisabled}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                        disabled={isButtonDisabled}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                disabled={isButtonDisabled}
                sx={{
                  marginTop: '24px',
                  backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
                  fontSize: { xs: '14px', sm: '16px' },
                  fontWeight: 600,
                  textTransform: 'none',
                  height: 48,
                  borderRadius: '8px',
                  boxShadow: '0 4px 14px 0 rgba(22, 160, 133, 0.35)',
                  transition: 'all 0.3s ease',
                  pointerEvents: isButtonDisabled ? 'none' : 'auto',
                  '&:hover': {
                    opacity: 0.95,
                    boxShadow: '0 6px 20px rgba(22, 160, 133, 0.45)',
                  },
                  '&.Mui-disabled': {
                    color: '#ffffff',
                    backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
                    opacity: 0.7,
                    cursor: 'not-allowed',
                  },
                }}
              >
                {isButtonDisabled ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                    <CircularProgress size={22} sx={{ color: '#ffffff' }} thickness={4} />
                    <span>Logging in...</span>
                  </Box>
                ) : (
                  'Login'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
      <Box paddingTop={3}>
        <Link 
          onClick={() => !loading && dispatch(handleForgot(true))}
          style={{ cursor: loading ? 'not-allowed' : 'pointer', color: '#16a085', fontWeight: 500, textDecoration: 'none' }}
        >
          Forgot password?
        </Link>
      </Box>

      <Toaster
        message={toast.message}
        open={toast.open}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Container>
  );
};

export default LoginPage;