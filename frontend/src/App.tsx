import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import TodoList from './components/TodoList';
import { GlobalStyle, theme } from './styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme.colors.surface,
            color: theme.colors.text,
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.colors.border}`,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.sizes.sm,
          },
          success: {
            style: {
              border: `1px solid ${theme.colors.neonOrange}`,
            },
            iconTheme: {
              primary: theme.colors.neonOrange,
              secondary: theme.colors.text,
            },
          },
          error: {
            style: {
              border: `1px solid ${theme.colors.danger}`,
            },
            iconTheme: {
              primary: theme.colors.danger,
              secondary: theme.colors.text,
            },
          },
        }}
      />
      <TodoList />
    </ThemeProvider>
  );
}

export default App;