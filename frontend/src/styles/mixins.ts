import { css } from 'styled-components';
import { theme } from './theme';


export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

//Card padrão
export const cardStyle = css`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  transition: ${theme.transitions.default};
  padding: ${theme.spacing.lg};

  &:hover {
    border-color: ${theme.colors.neonOrange};
    box-shadow: ${theme.shadows.neon};
  }
`;

// Input padrão
export const inputStyle = css`
  width: 100%;
  padding: ${theme.spacing.sm} 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${theme.colors.border};
  color: ${theme.colors.text};
  font-size: ${theme.typography.sizes.md};
  transition: ${theme.transitions.default};
  outline: none;

  &:focus {
    border-bottom-color: ${theme.colors.neonOrange};
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
    opacity: 0.5;
  }
`;

// Botão neon
export const neonButton = css`
  background: ${theme.colors.neonOrange};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.medium};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.neonOrangeHover};
    transform: translateY(-2px);
    animation: glowPulse 1.5s infinite;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }
`;

//scrollbar 
export const customScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.neonOrange};
    border-radius: ${theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.neonOrangeHover};
  }

  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.neonOrange} ${theme.colors.surface};
`;

// truncateText p/ textos longos
export const truncateText = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

// Sombra de elevação
export const elevation = (level: number) => {
  const shadows = {
    1: theme.shadows.sm,
    2: theme.shadows.md,
    3: theme.shadows.lg,
    4: theme.shadows.xl,
  };
  return css`
    box-shadow: ${shadows[level as keyof typeof shadows] || shadows[1]};
  `;
};

// hover effect
export const hoverEffect = css`
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

// efeito vidro
export const glassMorphism = css`
  background: rgba(45, 45, 45, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 0, 0.2);
`;

// grid responsivo
export const responsiveGrid = (minWidth: string = '250px') => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${minWidth}, 1fr));
  gap: ${theme.spacing.md};
`;