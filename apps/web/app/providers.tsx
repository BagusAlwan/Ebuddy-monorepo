'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '@/theme/index';
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
    </Provider>
  );
}