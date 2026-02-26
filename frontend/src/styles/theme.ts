
export const theme = {
    colors: {
        background: '#1a1a1a',
        surface: '#2d2d2d',
        surfaceHover: '#3d3d3d',
        text: '#ffffff',
        textSecondary: '#b3b3b3',
        neonOrange: '#ff6b00',
        neonOrangeHover: '#ff8533',
        neonOrangeGlow: 'rgba(255, 107, 0, 0.3)',
        danger: '#ff4d4f',
        dangerHover: '#ff7875',
        success: '#2ecc71',
        successHover: '#27ae60',
        border: '#404040',
        borderLight: '#4d4d4d',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        round: '50%',
    },
    typography: {
        fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
        sizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.25rem',
            xl: '1.5rem',
            xxl: '2rem',
            xxxl: '2.5rem',
        },
        weights: {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },
    shadows: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0 4px 8px rgba(0, 0, 0, 0.12)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.14)',
        xl: '0 12px 24px rgba(0, 0, 0, 0.16)',
        neon: `0 4px 12px ${'rgba(255, 107, 0, 0.3)'}`,
    },
    transitions: {
        default: 'all 0.3s ease',
        fast: 'all 0.15s ease',
        slow: 'all 0.5s ease',
    },
    breakpoints: {
        mobile: '320px',
        tablet: '768px',
        desktop: '1024px',
        wide: '1280px',
    },
    zIndex: {
        base: 1,
        dropdown: 10,
        modal: 100,
        toast: 1000,
    },
};

export type Theme = typeof theme;