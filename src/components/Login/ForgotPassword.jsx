import { Box, Button, Container, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik';
import React from 'react'
import { checkPasswordValidation } from '../../utils/validation';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleForgot } from '../../app/users/userSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const handleUpdatePassword = (values) => {
        const { oldPassword, newPassword } = values;
        console.log(oldPassword, newPassword)
    }
    return (
        <Container maxWidth="sm" sx={{ padding: { xs: '16px', sm: '24px' } }}>
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
                            fullWidth
                            margin="normal"
                            error={touched.oldPassword && Boolean(errors.oldPassword)}
                            helperText={touched.oldPassword && errors.oldPassword}
                        />
                        <Field
                            as={TextField}
                            name="newPassword"
                            label="New Password"
                            type="newPassword"
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
                            type="confirmPassword"
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
            <Box paddingTop={3}>
                <Link
                    onClick={() => dispatch(handleForgot(false))}
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <ArrowBackIcon sx={{ paddingRight: 1 }} />
                    Back To Login
                </Link>
            </Box>
        </Container>
    )
}

export default ForgotPassword