import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    min-height: 100vh;
    line-height: 1.5;
  }

  /* Estilização da barra de rolagem */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.neonOrange};
    border-radius: ${theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.neonOrangeHover};
  }

  /* Para Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.neonOrange} ${theme.colors.surface};
  }

  /* Estilos para inputs e botões base */
  input, textarea, button {
    font-family: inherit;
  }

  /* Animações globais */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes glowPulse {
    0% { box-shadow: 0 0 0 0 ${theme.colors.neonOrangeGlow}; }
    70% { box-shadow: 0 0 10px 5px ${theme.colors.neonOrangeGlow}; }
    100% { box-shadow: 0 0 0 0 ${theme.colors.neonOrangeGlow}; }
  }

  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Utilidades */
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-left { text-align: left; }
  
  .mt-1 { margin-top: ${theme.spacing.sm}; }
  .mt-2 { margin-top: ${theme.spacing.md}; }
  .mt-3 { margin-top: ${theme.spacing.lg}; }
  .mt-4 { margin-top: ${theme.spacing.xl}; }
  
  .mb-1 { margin-bottom: ${theme.spacing.sm}; }
  .mb-2 { margin-bottom: ${theme.spacing.md}; }
  .mb-3 { margin-bottom: ${theme.spacing.lg}; }
  .mb-4 { margin-bottom: ${theme.spacing.xl}; }
  
  .p-1 { padding: ${theme.spacing.sm}; }
  .p-2 { padding: ${theme.spacing.md}; }
  .p-3 { padding: ${theme.spacing.lg}; }
  .p-4 { padding: ${theme.spacing.xl}; }
`;