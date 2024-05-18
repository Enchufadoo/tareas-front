/**
 *
 * Stolen from
 * https://gist.github.com/DavidWells/ea3e43886534ff7c3efb6d389766e588
 */
export function removeAccessTokenFromUrl() {
  const { history, location } = window
  const { search } = location

  if (
    search &&
    search.indexOf('token') !== -1 &&
    history &&
    history.replaceState
  ) {
    const cleanSearch = search
      .replace(/(\&|\?)token[^\&]*/g, '')
      .replace(/^&/, '?')

    const cleanURL = location.toString().replace(search, cleanSearch)
    history.replaceState({}, '', cleanURL)
  }
}
