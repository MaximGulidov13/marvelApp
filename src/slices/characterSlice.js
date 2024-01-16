import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import useMarvelService from "../services/MarvelService";

const characterAdapter = createEntityAdapter();

const initialState = characterAdapter.getInitialState({
    characterLoadingStatus: 'idle'
});

export const fetchCharacter = createAsyncThunk(
    'character/fetchCharacter',
    async () => {
        const {getCharacter} = useMarvelService()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        const character = await getCharacter(id);
        return character;
    }
);

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacter.pending, state => {state.characterLoadingStatus = 'loading'})
            .addCase(fetchCharacter.fulfilled, (state, action) => {
                state.characterLoadingStatus = 'idle';
                characterAdapter.setOne(state, action.payload)
            })
            .addCase(fetchCharacter.rejected, state => {
                state.characterLoadingStatus = 'error';
            })
        }
});

const {reducer} = characterSlice;

export default reducer;
