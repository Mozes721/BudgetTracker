import { configureStore  } from "@reduxjs/toolkit";
import userReduser from '../features/userSlice';

export default configureStore({
    reducer: {
        user: userReduser,
    },

});
