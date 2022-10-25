import { useEffect, useState } from 'react';

import { Theme, ThemeProvider } from '@mui/material';

import Cookie from 'js-cookie';

import { darkTheme, lightTheme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { api } from '../../api';
import { IAuth } from '../../interfaces';
import { setLogin } from '../../store/slices/auth';

interface Props {
  children: JSX.Element | JSX.Element[]
}

const PageProvider = ({ children }: Props) => {
    const { mode } = useAppSelector( state => state.theme);

    const [themeValue, setThemeValue] = useState<Theme>(lightTheme);
    const dispatch = useAppDispatch()

    useEffect(() => {

      const cookieTheme = Cookie.get('theme') || 'light';
      
       cookieTheme === 'light'
        ? setThemeValue(lightTheme)
        : setThemeValue(darkTheme)

    }, [mode]);

        
    useEffect(() => {
      const getUserData = async () => {
        try {
          const { data } = await api.get<IAuth>('/auth/validate-token');
          const { token, user } = data

          Cookie.set('token', token);
          dispatch(setLogin({ isLoggedIn: true, user }));

        } catch (error) {
          Cookie.remove('token');
        }
      }

      getUserData();      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  


    return <ThemeProvider theme={  themeValue  }>{ children }</ThemeProvider>
}
export default PageProvider