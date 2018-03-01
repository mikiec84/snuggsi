module.exports = (uri, middleware) => {

  const
    tokens =
      uri.match (/[^{]+(?=})/g)

  , expression = new RegExp
      (uri.replace (/{\w+}/g, '([A-Za-z0-9\-\_]+)'))
  
  , test = expression.test
      .bind (expression)

  , parameterized = (context, params = {}) =>
      ('params' in context || (context.params = {}))
        && []
          .splice
          .call (context.path.match (expression), 1) // remove 1st
          .map  ((value, index) => context.params [tokens [index]] = value)

        && context


  return async (context, next) =>
    !!! test (context.path)
      ? await next (context)
      : await middleware (parameterized (context), next)
}