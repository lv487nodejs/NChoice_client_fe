// import { useState, useEffect } from 'react';
// import axios from "axios";

// const useForm = (callback, validate) => {

//     const [values, setValues] = useState({});
//     const [errors, setErrors] = useState({});
//     // const [isSubmitting, setIsSubmitting] = useState(false);

//     useEffect(() => {
//         if (Object.keys(errors).length === 0 && isSubmitting) {
//             callback();
//         }
//     }, [errors, callback]);

//     const handleSubmit = (event, route, value) => {
//         if (event) event.preventDefault();
//         setErrors(validate(value));
//         // setIsSubmitting(true);
//         axios({
//             method: 'post',
//             url: `https://stark-headland-06017.herokuapp.com/auth/${route}`,
//             data: value
//         })
//             .then(r => callback(r.data))
//             .catch((e) => console.log(e))
//     };

//     const handleChange = (event) => {
//         event.persist();
//         setValues(values => ({ ...values, [event.target.name]: event.target.value }));
//     };

//     return {
//         handleChange,
//         handleSubmit,
//         values,
//         errors,
//     }
// };

// export default useForm;