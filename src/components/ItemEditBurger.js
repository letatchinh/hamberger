import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementByAmount, incrementByAmount } from '../redux/burgerSlice'
export default function ItemEditBurger({name,price}) {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.burger.order[name])
  const handleIncrease = () => {
    dispatch(incrementByAmount({name,price}))
  }
  const handleDecrease = () => {
    dispatch(decrementByAmount({name,price}))
  }
  return (
    <Stack direction='row' justifyContent='space-between'>
    <Typography>{name} ({price}$)</Typography>
    <Stack direction='row' spacing={2} alignItems = 'center'>
        <Button disabled={count === 0} onClick={handleDecrease} variant='outlined'>Less</Button>
        <Typography>{count}</Typography>
        <Button onClick={handleIncrease} variant='outlined'>More</Button>
    </Stack>
    </Stack>
  )
}
