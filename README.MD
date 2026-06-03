
Known CVEs you can demo with these versions:

express 4.16.0 — pulls in vulnerable transitives (qs, mime, etc.)
lodash 4.17.4 — CVE-2019-10744 prototype pollution via _.merge / _.defaultsDeep
minimist 1.2.0 — CVE-2020-7598 prototype pollution via --__proto__.x=y
axios 0.18.0 — CVE-2020-28168 SSRF
jsonwebtoken 8.3.0 — CVE-2022-23529 / algorithm confusion issues

Run npm install then npm audit or npx snyk test / trivy fs . / osv-scanner — all should light up nicely.
