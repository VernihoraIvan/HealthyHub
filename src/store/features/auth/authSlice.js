import { createSlice } from '@reduxjs/toolkit';

import {
  refresh,
  logOut,
  signIn,
  signUp,
  updateUser,
  checkEmail,
} from './thunks';
import {
  getMyFoodIntake,
  postMyFoodIntake,
  postMyWaterIntake,
  updateMyFoodIntake,
} from '../foodIntake/thunks';

import { APP_STATUS } from '@/constants/appStatus';

const initialState = {
  user: {
    name: null,
    email: null,
    goal: null,
    gender: null,
    age: null,
    height: null,
    weight: null,
    physicalActivityRatio: null,
    avatarURL: null,
    BMR: null,
  },
  token: null,
  isLoggedIn: false,
  appStatus: APP_STATUS.initialLoading,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAppStatus: (state, action) => {
      state.appStatus = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // refresh
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.user = payload.user;

        state.isLoggedIn = true;
        // state.appStatus = APP_STATUS.idle;
      })
      .addCase(refresh.rejected, (state, { payload }) => {
        if (payload === 401) state.token = null;
        state.appStatus = APP_STATUS.idle;
      })

      // signUp
      .addCase(signUp.pending, state => {
        state.appStatus = APP_STATUS.fetching;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;

        state.isLoggedIn = true;
        state.appStatus = APP_STATUS.idle;
      })
      .addCase(signUp.rejected, state => {
        state.appStatus = APP_STATUS.idle;
      })

      // signIn
      .addCase(signIn.pending, state => {
        state.appStatus = APP_STATUS.fetching;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;

        state.isLoggedIn = true;
        state.appStatus = APP_STATUS.idle;
      })
      .addCase(signIn.rejected, state => {
        state.appStatus = APP_STATUS.idle;
      })

      // logOut
      .addCase(logOut.pending, state => {
        state.appStatus = APP_STATUS.fetching;
      })
      .addCase(logOut.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(logOut.rejected, state => {
        state.appStatus = APP_STATUS.idle;
      })

      // updateUser
      .addCase(updateUser.pending, state => {
        state.appStatus = APP_STATUS.fetching;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) state.user[key] = payload[key];
        }
        state.appStatus = APP_STATUS.idle;
      })
      .addCase(updateUser.rejected, state => {
        state.appStatus = APP_STATUS.idle;
      })

      // getMyFoodIntake
      .addCase(getMyFoodIntake.pending, state => {
        state.appStatus = APP_STATUS.fetching;
      })
      .addCase(getMyFoodIntake.fulfilled, state => {
        state.appStatus = APP_STATUS.idle;
      })
      .addCase(getMyFoodIntake.rejected, state => {
        state.appStatus = APP_STATUS.idle;
      })

      // updateMyFoodIntake
      .addCase(updateMyFoodIntake.pending, state => {
        state.appStatus = APP_STATUS.fetching;
      })
      .addCase(updateMyFoodIntake.fulfilled, state => {
        state.appStatus = APP_STATUS.idle;
      })
      .addCase(updateMyFoodIntake.rejected, state => {
        state.appStatus = APP_STATUS.idle;
      })

      // postMyFoodIntake
      .addCase(postMyFoodIntake.pending, state => {
        state.appStatus = APP_STATUS.fetching;
      })
      .addCase(postMyFoodIntake.fulfilled, state => {
        state.appStatus = APP_STATUS.idle;
      })
      .addCase(postMyFoodIntake.rejected, state => {
        state.appStatus = APP_STATUS.idle;
      })

      // postMyWaterIntake
      .addCase(postMyWaterIntake.pending, state => {
        state.appStatus = APP_STATUS.fetching;
      })
      .addCase(postMyWaterIntake.fulfilled, state => {
        state.appStatus = APP_STATUS.idle;
      })
      .addCase(postMyWaterIntake.rejected, state => {
        state.appStatus = APP_STATUS.idle;
      })

      // checkEmail
      .addCase(checkEmail.pending, state => {
        state.appStatus = APP_STATUS.fetching;
      })
      .addCase(checkEmail.fulfilled, state => {
        state.appStatus = APP_STATUS.idle;
      })
      .addCase(checkEmail.rejected, state => {
        state.appStatus = APP_STATUS.idle;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
