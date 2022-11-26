import { Button, Container, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LOCALSTORED_KEY } from '../constant/urlConstant'
import { addUser, removeUser } from '../redux/userSlice'

export default function Header() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(removeUser())
    localStorage.removeItem(LOCALSTORED_KEY)
    navigate('/')
  }
  useEffect(() => {
    if(localStorage.getItem(LOCALSTORED_KEY)){
      dispatch(addUser(JSON.parse(localStorage.getItem(LOCALSTORED_KEY))))
    }
  },[dispatch])
  return (
    <div style={{boxShadow : '0 0 5px 2px #999', padding : '10px 0'}}>
        <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Link to='/newCloneBurger'>
        <Typography>Burger Builder</Typography>
        </Link>
        <Stack display = {user ? 'flex' : 'none'} direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
        <Typography>welcome , {user && user.name}</Typography>
        <Link to='/orders'>
        <Button variant='outlined'>My Orders</Button>
        </Link>
        <Button onClick={handleLogout} variant='outlined'>Log Out</Button>
        </Stack>
        <Link style={{display : user ? 'none' : 'block'}} to='/login'>
            <Button variant='outlined'>Login</Button>
        </Link>
    </Stack>
    </Container>
    </div>
  )
}
