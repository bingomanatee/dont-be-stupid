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
      listFrame: {
        value: {
          borderWidth: '1px',
          borderColor: 'Gray.400',
          px: 4,
          py: 3,
          my: 6,
        },
      },
      listItem: {
        value: {
          py: 2,
          px: 3,
          _hover: {
            bg: 'interface.900',
          },
        },
      },
      adminIcon: {
        value: {
          position: 'absolute',
          right: '4',
          top: '4',
          width: '120px',
          height: '120px',
          p: '2',
          zIndex: 1000,
          color: 'white',
        },
      },
      adminPanel: {
        value: {
          bg: 'gray.50',
          display: 'flex',
          maxWidth: '50rem',
          flexDirection: 'column',
          justifyContent: 'stretch',
          borderWidth: '1px',
          borderColor: 'gray.400',
        },
      },
      adminPanelBody: {
        value: {
          p: 4,
        },
      },
      adminPanelHeader: {
        value: {
          flex: 0,
          py: 2,
          bgGradient: 'to-b',
          gradientFrom: 'white',
          gradientTo: 'theme.900',
          justifyContent: 'center',
          display: 'flex',
          flexAlign: 'center',
        },
      },
      heroText: {
        value: {
          my: '4rem',
          py: '2rem',
        },
      },
      page: {
        value: {
          py: { base: 4, md: 5, lg: 6, xl: 7 },
          overflowY: 'auto',
          height: '100%',
        },
      },
      pageContainer: {
        value: {
          height: '100%',
          bgGradient: 'to-b',
          gradientFrom: 'theme.900',
          gradientTo: 'theme.700',
        },
      },
      pageContainerAdmin: {
        value: {
          height: '100%',
          flex: 1,
          bgGradient: 'to-b',
          gradientFrom: 'gray.50',
          gradientTo: 'gray.200',
        },
      },
      pageContent: {
        value: {
          my: 'xl',
          px: {
            base: 'pageMargin_sm',
            m: 'pageMargin',
            l: 'pageMargin_l',
            xl: 'pageMargin_xl',
          },
        },
      },
      pageInner: {
        value: {
          w: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'stretch',
        },
      },
      panelContainer: {
        value: {
          mx: {
            base: 'pageMargin_sm',
            m: 'pageMargin',
            l: 'pageMargin_l',
            xl: 'pageMargin_xl',
          },
        },
      },
    }),
    tokens: {
      fonts: {
        heading: { value: `'Alfa Slab One', serif` },
        body: { value: `'Oswald', sans-serif` },
      },
      fontSizes: {
        md_sm: '0.9rem',
        md_lg: '1.25rem',
        md_xl: '1.5rem',
        disp: {
          xl_sm: {
            value: '2.5rem',
          },
          xl: {
            value: '3rem',
          },
          xl_lg: { value: '4rem' },
          xl_xl: { value: '5rem' },

          m_sm: { value: '1.25rem' },
          m: { value: '1.5rem' },
          m_lg: { value: '2rem' },
          m_xl: { value: '2.25rem' },

          l: { value: '2rem' },
          l_sm: { value: '1.755rem' },
          l_lg: { value: '2.5rem' },
          l_xl: { value: '2.8rem' },
        },
        dispText: {
          m: { value: '1.25rem' },
          m_lg: { value: '1.5rem' },
          m_xl: { value: '1.66rem' },
        },
      },
      colors: {
        interface: {
          50: {
            value: 'hsl(36,100%,5%)',
          },
          100: {
            value: 'hsl(36,100%,10%)',
          },
          200: {
            value: 'hsl(36,100%,20%)',
          },
          300: {
            value: 'hsl(36,100%,30%)',
          },
          500: {
            value: 'hsl(36,100%,50%)',
          },
          600: {
            value: 'hsl(36,100%,60%)',
          },
          700: {
            value: 'hsl(36,100%,70%)',
          },
          800: {
            value: 'hsl(36,100%,80%)',
          },
          900: {
            value: 'hsl(36,100%,90%)',
          },
          1000: {
            value: 'hsl(36,100%,95%)',
          },
        },
        button: {
          a: { value: '{colors.gray.100}' },
          b: { value: '{colors.gray.200}' },
          hover: { value: 'colors.interface.600' },
        },
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
          1000: { value: 'hsl(256, 70%, 95%)' },
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
        compact: { value: '90%' },
        normal: { value: 'normal' },
        relaxed: { value: '120%' },
      },
      spacing: {
        pageMargin: { value: '40rem' },
        pageMargin_sm: { value: '5rem' },
        pageMargin_lg: { value: '6rem' },
        pageMargin_xl: { value: '8rem' },
      },
    },

    textStyles: {
      adminListItem: {
        value: {
          fontSize: { base: 'md', lg: 'md_l', xl: 'md_xl' },
          fontWeight: 500,
          fontFamily: '"Playfair Display", Georgia, sans-serif',
        },
      },
      iconicText: {
        value: {
          fontSize: { base: 'md', lg: 'md_l', xl: 'md_xl' },
          color: 'white',
        },
      },
      adminPanelTitle: {
        value: {
          fontFamily: 'Oswald',
          fontSize: {
            base: 'md_sm',
            md: 'md',
            lg: 'md_lg',
            xl: 'md_xl',
          },
        },
      },
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
          textTransform: 'uppercase',
          lineHeight: 'compact',
        },
      },
      displayHeadSub: {
        value: {
          textAlign: 'center',
          color: 'black',
          fontSize: {
            base: 'disp.lg',
            sm: 'disp.lg_sm',
            lg: 'disp.lg_lg',
            xl: 'disp.lg_xl',
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
          _hover: {
            bg: undefined,
          },
          transition: 'none',
        },
        variants: {
          size: {
            md: {
              h: 'auto',
              rounded: 'full',
            },
          },
          admin: {
            true: {
              h: 'auto',
              bgGradient: 'to-b',
              gradientFrom: 'button.a',
              gradientTo: 'button.b',
              color: 'black',
              fontSize: { base: 'md', large: 'md_l', xl: 'md_xl' },
              lineHeight: 'relaxed',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              rounded: 'md',
              mx: 'lg',
              px: 5,
              py: 3,
              _hover: {
                bg: 'button.hover',
              },
              transition: 'none',
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
              transition: 'none',
            },
          },
        },
      }),
    },
  },
  globalCss: {
    body: {
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
