import { makeTheme } from 'dripsy'

/**
 * System themes
 * @todo Implement an interface with the actual values
 * @todo Fix autocompletion
 */

export enum Themes {
  light = 'light',
  dark = 'dark'
}

export const LightTheme = makeTheme({
  types: {
    strictVariants: false
  },
  colors: {
    $text: '#000',
    $filledText: '#fff',
    $lightText: '#888',
    $borderActive: '#cdd2da',
    $background: '#fff',
    $backgroundSecondary: '#ccc',
    $primary: '#b336be',
    $secondary: '#2a3287',
    $error: '#fca5a5',
    $success: '#0f0',
    $drawerBackground: '#b336be',
    $statusBarColor: '#b336be',
    $headerTint: '#fff',
    $linkColor: '#00f'
  },

  variants: {
    scroll: {
      backgroundColor: '$primary'
    },
    primary: {
      button: {
        container: {
          backgroundColor: '$primary'
        },
        text: {
          color: '$filledText'
        }
      }
    },
    secondary: {
      button: {
        container: {
          backgroundColor: '$secondary'
        },
        text: {
          color: '$filledText'
        }
      }
    },
    disabled: {
      button: {
        container: {
          backgroundColor: '#777'
        },
        text: {
          color: '$filledText'
        }
      }
    }
  }
})

export const DarkTheme = makeTheme({
  types: {
    strictVariants: false
  },
  colors: {
    $text: '#fff',
    $backgroundSecondary: '#16182b',
    $filledText: '#000',
    $lightText: '#ccc',
    $borderActive: '#cdd2da',
    $background: '#000',
    $primary: '#0f0',
    $secondary: '#00F',
    $error: '#f00',
    $success: '#0f0',
    $drawerBackground: '#000',
    $statusBarColor: '#000',
    $headerTint: '#fff',
    $linkColor: '#fff'
  },
  variants: {
    scroll: {
      backgroundColor: '$background'
    },
    primary: {
      button: {
        container: {
          backgroundColor: '$primary'
        },
        text: {
          color: '$filledText'
        }
      }
    },
    secondary: {
      button: {
        container: {
          backgroundColor: '$secondary'
        },
        text: {
          color: '$text'
        }
      }
    },
    disabled: {
      button: {
        container: {
          backgroundColor: '#2c2c2c'
        },
        text: {
          color: '#999'
        }
      }
    }
  }
})
