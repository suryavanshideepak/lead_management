import { Box, Button, Container, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { checkPasswordValidation } from '../../utils/validation';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword, handleForgot } from '../../app/users/userSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Toaster from '../../containers/Toaster';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [isEmail, setIsEmail]= useState('')
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
    const submitEmail = (value) => {
        setIsEmail(value.email)
    }
    const handleUpdatePassword = (values) => {
        const { oldPassword, newPassword } = values;
        const payload = {
            email:isEmail,
            oldPassword:oldPassword,
            newPassword:newPassword
        }
        dispatch(forgotPassword(payload)).unwrap().then()
        .catch((err) => setToast({ open: true, message: err.message || "Something went wrong", severity: 'error' }))
    }
    return (
        <Container maxWidth="sm" sx={{ padding: { xs: '16px', sm: '24px' } }}>
            {
                isEmail === '' ? 
            <Formik
                initialValues={{ email:'' }}
                onSubmit={submitEmail}
            >
                {({ errors, touched }) => (
                    <Form noValidate autoComplete="off">
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            margin="normal"
                        />
                       
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            size="large"
                            sx={{
                                marginTop: '20px',
                                backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
                                fontSize: { xs: '14px', sm: '16px' },
                            }}
                        >
                           Submit
                        </Button>
                    </Form>
                )}

            </Formik> :
            <Formik
            initialValues={{ oldPassword: '', newPassword: '' }}
            validationSchema={checkPasswordValidation}
            onSubmit={handleUpdatePassword}
        >
            {({ errors, touched }) => (
                <Form noValidate autoComplete="off">
                    <Field
                        as={TextField}
                        name="oldPassword"
                        label="Old Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={touched.oldPassword && Boolean(errors.oldPassword)}
                        helperText={touched.oldPassword && errors.oldPassword}
                    />
                    <Field
                        as={TextField}
                        name="newPassword"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={touched.newPassword && Boolean(errors.newPassword)}
                        helperText={touched.newPassword && errors.newPassword}
                    />
                    <Field
                        as={TextField}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        size="large"
                        sx={{
                            marginTop: '20px',
                            backgroundImage: 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)',
                            fontSize: { xs: '14px', sm: '16px' },
                        }}
                    >
                        Update Password
                    </Button>
                </Form>
            )}

        </Formik>
            }
            
            <Box paddingTop={3}>
                <Link
                    onClick={() => dispatch(handleForgot(false))}
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <ArrowBackIcon sx={{ paddingRight: 1 }} />
                    Back To Login
                </Link>
            </Box>
            <Toaster
                message={toast.message}
                open={toast.open}
                severity={toast.severity}
                onClose={() => setToast({ ...toast, open: false })}
        />
        </Container>
    )
}

export default ForgotPassword