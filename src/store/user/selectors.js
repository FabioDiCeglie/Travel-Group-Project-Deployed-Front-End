export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user;

export const hasToken = (state) => (state.user.token ? true : false);

export const selectUsersFavourite = (state) => state.user.usersFavourite;
