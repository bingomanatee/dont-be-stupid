// theme.ts
// @ts-nocheck
import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineLayerStyles,
} from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    layerStyles: defineLayerStyles({
      pc: {
        value: {
          height: '100%',
          bgColor: 'hsl(256, 70%, 30%, 66%)',
        },
      },
      page: {
        value: {
          py: '5rem',
          overflowY: 'auto',
        },
      },
      heroText: {
        value: {
          bgColor: 'theme.700',
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
          xl: {
            value: '4rem',
          },
          xl_lg: { value: '5rem' },
          xl_xl: { value: '6rem' },
          m: { value: '1.5rem' },
          m_lg: { value: '2.25rem' },
          m_xl: { value: '3rem' },
        },
        colors: {
          theme: {
            50: { value: 'hsl(256, 70%, 5%,)' },
            100: { value: 'hsl(256, 70%, 10%,)' },
            200: { value: 'hsl(256, 70%, 20%,)' },
            300: { value: 'hsl(256, 70%, 30%)' },
            400: { value: 'hsl(256, 70%, 40%)' },
            500: { value: 'hsl(256, 70%, 50%)' },
            600: { value: 'hsl(256, 70%, 60%)' },

            700: { value: 'hsl(256, 70%, 70%)' },
            800: { value: 'hsl(256, 70%, 80%)' },
            900: { value: 'hsl(256, 70%, 90%)' },
            1000: { value: 'hsl(256, 70%, 100%)' },
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
      },
      lineHeights: {
        normal: { value: 'normal' },
        relaxed: { value: '120%' },
      },
    },

    textStyles: {
      displayHead: {
        value: {
          fontSize: { base: 'disp.xl', lg: 'disp.xl_lg', xl: 'disp.xl_xl' },
          fontFamily: 'Alfa Slab One',
          lineHeight: 'normal',
        },
      },
      display: {
        value: {
          fontSize: { base: 'disp.m', lg: 'disp.m_lg', xl: 'disp.m_xl' },
        },
      },
      buttonDisplay: {
        value: {
          fontSize: { base: 'disp.xl', lg: 'disp.xl_lg', xl: 'disp.xl_xl' },
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'theme.900',
        },
      },
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
