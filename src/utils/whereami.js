export const isBrowser = function () {
  return ! isServer()
}

export const isServer = function() {
  return ! (typeof window !== 'undefined' && window.document);
}
