import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// const news = JSON.parse(localStorage.getItem('news'))

const initialState = {
    news: [],
    isError: false,
    isLoading: false,
    message: '',
}


export const GetNews = createAsyncThunk('GetNews', async(body) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', body)
        // https://newsapi.org/v2/top-headlines?country=us&apiKey=dbe57b028aeb41e285a226a94865f7a7
        // return response.data.articles;
        return response.data
        // dbe57b028aeb41e285a226a94865f7a7
        // b8fb4a48fea24491b78f1818e9f33ae8
    } catch (error) {
        console.log(error)
    }
})

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetNews.pending, (state) => {
                state.isLoading = true
            })
            .addCase(GetNews.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.news = action.payload
                localStorage.setItem('news', JSON.stringify(state.news))
                state.message = 'All the news has been fetched'
            })
            .addCase(GetNews.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.news = null
            })
    }
})


export const { reset } = newsSlice.actions
export default newsSlice.reducer;
