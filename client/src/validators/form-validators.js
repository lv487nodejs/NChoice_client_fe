import {formRegExp} from "../configs/frontend-config";

// export const checkEmail = (event) => {
//     setEmailError(true);
//     if (event.target.value.match(formRegExp.email)) {
//         setEmailError('')
//     } else {
//         setEmailError('Please enter correct email')
//     }
// };
//
// export const validateConfirmPassword = (firstpass, secondpass) => {
//     if (firstpass === secondpass) {
//         setConfirmPasswordError('') }
//     else {
//         setConfirmPasswordError('Please confirm password')
//     }}
//
// export const handlePasswordChange = event => {
//     event.preventDefault()
//     if(event.target.value.match(formRegExp.password)){
//         setPasswordError('')
//         return
//     }
//     else{
//         setPasswordError('Please enter a password with min 8 up to 30 symbols')
//         return
//     }
// }
//
// export const handleEmailChange = event => {
//     event.preventDefault()
//     if(event.target.value.match(formRegExp.email)){
//         setEmailError('')
//     }
//     else{
//         setEmailError('Please enter correct email')
//     }
// }

export const universal = (type, text) => {
    //console.log(type,'aaa', text)
    switch (true) {
        case type === 'password':
            if (text.match(formRegExp.password)) {
                return false
            } else {
                return 'Please enter a correct password. Min 8 symbols'
            }
            break
        case  type === 'email':
            if (text.match(formRegExp.email)) {
                return false
            } else {
                return 'Please enter a correct email'
            }
            break
        case  type === 'firstName':
            if (text.match(formRegExp.name)) {
                return false
            } else {
                return 'Please enter alphabetic characters. '
            }
            break
        case  type === 'lastName':
            if (text.match(formRegExp.name)) {
                return false
            } else {
                return 'Please enter a correct name'
            }
            break
        case type ==='contactPhone':
            if (text.match(formRegExp.phone)) {
                return false
            } else {
                return 'Please enter a correct phone number'
            }
            break
        case type ==='country':
            if (text.match(formRegExp.country)) {
                return false
            } else {
                return 'Please choose a country'
            }
            break
        case type ==='city':
            if (text.match(formRegExp.name)) {
                return false
            } else {
                return 'Please choose a city'
            }
            break
        case type ==='street':
            if (text.match(formRegExp.name)) {
                return false
            } else {
                return 'Please enter a correct street name'
            }
            break
        case type ==='buildingNumber':
            if (text.match(formRegExp.buildingNum)) {
                return false
            } else {
                return 'Please enter a correct building number'
            }
            break
        case type === 'paymentMethod':
            if (text.match(formRegExp.deliveryType)) {
                return false
            } else {
                return 'Please choose a payment method'
            }
            break
        case type === 'deliveryType':
            if (text.match(formRegExp.deliveryMethod)) {
                return false
            } else {
                return 'Please choose a delivery type'
            }
            break
}}