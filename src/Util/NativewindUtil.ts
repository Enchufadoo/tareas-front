import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config.js'

let theme = false

export { theme }

/**
 * A helper method to join nativewind classes, I think v3 will
 * have a better way to deal with this
 */
export const jc = (classes: string[]) => {
  return classes.join(' ')
}

/**
 * Gets full Nativewind config at runtime
 * https://tailwindcss.com/docs/configuration#referencing-in-java-script
 */
export const getNativewindConfig = () => {
  return resolveConfig(tailwindConfig)
}
