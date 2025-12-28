import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    user: null,
    isLoading: false,
    registerLoading: false,
    error: null,
    isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/users");
            if (!response.ok) {
                throw new Error("Sorry something went wrong while fetching API");
            }

            const data = await response.json();
            const matchedUser = data.find(
                (user) => (user.username === email || user.email === email) && user.password === password
            );

            if (!matchedUser) {
                return rejectWithValue("Invalid email or password");
            };

            localStorage.setItem("token", JSON.stringify(matchedUser));

            return matchedUser;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUser, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:5000/users");
            const users = await res.json();

            const isExist = users.find(
                (user) => user.email === newUser.email || user.username === newUser.username
            );

            if (isExist) {
                return rejectWithValue("User already exists");
            }

            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setUserFromToken: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Something went wrong";
            });
        // Register extraReducer
        builder
            .addCase(registerUser.pending, (state) => {
                state.registerLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerLoading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { logout, clearAuthError, setUserFromToken } = AuthSlice.actions;
export default AuthSlice.reducer;
