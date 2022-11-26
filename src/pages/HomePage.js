import {  Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Burger from '../components/Burger'
import FormCheckOut from '../components/FormCheckOut'
import FormEditBurger from '../components/FormEditBurger'
import TotalPrice from '../components/TotalPrice'
import { LOCALSTORED_KEY } from '../constant/urlConstant'



export default function HomePage() {
  const [state,setState] = useState(false)
  const user = useSelector(state => state.user.user)
  const navigate = useNavigate()
useEffect(() => {
if(!user){
  setState(false)
}

},[user])
  return (
    
        <div style={{padding : '50px 0'}}>
        <Stack spacing={2} width='400px' margin = '0 auto'>
        <Burger />
        <TotalPrice />
        <FormEditBurger setState={() => {
          if(localStorage.getItem(LOCALSTORED_KEY)){
            setState(true)
          }
          else{
            navigate('/hamberger/login')
          }
        }} display={state}/>
        <FormCheckOut setState={() => setState(false)} display={state}/>
        </Stack>
        </div>
    
  )
}
