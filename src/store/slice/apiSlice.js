import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemon = createAsyncThunk('fetchPokemon', async (e) => {
    const api_key = 'live_xxw2QSMNzY4c7T28gjAgRk1HTZzor0Kw29NT08sNLdMPJJmXFT0v61vMGKwlGrwM';
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${e.limit}&api_key=${api_key}&has_breeds=1&page=${e.page}&order=ASC`);
    return response.json();
});

export const fetchLocalStorage = createAsyncThunk('fetchLocalStorage', async (e) => {
    let response = [], key = '';

    if (localStorage.getItem(e.id)) {
        localStorage.removeItem(e.id);
    } else {
        localStorage.setItem(e.id, e.url);
    } 

    for (var i = 0; i < localStorage.length; i++){
        key = localStorage.key(i);
        response.push(key);
    }

    return response;
});

// функция фильтрации
function filtersData(data, dataFiltered, allFavorites, filters) {

    if (filters['male'] === '1') {
        dataFiltered = data.filter(element => {
            return [0].indexOf(element.breeds[0].natural) !== -1;
        });
    } else if(filters['male'] === '2') {
        dataFiltered = data.filter(element => {
            return [1].indexOf(element.breeds[0].natural) !== -1;
        });
    } else {
        dataFiltered = data;
    }

    if (filters['favorite'] === true) {
        dataFiltered = dataFiltered.filter(element => {
            return allFavorites.indexOf(element.id) !== -1;
        });
    }

    if (filters['search']) {
        dataFiltered = dataFiltered.filter(element =>
            element.breeds[0].name.toString().toLowerCase().includes(filters['search'])
        );
    }

    return dataFiltered;
}

const apiSlice = createSlice({
    name: "api",
    initialState: {
        isLoading: false,
        data: null,
        dataFiltered: null,
        filters: {'male': '0'},
        isError: false,
        currentPage: 1,
        allFavorites: [],
    },
    reducers: {
        fetchFilteredData(state, action) {

            if (action.payload.name === 'male') {
                state.filters['male'] = action.payload.value;
            } else if(action.payload.name === 'favorite') {
                state.filters['favorite'] = action.payload.value;
            } else if(action.payload.name === 'search') {
                state.filters['search'] = action.payload.value;
            }

            state.dataFiltered = filtersData(state.data, state.dataFiltered, state.allFavorites, state.filters);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemon.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPokemon.fulfilled, (state, action) => {
            state.isLoading = false;

            if (state.data != null) {
                state.data.push(...action.payload);
            } else {
                state.data = action.payload;
            }

            state.dataFiltered = filtersData(state.data, state.dataFiltered, state.allFavorites, state.filters);
            
            state.currentPage = state.currentPage + 1;
        });
        builder.addCase(fetchPokemon.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true;
        });

        builder.addCase(fetchLocalStorage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allFavorites = action.payload;
        });
        builder.addCase(fetchLocalStorage.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true;
        });
    }
});

export const {fetchFilteredData} = apiSlice.actions;

export default apiSlice.reducer;