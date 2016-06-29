export default (store) => {
  return (next) => (action) => {
    const { promise, types, ...rest } = action
    
    if ( ! promise) {
      return next(action)
    }
    
    const [ REQUEST, SUCCESS, FAILURE ] = types 
    next({ ...rest, type: REQUEST })
    
    return promise.
      then(
        (body) => {
          return next({ 
            ...rest, 
            ...body, 
            receivedAt: Date.now(),
            type: SUCCESS 
          })
        },
        (err) => {
          if (err.errors) {
            return next({ 
              ...rest, 
              ...body,
              receivedAt: Date.now(), 
              type: FAILURE 
            })
          }
          
          return next({ 
            ...rest, 
            errors: [{
              status: 400,
              title: 'An error has occurred',
              detail: err.toString()
            }], 
            receivedAt: Date.now(),
            type: FAILURE 
          })
        }
      )
  }
}