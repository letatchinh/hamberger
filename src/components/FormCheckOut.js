import { LoadingButton } from '@mui/lab'
import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { LOCALSTORED_KEY } from '../constant/urlConstant'
import axiosClient from '../MyAxios/Axios'
import { addUser } from '../redux/userSlice'
import {  toast } from 'react-toastify';
import { resetBurger } from '../redux/burgerSlice'
import { subscribeUser } from '../subscription'

export default function FormCheckOut({display,setState}) {
    const [user,setUser] = useState({})
    const sw = navigator.serviceWorker;
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const order = useSelector(state => state.burger.order)
    const price = useSelector(state => state.burger.totalBill)
    const notify = () => toast("Order success!");
    const dispatch = useDispatch()
    const {mutate , isLoading} = useMutation({
      mutationFn: orders => {
        return axiosClient.post('api/addOrder', orders)
      },
      onSuccess : () => {
        subscribeUser()
        // if (sw?.controller) {
        //   sw.controller.postMessage("ádsad");
        // }
        setState();
        notify();
        dispatch(resetBurger())
        reset();
      
      },
      onError : (data) => {
        alert(data.response.data.message)
      }
      
    })
    useEffect(() => {
      if(localStorage.getItem(LOCALSTORED_KEY)){
        setUser(JSON.parse(localStorage.getItem(LOCALSTORED_KEY)))
        dispatch(addUser(JSON.parse(localStorage.getItem(LOCALSTORED_KEY))))
        reset({name : JSON.parse(localStorage.getItem(LOCALSTORED_KEY)).name});
      }
      
    },[dispatch,reset])
    const onSubmit = (data) =>{
      const timeStamp = Date.now()
        const newOrder = {
            idUser : user.id,
            order ,
            price,
            contact : data,
            timeStamp
          }
        mutate(JSON.stringify(newOrder))
      //  console.log(2022-12-04T21:51:21+07:00);
      }
  return (
    <Stack display={display ? 'flex' : 'none'} padding='10px' borderRadius='10px' border='1px solid black' spacing={1}>
        <form style={{padding : '10px'}} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} alignItems='center'>
      <TextField defaultValue={user && user.name} error={errors && errors.name !== undefined} helperText={errors.name && "User name must be Require"} fullWidth label='Name' variant="outlined"  {...register("name",{required : true})} />
      <TextField error={errors && errors.phone !== undefined} helperText={errors.phone && "User phone must be Require"} fullWidth label='Phone' variant="outlined"  {...register("phone",{required : true})} />
      <TextField error={errors && errors.email !== undefined} helperText={errors.email && "User email must be Require"} fullWidth label='Email' variant="outlined"  {...register("email",{required : true})} />
      <TextField error={errors && errors.address !== undefined} helperText={errors.address && "User address must be Require"} fullWidth label='Address' variant="outlined"  {...register("address",{required : true})} />
      <TextField multiline
          rows={4} error={errors && errors.note !== undefined} helperText={errors.note && "User note must be Require"} fullWidth label='Note' variant="outlined"  {...register("note")} />
      
      {!isLoading ?  <Stack direction='row' spacing={2}>
        <Button onClick={setState} variant='outlined'>Back</Button>
        <Button type='submit' variant='outlined'>Order</Button>
      </Stack> :
        <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>}
      </Stack>
    </form>
      
        </Stack>
  )
}
