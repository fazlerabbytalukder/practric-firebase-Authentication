import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import googleLogo from '../../../images/google logo.png';
import logo from '../../../images/logo.png';

const Register = () => {
    const [loginData, SetLoginData] = useState({})

    const history = useHistory();
    const location = useLocation();

    const { user, registerUser, isLoading, authError, signInWithGoogle } = useAuth();


    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field,value);

        const newLoginData = { ...loginData };
        newLoginData[field] = value;

        // console.log(newLoginData);
        SetLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('your pass did not match');
            return;
        }
        registerUser(loginData.email, loginData.password, loginData.name, history);
        // alert('hello')
        e.preventDefault();
    }

    //google sign in
    const handleGoogleSignIn = () => {
        signInWithGoogle(location,history)
    }

    return (
        <>
            <Container>
                <Grid container spacing={1}>
                    <Grid item sx={{ mt: 8, boxShadow: 3, mx: 'auto' }} xs={12} md={6}>
                        <img style={{ width: "200px" }} src={logo} alt="" />
                        <Typography variant="body1" gutterBottom>
                            Register
                        </Typography>
                        {!isLoading && <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: "75%", m: 1 }}
                                name="name"
                                type="text"
                                onChange={handleOnChange}
                                label="Your name"
                                id="outlined-size-small"
                                size="small"
                            />
                            <TextField
                                sx={{ width: "75%", m: 1 }}
                                name="email"
                                type="email"
                                onChange={handleOnChange}
                                label="Your Email"
                                id="outlined-size-small"
                                size="small"
                            />
                            <TextField
                                sx={{ width: "75%", m: 1 }}
                                id="outlined-size-small"
                                label="Your Password"
                                name="password"
                                onChange={handleOnChange}
                                type="password"
                                size="small" />
                            <TextField
                                sx={{ width: "75%", m: 1 }}
                                id="outlined-size-small"
                                label="Re-Type Your Password"
                                name="password2"
                                onChange={handleOnChange}
                                type="password"
                                size="small" />
                            <Button variant="contained" sx={{ width: "75%", m: 1 }} type="submit">Register</Button> <br />
                            <Button sx={{ my: 2 }} variant="text">--------------------- OR ---------------------</Button> <br />
                            <Button onClick={handleGoogleSignIn} sx={{ width: "75%", m: 1 }} variant="outlined"><img src={googleLogo} alt="" style={{ width: '25px' }} />  Sign In With Google</Button> <br />
                            <NavLink style={{ textDecoration: 'none' }} to='/login'><Button sx={{ my: 2 }} variant="text">Already User? Please Login</Button></NavLink>
                        </form>}
                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">User Created Successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Register;