import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {
    const [loginData, SetLoginData] = useState({})

    const { user, registerUser,isLoading,authError } = useAuth();


    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field,value);

        const newLoginData = { ...loginData };
        newLoginData[field] = value;

        // console.log(field,value,newLoginData);
        SetLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('your pass did not match');
            return;
        }
        registerUser(loginData.email, loginData.password);
        // alert('hello')
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{mt:8}} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Register
                    </Typography>
                    {!isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{width:"75%", m:1}}
                            id="standard-basic"
                            name="email"
                            type="email"
                            onChange={handleOnChange}
                            label="Your Email"
                            variant="standard" />
                        <TextField
                            sx={{width:"75%", m:1}}
                            id="standard-basic"
                            label="Your Password"
                            name="password"
                            onChange={handleOnChange}
                            type="password"
                            variant="standard" />
                        <TextField
                            sx={{width:"75%", m:1}}
                            id="standard-basic"
                            label="ReType Your Password"
                            name="password2"
                            onChange={handleOnChange}
                            type="password"
                            variant="standard" />
                        <Button variant="contained" sx={{ width: "75%", m: 1 }} type="submit">Register</Button>
                        <NavLink style={{textDecoration:'none'}} to='/login'><Button variant="text">Already Registered? Please login</Button></NavLink>
                    </form>}
                    {isLoading && <CircularProgress />}
                    {user?.email && <Alert severity="success">User Created Successfully!</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;