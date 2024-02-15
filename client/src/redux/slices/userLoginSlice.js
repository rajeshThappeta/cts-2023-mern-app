import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios'

 export const userLoginLifeCycle=createAsyncThunk('user-login',async(userCred,thunkApi)=>{
    try{
    let res=await axios.post('http://localhost:4000/user-api/login',userCred)
    return res.data;
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})



export const userLoginSlice=createSlice({
    name:'user-login',
    initialState:{},
    reducers:{},
    extraReducers:builder=>builder
    .addCase(userLoginLifeCycle.pending,(state,action)=>{

    })
    .addCase(userLoginLifeCycle.fulfilled,(state,action)=>{

    })
    .addCase(userLoginLifeCycle.rejected,(state,action)=>{
        
    })
    
})

//export actions
export const {}=userLoginSlice.actions;
//export root reducer 
export default userLoginSlice.reducer; 

