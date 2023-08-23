```
getBrowserInfo: function() {
      var Sys = {}
      var agent = navigator.userAgent
      var browser = {
        versions: function() {
          var u = navigator.userAgent
          return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
            iPad: u.indexOf('iPad') > -1
          }
        }()
      }
      if (browser.versions.android) {
        return 'Android|Android'
      } else if (browser.versions.iPhone) {
        return 'iPhone|iPhone'
      } else if (browser.versions.iPad) {
        return 'iPad|iPad'
      }
      var ua = agent.toLowerCase()
      var s;
      (s = ua.match(/qqbrowser\/([\d.]+)/)) ? Sys.qq = s[1] : (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/taobrowser\/([\d.]+)/)) ? Sys.tao = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0
      if (Sys.ie) {
        return 'IE' + s[1] + '|Microsoft'
      } else if (Sys.firefox) {
        return 'Firefox' + '|Mozilla'
      } else if (Sys.qq) {
        return 'QQ' + '|Tencent'
      } else if (Sys.tao) {
        return 'Tao' + '|Alibaba'
      } else if (Sys.chrome) {
        return 'Chrome' + '|Google'
      } else if (Sys.opera) {
        return 'Opera' + '|Opera'
      } else if (Sys.safari) {
        return 'Safari' + '|Apple'
      } else {
        return 'IE' + '|Micsoft'
      }
    }, getLanguage: function() {
      if (navigator.appName == 'Netscape') var language = navigator.language else var language = navigator.browserLanguage
      if (language.indexOf('en') > -1) return 'EN' else if (language.indexOf('nl') > -1) return 'NL' else if (language.indexOf('fr') > -1) return 'FR' else if (language.indexOf('de') > -1) return 'DE' else if (language.indexOf('ja') > -1) return 'JA' else if (language.indexOf('it') > -1) return 'IT' else if (language.indexOf('pt') > -1) return 'PT' else if (language.indexOf('es') > -1) return 'ES' else if (language.indexOf('sv') > -1) return 'SV' else if (language.indexOf('zh') > -1) return 'ZH' else return 'EN'
    }

export function isMobile() {
  const sUserAgent = navigator.userAgent.toLowerCase()
  const bIsIpad = /ipad/i.test(sUserAgent)
  const bIsIphoneOs = /iphone os/i.test(sUserAgent)
  const bIsMidp = /midp/i.test(sUserAgent)
  const bIsUc7 = /rv:1.2.3.4/i.test(sUserAgent)
  const bIsUc = /ucweb/i.test(sUserAgent)
  const bIsAndroid = /android/i.test(sUserAgent)
  const bIsCE = /windows ce/i.test(sUserAgent)
  const bIsWM = /windows mobile/i.test(sUserAgent)

  return bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM
}
```
