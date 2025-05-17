// theme.ts
import {createSystem, defaultConfig, defineConfig, defineLayerStyles} from '@chakra-ui/react';

const config = defineConfig({

    theme: {
        layerStyles: defineLayerStyles({
            pc: {
                value: {
                    mY: '8'
                }
            },
        }),
        tokens: {
            fonts: {
                heading: {value: `'Alfa Slab One', serif`},
                body: {value: `'Oswald', sans-serif`},
            },
            fontSizes: {
                disp: {
                    xl: {
                        value: '4rem',
                    },
                    xl_lg: {value: '5rem'},
                    xl_xl: {value: '6rem'},
                    m: {value: '1.5rem'},
                    m_lg: {value: '2.25rem'},
                    m_xl: {value: '3rem'}
                },
                colors: {
                    overlay: {value: 'rgba(255,0, 0, 0.2)'},
                    theme: {
                        50: {value: 'hsl(256, 70%, 5%,)'},
                        100: {value: 'hsl(256, 70%, 10%,)'},
                        200: {value: 'hsl(256, 70%, 20%,)'},
                        300: {value: 'hsl(256, 70%, 30%)'},
                        400: {value: 'hsl(256, 70%, 40%)'},
                        500: {value: 'hsl(256, 70%, 50%)'},
                        600: {value: 'hsl(256, 70%, 60%)'},

                        700: {value: 'hsl(256, 70%, 70%)'},
                        800: {value: 'hsl(256, 70%, 80%)'},
                        900: {value: 'hsl(256, 70%, 90%)'},
                        1000: {value: 'hsl(256, 70%, 100%)'},
                    },
                }
            },
            lineHeights: {
                normal: {value: 'normal'},
                relaxed: {value: '120%'},
            },
        },

        textStyles: {
            displayHead: {
                value: {
                    fontSize: {base: "disp.xl", lg: 'disp.xl_lg', xl: 'disp.xl_xl'},
                    fontFamily: 'Alfa Slab One',
                    lineHeight: "normal"
                }
            },
            display: {
                value: {
                    fontSize: {base: 'disp.m', lg: 'disp.m_lg', xl: 'disp.m_xl'},

                }
            },
            buttonDisplay: {
                value: {
                    fontSize: {base: 'disp.xl', lg: 'disp.xl_lg', xl: 'disp.xl_xl'},
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'theme.900',
                }
            }
        }
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
            lineHeight: 'relaxed'
        },
        'h2, h3, h4, h5, h6': {
            fontFamily: 'body',
            fontWeight: 'bold',
            lineHeight: 'relaxed'
        },
    },

});
export const system = createSystem(defaultConfig, config);
