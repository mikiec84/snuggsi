// Content Negotiation
//
//   References:
//     WHATWG URL Spec - https://url.spec.whatwg.org
//     Wikipedia - https://en.wikipedia.org/wiki/Content_negotiation
//     MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
//     HTTP Accept Header - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1

const
  root   = '/'
, suffix = 'min'
, name   = 'snuggsi'
, send   = require ('koa-send')


module.exports = async (context, next) =>
{
  const
    accept = // HTTP 1.1 `Accept` Header
             // - https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
      context.get ('Accept')

  , encoding = // HTTP1.1 `Accept-Encoding` Header
               // http://tools.ietf.org/html/7231#section-5.3.4
      context.get ('Accept-Encoding')

//, path =
//    // WHATWG URL path Spec
//    //   URL path - https://url.spec.whatwg.org/#concept-url-path
//    //   pathname - https://url.spec.whatwg.org/#dom-url-pathname
//    context.path

//, library =
//    // `/` root
//    // or `/snuggsi` in URL path
//    /^(\/|\/snuggsi.+)$/
//      .test (path)

//, ecmascript = // (evergreen) Accept: #( media-range )`
//    /^\*\/\*$/ // Chrome, Edge, Firefox, Safari, iOS Safari, Android
//      // type    - *
//      // subtype - *
//      // example - `*/*`
//      .test (accept)

//, javascript =
//    // (classic) Accept: #( media-range )`
//    /application\/javascript/ // MSIE 6.0-11.0
//      // type    - application
//      // subtype - javascript
//      // example - `application/javascript`
//      .test (accept)

//  || // , Or with accept-params

//    // (classic) Accept: #( media-range [ accept-params ] )`
//    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation/List_of_default_Accept_values
//    /\*\/\*;q=\d\.\d$/ // MSIE 6.0-11.0
//      // type    - *
//      // subtype - *
//      // qfactor - q=0.8
//      // example - `*/*;q=0.8`
//      .test (accept)

//, compress
//    = ecmascript || javascript

  , extension = 'js'
//    ecmascript // default
//      ? 'es'   // Ecmascript extension
//      : 'js'   // Javascript extension

  , bundle =
      [ name, suffix, extension ]
        .filter (Boolean)
        .join `.`

  , resource = bundle
//    (path === root)
//      ? bundle // default resource
//      : path   // requested resource

  , options = {
      gzip   : false
    , brotli : false
    , root   : './dist'
    }

  , settings =
      [context, resource, options]

//console.log ('\n\npath', path)
//console.log ('compress', compress)
//console.log ('bundle', bundle)
//console.log ('resource', resource)

//void


  console.warn (context.request.headers)
  console.log ('what', await send ( ... settings ), accept, encoding)

//(library && compress && await send ( ... settings ))

//|| await next ()

//compress
//  && (context.type = 'application/ecmascript')

//console.warn ('Content Type', compress, context.type)
}
