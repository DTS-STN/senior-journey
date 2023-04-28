import crypto from 'crypto';

/**
 * An interface representing a Content-Security-Policy (CSP) configuration object.
 *
 * @property {string[]} [base-uri] - The policy for URLs that can be used in a document's `<base>` element.
 * @property {string[]} [child-src] - The policy for URLs for nested browsing contexts loading using elements such as `<frame>` and `<iframe>`.
 * @property {string[]} [connect-src] - The policy for URLs for XMLHttpRequest (AJAX), WebSocket or EventSource connections.
 * @property {string[]} [default-src] - The default policy for loading content such as JavaScript, Images, CSS, Fonts, AJAX requests, Frames, HTML5 Media.
 * @property {string[]} [font-src] - The policy for font files.
 * @property {string[]} [form-action] - The policy for URLs that can be used as the action of HTML form elements.
 * @property {string[]} [frame-ancestors] - The policy for URLs that can embed the current page as a frame or iframe.
 * @property {string[]} [frame-src] - The policy for URLs for nested browsing contexts loading using elements such as `<frame>` and `<iframe>`.
 * @property {string[]} [img-src] - The policy for URLs for loading images and videos.
 * @property {string[]} [manifest-src] - The policy for URLs that can be used to fetch web app manifests.
 * @property {string[]} [media-src] - The policy for URLs that can be used to load media using the HTML5 <audio> and <video> elements.
 * @property {string[]} [object-src] - The policy for URLs that can be used to load plugins using the HTML <object> element.
 * @property {string[]} [prefetch-src] - The policy for URLs that can be used to prefetch resources.
 * @property {string[]} [script-src] - The policy for URLs for JavaScript files.
 * @property {string[]} [style-src] - The policy for URLs for CSS stylesheets.
 * @property {string[]} [worker-src] - The policy for URLs that can be used to create web workers using the Web Worker API.
 * @property {string[]} [block-all-mixed-content] - The policy to block all mixed content requests on the page.
 * @property {string[]} [plugin-types] - The MIME types of plugins that can be embedded into a document using the HTML <object> element with its type attribute set to one of these MIME types.
 * @property {string[]} [navigate-to] - The policy for URLs that can be navigated to by clicking on links or submitting forms from the current page's browsing context.
 * @property {string[]} [require-sri-for] - Require Subresource Integrity (SRI) checks on scripts and stylesheets loaded from third-party hosts.
 * @property {string[]} [require-trusted-types-for] - Require Trusted Types checks on certain types of data in certain contexts.
 * @property {string[]} [sandbox] - A set of flags that define an isolated environment in which scripts can be run without access to the parent document's DOM tree or other resources.
 * @property {string[]} [script-src-attr] - A list of sources that are allowed to be used as values of nonces and hashes in script elements' attributes such as `integrity`.
 * @property {string[]} [script-src-elem] - A list of sources that are allowed to be used as values of nonces and hashes in script elements' contents such as inline scripts and event handlers.
 * @property {string[]} [style-src-attr] - A list of sources that are allowed to be used as values of nonces and hashes in style elements' attributes such as `integrity`.
 * @property {string[]} [style-src-elem] - A list of sources that are allowed to be used as values of nonces and hashes in style elements' contents such as inline styles.
 * @property {string[]} [trusted-types] - A list of Trusted Types policies that can be used to enforce a strong, consistent security model for web applications.
 * @property {string[]} [upgrade-insecure-requests] - A policy that instructs user agents to treat all of a site's insecure URLs (those served over HTTP) as though they have been replaced with secure URLs (those served over HTTPS).
 * @property {string[]} [report-to] - A URL where violation reports should be sent.
 * @property {string[]} [report-uri] - A URL where violation reports should be sent.
 * @property {boolean} [reportOnly] - A flag indicating whether the policy should be enforced (`false`) or just reported (`true`).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 */
export interface ContentSecurityPolicy {
  "base-uri"?: string[]
  "child-src"?: string[]
  "connect-src"?: string[]
  "default-src"?: string[]
  "font-src"?: string[]
  "form-action"?: string[]
  "frame-ancestors"?: string[]
  "frame-src"?: string[]
  "img-src"?: string[]
  "manifest-src"?: string[]
  "media-src"?: string[]
  "object-src"?: string[]
  "prefetch-src"?: string[]
  "script-src"?: string[]
  "style-src"?: string[]
  "worker-src"?: string[]
  "block-all-mixed-content"?: string[]
  "plugin-types"?: string[]
  "navigate-to"?: string[]
  "require-sri-for"?: string[]
  "require-trusted-types-for"?: string[]
  "sandbox"?: string[]
  "script-src-attr"?: string[]
  "script-src-elem"?: string[]
  "style-src-attr"?: string[]
  "style-src-elem"?: string[]
  "trusted-types"?: string[]
  "upgrade-insecure-requests"?: string[]
  "report-to"?: string[]
  "report-uri"?: string[]
  "reportOnly"?: boolean
}

/**
 * A function that generates a random nonce string.
 *
 * @returns {string} A random nonce string.
 */
export function generateRandomNonce(): string {
  return crypto.randomBytes(32).toString('hex')
}
