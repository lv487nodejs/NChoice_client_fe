// import React from 'react';
// import './Login.css';
// import { Form, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import useForm from "./useForm";
// import validate from './LoginFormValidationRules';



// const Login = () => {
//     const {
//         values,
//         errors,
//         handleChange,
//         handleSubmit,
//     } = useForm(addDataToLoсalStorage, validate);

//     function addDataToLocalStorage(token) {
//         localStorage.setItem('token', JSON.stringify(token));
//         console.log('No errors, submit callback called!');
//     }


//     return (
//         <div className={'login'}>
//         <Form onSubmit={(e) => handleSubmit(e, 'login', values)} noValidate>
//             <Form.Group controlId="formBasicEmail">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     name={'email'}
//                     value={values.email}
//                     onChange={handleChange}
//                     className={`input ${errors.email && 'is-danger'}`}
//                 />
//                 {errors.email && (
//                     <p className="help is-danger">{errors.email}</p>
//                 )}
//                 <Form.Text className="text-muted">
//                     We'll never share your email with anyone else.
//                 </Form.Text>
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                     type="password"
//                     placeholder="Password"
//                     name={'password'}
//                     value={values.password}
//                     onChange={handleChange}
//                     className={`input ${errors.password && 'is-danger'}`}
//                 />
//                 {errors.password && (
//                     <p className="help is-danger">{errors.password}</p>
//                 )}
//             </Form.Group>
//             <Form.Group controlId="formBasicCheckbox">
//                 <Form.Check type="checkbox" label="Remember me" />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//                 Submit
//             </Button>
//             <Link to="/register" className="btn btn-link">Register</Link>
//         </Form>
//         </div>
//     )

// };



// export default Login;

