import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { chatSlice } from './slices/chat';
import { openMenuSlice, todoDashboard } from './slices/ui';
import { todosSlice } from './slices/todos/todosSlice';
import { themeSlice } from './slices/ui/theme';
import { authSlice } from './slices/auth';

export const store = configureStore({
    reducer: {
        openMenu: openMenuSlice.reducer,
        todoDashboard: todoDashboard.reducer,
        chat: chatSlice.reducer,
        todos: todosSlice.reducer,
        theme: themeSlice.reducer,
        auth: authSlice.reducer,
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
