import * as Yup from 'yup';

export const validationSchema = Yup.object({
    userName: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

export const checkPasswordValidation = Yup.object({
  newPassword: Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[@$!%*?&]/, "Password must contain at least one special character")
  .required("New Password is required"),

  confirmPassword: Yup.string()
  .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
  .required("Confirm Password is required"),
  oldPassword: Yup.string().required('Old Password is required')
})