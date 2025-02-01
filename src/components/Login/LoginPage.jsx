import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { validationSchema } from '../../utils/validation';
import Toaster from '../../containers/Toaster';

const LoginPage = () => {
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();


  const handleLogin = (values) => {
    const { userName, password } = values;
    if (userName === 'admin' && password === 'password') {
      setToast({open:true, message:"Login successfully"})
      navigate('/dashboard');
    } else {
      setToast({open:true, message:"Something went wrong",severity:'error'})
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Welcome Back
      </Typography>
      <Formik
        initialValues={{ userName: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form noValidate autoComplete="off">
            <Field
              as={TextField}
              name="userName"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.userName && Boolean(errors.userName)}
              helperText={touched.userName && errors.userName}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              style={{
                marginTop: '20px',
                backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
              }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
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
