export function getCookie (name: string): string | null {
  const matches = document.cookie.match(
    // eslint-disable-next-line
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  )
  return (matches != null) ? decodeURIComponent(matches[1]) : null
}

export function setCookie (name: any, value: any, props: any): void {
  props = props != null || {}
  let exp: any = props.expires
  if (typeof exp === 'number') {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }
  if (exp?.toUTCString != null) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

export function deleteCookie (name: string): void {
  setCookie(name, null, { expires: -1 })
}
