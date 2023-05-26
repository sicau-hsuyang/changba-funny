export function getQuery(name: string, url?: string): string {
  name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]')
  if (!url) {
    url = window.location.href
  }
  const _regexS = '[\\?&]' + name + '=([^&#]*)'
  const _regex = new RegExp(_regexS)
  const _results = _regex.exec(url)
  return _results == null ? '' : decodeURIComponent(_results[1].replace(/\+/g, ' '))
}
