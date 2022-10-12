import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { chatSlice } from './slices/chat';
import { openMenuSlice } from './slices/ui';
import { todosSlice } from './slices/todos/todosSlice';

export const store = configureStore({
    reducer: {
        openMenu: openMenuSlice.reducer,
        chat: chatSlice.reducer,
        todos: todosSlice.reducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk < ReturnType = void > = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
