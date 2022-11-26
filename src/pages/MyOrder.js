import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { v4 } from 'uuid';
import RowOrder from '../components/RowOrder';
import '../components/StyleComponent/table.css'
import { LOCALSTORED_KEY } from '../constant/urlConstant'
import axiosClient from '../MyAxios/Axios';
import { useNavigate } from 'react-router-dom';
export default function MyOrder() {
    const limit = 4;
    const [page,setPage] = useState(1)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem(LOCALSTORED_KEY)) || {}
    const key = `/api/userOrder/${user.id}?limit=${limit}&page=${page}`
    const {data,isLoading} = useQuery({
        queryKey : [key],
        queryFn : async() => {
            const res = await axiosClient.get(key)
            return res
        }
    })
  return (
    <div style={{padding : '50px 0'}}>
    <Typography variant='h4'>My Order</Typography>
        {isLoading ? <div>...loading</div> : data && data.data.arrResponse.length === 0 ? <Stack alignItems='center' spacing={1}>
            <Typography>Ops You don't have any orders yet </Typography>
            <Button sx={{width : '150px'}} variant='outlined' onClick={() => navigate('/hamberger/')}>Go Order</Button>
        </Stack>  :<Stack alignItems='center'>
        <table className='MyTable'>
        <thead>
        <tr>
            <td style={{width : '70%'}}>Ingredients</td>
            <td>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography>Price</Typography>
                {/* <Stack>
                    <ArrowDropUpIcon onClick={() => setPage(page-1)} sx={{cursor : 'pointer' , display : page === 1 ? 'none' : 'block'}}/>
                    <ArrowDropDownIcon onClick={() => setPage(page+1)} sx={{cursor : 'pointer'}}/>
                </Stack> */}
                </Stack>
            </td>
        </tr>
        </thead>
        <tbody>
            {data && data.data.arrResponse.map(e => <RowOrder key={v4()} item={e}/>)}
            
        </tbody>
    </table>
    <Stack direction='row' spacing={1}>
    <Button variant='outlined' disabled={page === 1} onClick={() => setPage(page-1)}>Pre</Button>
    <Button variant='outlined' onClick={() => setPage(page+1)}>Next</Button>
    </Stack>
        </Stack>
    
    }
        
    </div>
  )
}
