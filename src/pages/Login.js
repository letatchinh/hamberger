import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axiosClient from '../MyAxios/Axios';
import { Link, useNavigate } from 'react-router-dom';
import { LOCALSTORED_KEY } from '../constant/urlConstant';
import FacebookLogin from 'react-facebook-login';
import {GoogleLogin,GoogleLogout} from 'react-google-login'
export default function Login() {
  const clientId = "901334910600-93hu25vc1mn46buohj0amfm23u792rvp.apps.googleusercontent.com"
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const {mutate , isLoading} = useMutation({
      mutationFn: account => {
        return axiosClient.post('api/users', account)
      },
      onSuccess : (data) => {
       localStorage.setItem(LOCALSTORED_KEY,JSON.stringify({id : data.data.id , name : data.data.name}))
       navigate('/hamberger/')
      },
      onError : (data) => {
        alert(data.response.data.message)
      }
      
    })
    // useEffect(() => {
    //   google.accounts.id.initialize({

    //   })
    // },[])
  const onSubmit = (data) =>{
    mutate(JSON.stringify({
      username : data.username,
      password : data.password
    }))
  }
  
  const responseFacebook = (response) => {
    console.log(response);
  }
  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);

};
const onLoginFailure = (res) => {
  console.log('Login Failed:', res);
};
  return (
    <Paper sx={{width : '40%' , margin : '50px auto' }} elevation={3}>
<form  style={{padding : '10px'}} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} alignItems='center'>
        <Typography variant='h6'>Sign In</Typography>
      <TextField error={errors && errors.username !== undefined} helperText={errors.username && "User name must be Require"} fullWidth label='Username' variant="outlined"  {...register("username",{required : true})} />
      <TextField error={errors && errors.password !== undefined} helperText={errors.password && "Password must be Require"} fullWidth label='Password' variant="outlined" {...register("password",{required : true})} />
      {errors.exampleRequired && <span>This field is required</span>}
      {isLoading ? 
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton> : <Button variant='contained' type="submit" >Login</Button>}
      <Stack direction='row' alignItems='center' spacing={1}>
          <div style={{width : '200px' , background : 'black' , height : '2px'}}></div>
          <Typography flex={1}>Or</Typography>
          <div style={{width : '200px' , background : 'black' , height : '2px'}}></div>
      </Stack>
      <Link to='/hamberger/register'>
      <Button variant='contained' >Register</Button>
      </Link>
      <FacebookLogin
    appId="1144177066460530"
    fields="name,email,picture"
    callback={responseFacebook} />
     <GoogleLogin
    clientId={clientId}
    buttonText="Login"
    onSuccess={onLoginSuccess}
    onFailure={onLoginFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
  />
      </Stack>
    </form>
    </Paper>
  )
}
