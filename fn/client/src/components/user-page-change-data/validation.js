import * as yup from 'yup';

const emailRegEx = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const emailValidationText = "Email must be correct. Example: nick@mail.com";

export const SignupSchema = yup.object().shape({
    firstName: yup.string(),
    
    lastName: yup.string(),

    email: yup.string()
        .required("No email provided.")
        .email()
        .matches(emailRegEx, emailValidationText),

    password: yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
});