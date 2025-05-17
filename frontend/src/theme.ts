// theme.ts
// @ts-nocheck
import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineLayerStyles,
  defineRecipe,
} from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    layerStyles: defineLayerStyles({
      pageContainer: {
        value: {
          height: '100%',
          bgGradient: 'to-b',
          gradientFrom: 'theme.900',
          gradientTo: 'theme.700',
        },
      },
      page: {
        value: {
          py: '2rem',
          overflowY: 'auto',
          height: '100%',
        },
      },
      heroText: {
        value: {
          my: '4rem',
          py: '2rem',
        },
      },
    }),
    tokens: {
      fonts: {
        heading: { value: `'Alfa Slab One', serif` },
        body: { value: `'Oswald', sans-serif` },
      },
      fontSizes: {
        disp: {
          xl_sm: {
            value: '2.5rem',
          },
          xl: {
            value: '3rem',
          },
          xl_lg: { value: '4rem' },
          xl_xl: { value: '5rem' },
          m: { value: '1.5rem' },
          m_lg: { value: '2rem' },
          m_xl: { value: '2.33rem' },
        },
        dispText: {
          m: { value: '1.25rem' },
          m_lg: { value: '1.5rem' },
          m_xl: { value: '1.66rem' },
        },
      },
      colors: {
        textAccent: { value: 'hsl(73,100%,50%)' },
        theme: {
          50: { value: 'hsl(256, 70%, 5%)' },
          100: { value: 'hsl(256, 70%, 10%)' },
          200: { value: 'hsl(256, 70%, 20%)' },
          300: { value: 'hsl(256, 70%, 30%)' },
          400: { value: 'hsl(256, 70%, 40%)' },
          500: { value: 'hsl(256, 70%, 50%)' },
          600: { value: 'hsl(256, 70%, 60%)' },
          700: { value: 'hsl(256, 70%, 70%)' },
          800: { value: 'hsl(256, 70%, 80%)' },
          900: { value: 'hsl(256, 70%, 90%)' },
          1000: { value: 'hsl(256, 70%, 100%)' },
        },
        themeImpact: {
          50: { value: 'hsl(240, 90%, 5%)' },
          100: { value: 'hsl(240, 90%, 10%)' },
          200: { value: 'hsl(240, 90%, 20%)' },
          300: { value: 'hsl(240, 90%, 30%)' },
          400: { value: 'hsl(240, 90%, 40%)' },
          500: { value: 'hsl(240, 70%, 50%)' },
          600: { value: 'hsl(240, 90%, 60%)' },
          700: { value: 'hsl(240, 90%, 70%)' },
          800: { value: 'hsl(240, 90%, 80%)' },
          900: { value: 'hsl(240, 90%, 90%)' },
          1000: { value: 'hsl(240, 90%, 100%)' },
        },
        themeAlpha: {
          50: { value: 'hsla(256, 70%,  50%, 5%,)' },
          100: { value: 'hsla(256, 70%, 50%, 10%,)' },
          200: { value: 'hsla(256, 70%, 50%,  20%,)' },
          300: { value: 'hsla(256, 70%,  50%, 30%)' },
          400: { value: 'hsla(256, 70%,  50%, 40%)' },
          500: { value: 'hsla(256, 70%, 50%, 50%)' },
          600: { value: 'hsla(256, 70%,  50%, 60%)' },
          700: { value: 'hsla(256, 70%, 50%, 70%)' },
          800: { value: 'hsla(256, 70%, 50%, 80%)' },
          900: { value: 'hsla(256, 70%, 50%, 90%)' },
          1000: { value: 'hsla(256, 70%, 50%, 100%)' },
        },
      },
      lineHeights: {
        normal: { value: 'normal' },
        relaxed: { value: '120%' },
      },
    },

    textStyles: {
      displayHead: {
        value: {
          textAlign: 'center',
          color: 'black',
          fontSize: {
            base: 'disp.xl',
            sm: 'disp.xl_sm',
            lg: 'disp.xl_lg',
            xl: 'disp.xl_xl',
          },
          fontFamily: 'Alfa Slab One',
          lineHeight: 'normal',
        },
      },
      display: {
        value: {
          textAlign: 'center',
          fontSize: { base: 'disp.m', lg: 'disp.m_lg', xl: 'disp.m_xl' },
          fontWeight: 500,
        },
      },
      buttonDisplay: {
        value: {
          fontSize: {
            base: 'dispText.m',
            lg: 'dispText.m_lg',
            xl: 'dispText.m_xl',
          },
          fontWeight: 'bold',
          lineHeight: 'relaxed',
          color: 'textAccent',
        },
      },
    },
    recipes: {
      button: defineRecipe({
        baseStyle: {
          h: 'auto',
          rounded: 'full',
        },
        variants: {
          size: {
            md: {
              h: 'auto',
              rounded: 'full',
            },
          },
          display: {
            true: {
              rounded: 'full',
              cursor: 'pointer',
              bg: 'theme.400',
              paddingX: '6',
              paddingY: '3',
              mx: '2',
              my: '2',
              lineHeight: 'relaxed',
              color: 'textAccent',
              fontSize: '2xl',
              _hover: {
                bg: 'theme.200',
              },
              _active: {
                transform: 'translateY(2px)',
                transition: 'all 0.1s ease-in-out',
              },
              _pressed: {
                transform: 'translateY(2px)',
              },
            },
          },
        },
      }),
    },
  },
  globalCss: {
    body: {
      backgroundImage: `url('img/background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'top left',
      fontFamily: 'body',
    },
    h1: {
      fontFamily: 'heading',
      lineHeight: 'relaxed',
    },
    'h2, h3, h4, h5, h6': {
      fontFamily: 'body',
      fontWeight: 'bold',
      lineHeight: 'relaxed',
    },
  },
});

export const system = createSystem(defaultConfig, config);
