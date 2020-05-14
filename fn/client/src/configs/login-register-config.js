import * as yup from "yup";

// login and register validation
export const firstNameRequiredMessage = "No first name provided";
export const firstNameMinElementCount = 2;
export const firstNameMinMessage = `First name is too short - should be ${firstNameMinElementCount} chars minimum`;
export const lastNameRequiredMessage = "No last name provided";
export const lastNameMinElementCount = 2;
export const lastNameMinMessage = `Last name is too short - should be ${lastNameMinElementCount} chars minimum`;
export const emailRegExp = new RegExp(/^([a-z0-9_-]+.)[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+).[a-z]{2,6}$/);
export const emailRegExpMessage = "Email must be correct. Example: nick@mail.com";
export const emailRequiredMessage = "Required";
export const passwordRegExp = new RegExp(/(?=.*[0-9])/);
export const passwordRegExpMessage = "Password must contain a number";
export const passwordRequiredMessage = "No password provided";
export const passwordMinElementCount = 6;
export const passwordMinMessage = `Password is too short - should be ${passwordMinElementCount} chars minimum`;
export const passwordConfirmMessage = 'Please, confirm your password';
export const agreeToTermsMessage = 'You must agree to terms to continue';

export const SignupSchemaLogin = yup.object().shape({
    email: yup.string()
        .required(emailRequiredMessage)
        .matches(emailRegExp, emailRegExpMessage),

    password: yup.string()
        .required(passwordRequiredMessage)
        .min(passwordMinElementCount, passwordMinMessage)
        .matches(passwordRegExp, passwordRegExpMessage)
});

export const SignupSchemaRegister = yup.object().shape({
    firstName: yup
        .string(),
    lastName: yup
        .string(),
    email: yup
        .string()
        .required(emailRequiredMessage)
        .matches(emailRegExp, emailRegExpMessage),
    password: yup
        .string()
        .required(passwordRequiredMessage)
        .min(passwordMinElementCount, passwordMinMessage)
        .matches(passwordRegExp, passwordRegExpMessage),
    confirmPassword: yup
        .string()
        .required(passwordRequiredMessage)
        .test('passwords-match', passwordConfirmMessage, function (value) {
            return this.parent.password === value;
        }),
    agreeToTerms: yup
        .boolean()
        .label('Terms')
        .test(
            'is-true',
            agreeToTermsMessage,
            value => value === true
        ),
});