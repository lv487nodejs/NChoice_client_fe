import {formRegExp} from "../configs/frontend-config";

export const universal = (type, text) => {
    switch (true) {
        case type === 'password':
            if (text.match(formRegExp.password)) {
                return false
            } else {
                return 'Password must be at least 8 characters long'
            }
        case  type === 'email':
            if (text.match(formRegExp.email)) {
                return false
            } else {
                return 'Please check that your e-mail address is indicated correctly'
            }
        case  type === 'firstName':
            if (text.match(formRegExp.name)) {
                return false
            } else {
                return 'Please, set from 2 to 30 alphabetic characters'
            }
        case  type === 'lastName':
            if (text.match(formRegExp.name)) {
                return false
            } else {
                return 'Please, set from 2 to 30 alphabetic characters'
            }
        case type ==='contactPhone':
            if (text.match(formRegExp.phone)) {
                return false
            } else {
                return 'Please enter a correct phone number'
            }
        case type ==='country':
            if (text.match(formRegExp.country)) {
                return false
            } else {
                return 'Please choose a country'
            }
        case type ==='city':
            if (text.match(formRegExp.name)) {
                return false
            } else {
                return 'Please choose a city'
            }
        case type ==='street':
            if (text.match(formRegExp.name)) {
                return false
            } else {
                return 'Please enter a correct street name'
            }
        case type ==='buildingNumber':
            if (text.match(formRegExp.buildingNum)) {
                return false
            } else {
                return 'Please enter a correct building number'
            }
        case type === 'paymentMethod':
            if (text.match(formRegExp.deliveryType)) {
                return false
            } else {
                return 'Please choose a payment method'
            }
        case type === 'deliveryType':
            if (text.match(formRegExp.deliveryMethod)) {
                return false
            } else {
                return 'Please choose a delivery type'
            }
        default:
            return `No ${type}} RegExp is known`
}}
