const
  defaults // `default-src 'self' https://${domain};`
    = [`'none'`]

, reports // `reports-src 'self' https://${domain};`
    = Array.from (defaults)

, frames // `frame-src 'self' https://${domain};`
    = Array.from (defaults)

, connects // `connect-src 'self' https://${domain};`
    = Array.from (defaults)

, images // `image-src 'self' data: https://cdn.example.com`
    = Array.from (defaults)

, styles // `style-src 'self' 'unsafe-inline' https://cdn.example.com`
    = Array.from (defaults)

, scripts // Script Nonce for inline <script>
  // https://csp.withgoogle.com/docs/strict-csp.html
  // `scripts-src 'self' 'nonce-${nonce} https://cdn.example.com`
    = Array.from (defaults)

, policies
    = [
      `report-uri ${ reports.join ` ` };`
    , `default-src ${ defaults.join ` ` };`
    , `frame-src ${ frames.join ` ` };`
    , `connect-src ${ connects.join ` ` };`
    , `img-src ${ images.join ` ` };`
    , `style-src ${ styles.join ` ` };`
    , `script-src ${ scripts.join ` ` };`
    ]


module.exports = options =>

  async (context, next) => {

    await next ()

    context.set
      ( 'Content-Security-Policy', policies.join ` ` )
  }
