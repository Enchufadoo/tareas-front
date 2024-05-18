/**
 * Just a shortcut so that TS doesn't complain about fetching the value
 * @todo improve (similar problem as a in @see ThemeCollecion.tsx)
 */
export const getVariant = (theme: string, value: string): never => {
  /*// @ts-ignore */
  return 'variants.' + theme + '.' + value
}
