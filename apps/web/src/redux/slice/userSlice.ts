import { Role, User } from "@/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Pick<
  User,
  "id" | "fullName" | "role" | "tokenExpiresIn" | "email"
> = {
  id: 0,
  email: "",
  fullName: "",
  role: Role.USER,
  tokenExpiresIn: new Date(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.tokenExpiresIn = action.payload.tokenExpiresIn;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.fullName = "";
      state.email = "";
      state.role = Role.USER;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
