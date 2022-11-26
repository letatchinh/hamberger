import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react'
import { useForm } from 'react-hook-form';
import axiosClient from '../MyAxios/Axios';
import { Link, useNavigate } from 'react-router-dom';
import { LOCALSTORED_KEY } from '../constant/urlConstant';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const {mutate , isLoading} = useMutation({
      mutationFn: account => {
        return axiosClient.post('api/register', account)
      },
      onSuccess : (data) => {
        if(data && data.status === 201){
            localStorage.setItem(LOCALSTORED_KEY,JSON.stringify({name : data.data.name,username : data.data.username}))
            alert("register success")
            navigate('/hamberger/')
        }
      },
      onError : (data) => {
        if(data && data.response.status === 401){
            alert(data && data.response.data.message)
        }
      }
      
    })
  const onSubmit = (data) =>{
    mutate(JSON.stringify({
      username : data.username,
      password : data.password,
      name : data.name
    }))
  }
  return (
    <Paper sx={{width : '40%' , margin : '50px auto' }} elevation={3}>
<form  style={{padding : '10px'}} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} alignItems='center'>
        <Typography variant='h6'>Sign Up</Typography>
      <TextField error={errors && errors.username !== undefined} helperText={errors.username && "User name must be Require"} fullWidth label='Username' variant="outlined"  {...register("username",{required : true})} />
      <TextField error={errors && errors.password !== undefined} helperText={errors.password && "Password must be Require"} fullWidth label='Password' variant="outlined" {...register("password",{required : true})} />
      <TextField error={errors && errors.name !== undefined} helperText={errors.name && "Name must be Require"} fullWidth label='Name' variant="outlined"  {...register("name",{required : true})} />
      {errors.exampleRequired && <span>This field is required</span>}
      {isLoading ? 
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton> : <Button variant='contained' type="submit" >Register</Button>}
      <Stack direction='row' alignItems='center' spacing={1}>
          <div style={{width : '200px' , background : 'black' , height : '2px'}}></div>
          <Typography flex={1}>Have an account ?</Typography>
          <div style={{width : '200px' , background : 'black' , height : '2px'}}></div>
      </Stack>
     <Link to='/hamberger/login'>
     <Button variant='contained' >Login</Button>
     </Link>
      </Stack>
    </form>
    </Paper>
  )
}
