import { useEffect, useState } from 'react';

import { Theme, ThemeProvider } from '@mui/material'
import Cookie from 'js-cookie';

import { darkTheme, lightTheme } from '../../theme';
import { useAppSelector } from '../../store/hooks';

interface Props {
  children: JSX.Element | JSX.Element[]
}

const PageProvider = ({ children }: Props) => {
    const { mode } = useAppSelector( state => state.theme);

    const [themeValue, setThemeValue] = useState<Theme>(lightTheme);

    useEffect(() => {

      const cookieTheme = Cookie.get('theme') || 'light';
      
       cookieTheme === 'light'
        ? setThemeValue(lightTheme)
        : setThemeValue(darkTheme)

    }, [mode]);

    return <ThemeProvider theme={  themeValue  }>{ children }</ThemeProvider>
}
export default PageProvider