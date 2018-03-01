const
  METHODS = Array
    .from ( require ('http').METHODS )
    .map  ( method => method.toLowerCase () )


module.exports = (path) => {
  const
    resource = new class extends
      require (`${path}/index.es`) { }

  for (method of METHODS)
    !!!  (method in resource)
      && (resource [method] =

        function (method) {
          return (context, next) => {
            console.warn
              (method.toUpperCase (), 'is being called from base Resource')
          }
        } (method))


  return function (context, next) {
    const
    { method } = context
    , action   = resource [method.toLowerCase ()]

    action (context, next)
    resource.subscribe ()
  }
}
