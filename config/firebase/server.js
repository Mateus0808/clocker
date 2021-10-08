import firebaseServer from "firebase-admin"

const serviceAccount = require('../../serviceAccountKey.json')

const app = firebaseServer.apps.length 
  ? firebaseServer.app() 
  : firebaseServer.initializeApp({
    credential: firebaseServer.credential.cert({
      type: "service_account",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      project_id: "clocker-work-app",
      private_key_id: "d24b002edd57c9532fbfe4b9d8f8daf7559afcd4",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeXYTrd4fOVd3P\n4ikkAakIwOFkJvGnbDe0jafCwFbyBocVgN92HeBid+/3I1KIkeSU23eRj5JOA2Yj\no3uQ2hd867sSlFdcsdPfhdT+sGF7CBXRstyhr49gIzeYQHrqM+nyV6/wiNq+CN9n\nfrtBsnyyF2xa5YCZaKNaapNc4wvB6Bltgl82jStJnl2toYFRSDyJU+6CMZeamAnh\nUV22Q/6lpZDxlzToTOt/AetVfVD/HKwcebS16ZxKXIMIGGdUXxU1aDCXyV5gq3ys\n+E1ufQHcR3/R3MDRbCEiyK72Oe1nZzdp1vYYf+voq4IIkEqEALGHsoF9NslHTa1E\npkwPgV3ZAgMBAAECggEAB+OXQUajVolLAzXcQE2v3r6DC+Lvw1wd+0naO1arDiP6\nmzzgBOmQmb8pTlmtXR3Ncgfr0S3Ch03eivR0LZ9br66rk02d+4FlUVuApI5jUMZy\nlc9v88MD5LFkbdp6dQvQgfDR1CzxHqng/S4gRHHQieumS3Hm4d2HU7P+8s/hsE9c\nUawzKCPjMWQ0KRTK5/kfhDUNsN1jV4KSJXxETZTFZf/YphxdSLkSZSn+kcJ93nZA\npkK9xDFOaUgQ6clPUeOwPVjaIOqb8jXfIUpoPW33eQcCrE6t+DC3YYpSev0MTyiG\ndwDlgwjkz1aO+NKaR5RDlgvkoz/LWyQ/q7/q12TxXQKBgQDOiKQxKJTx88868i+9\nf5imr+2TKH/uaGqokrAFo4m2mT+TRGv+y9JYUCOvIKJprorLIJ8md2XuNx1obiHg\nAUCUqcZ3pFZ+5s6IAMu98bBneN7AnjsSRBKdhqTOxv3zOGSbNrU3CWd752mt94Vf\naB6LhxG0C6UrZvxxchtGRc8sXQKBgQDES31pXgGvlIxDvdHwnIn3pNt+qZJHhUNX\n2praMUOLrafnw2XfcCM2k/ifYSJeBD6YWjaSU64m+1AGox6wAW5vNprX9kXGxTaJ\nMb+QQ8vOl6xIxck4PJHAH/nsRmc38ASeoNfNI7m+9/S0Qnn2mhEQ3YUqvo5zyvsN\ncOlYw5O/rQKBgDLasFsuW+ZrmyYvhhPJ/ENm5D+s5DtG2KRjYhYxW3Jrr5zKZzEY\n7NUz/mVbysHs6V30zVtCYQXT6ljRbWPjywwP9b915ppeqJISaBiAD2ia+XZCP9dS\njabeBWyo0NT3mMYjJWHE3gdDRuFAJkYEtCi0/GXxzBywwg4JA7A89jM9AoGBAI/v\nqu5weFv/WTrzHdaJcsGcqTafsRuwpEjvi00jgpwRomVX6oOE/s0ug8iauVCnXB7r\nR8jUg4ciEPRM+FunMQtrxu9FLrUqN2syh32JuRCsNzDFl18dSuLOj7ypg1aJMVoA\nJz3NTI6z00O62yPwpULwrI1DXcGavayFdxYXk2ehAoGAeIEaOzuGxJUhke2063Hw\nHel+KxS3kNTosuPjo5p6TuUK+366nbkDgVNF89nabJOSiUd8YIKlqcLd1GIUI73G\noE5iXBfbvrEHoQLFaa8h7HbMfEWayRfLo171G72r8wQdBk6q4Vamfq1WkqaYC5tU\nuNV99cd0uY6cRxjmMq09gGw=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
      client_email: "firebase-adminsdk-o8m8w@clocker-work-app.iam.gserviceaccount.com",
      client_id: "105329730260504532139",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o8m8w%40clocker-work-app.iam.gserviceaccount.com"
    })
  })

//   FIREBASE_PROJECT_ID="clocker-work-app"
// FIREBASE_PRIVATE_KEY_ID="d24b002edd57c9532fbfe4b9d8f8daf7559afcd4",
// FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeXYTrd4fOVd3P\n4ikkAakIwOFkJvGnbDe0jafCwFbyBocVgN92HeBid+/3I1KIkeSU23eRj5JOA2Yj\no3uQ2hd867sSlFdcsdPfhdT+sGF7CBXRstyhr49gIzeYQHrqM+nyV6/wiNq+CN9n\nfrtBsnyyF2xa5YCZaKNaapNc4wvB6Bltgl82jStJnl2toYFRSDyJU+6CMZeamAnh\nUV22Q/6lpZDxlzToTOt/AetVfVD/HKwcebS16ZxKXIMIGGdUXxU1aDCXyV5gq3ys\n+E1ufQHcR3/R3MDRbCEiyK72Oe1nZzdp1vYYf+voq4IIkEqEALGHsoF9NslHTa1E\npkwPgV3ZAgMBAAECggEAB+OXQUajVolLAzXcQE2v3r6DC+Lvw1wd+0naO1arDiP6\nmzzgBOmQmb8pTlmtXR3Ncgfr0S3Ch03eivR0LZ9br66rk02d+4FlUVuApI5jUMZy\nlc9v88MD5LFkbdp6dQvQgfDR1CzxHqng/S4gRHHQieumS3Hm4d2HU7P+8s/hsE9c\nUawzKCPjMWQ0KRTK5/kfhDUNsN1jV4KSJXxETZTFZf/YphxdSLkSZSn+kcJ93nZA\npkK9xDFOaUgQ6clPUeOwPVjaIOqb8jXfIUpoPW33eQcCrE6t+DC3YYpSev0MTyiG\ndwDlgwjkz1aO+NKaR5RDlgvkoz/LWyQ/q7/q12TxXQKBgQDOiKQxKJTx88868i+9\nf5imr+2TKH/uaGqokrAFo4m2mT+TRGv+y9JYUCOvIKJprorLIJ8md2XuNx1obiHg\nAUCUqcZ3pFZ+5s6IAMu98bBneN7AnjsSRBKdhqTOxv3zOGSbNrU3CWd752mt94Vf\naB6LhxG0C6UrZvxxchtGRc8sXQKBgQDES31pXgGvlIxDvdHwnIn3pNt+qZJHhUNX\n2praMUOLrafnw2XfcCM2k/ifYSJeBD6YWjaSU64m+1AGox6wAW5vNprX9kXGxTaJ\nMb+QQ8vOl6xIxck4PJHAH/nsRmc38ASeoNfNI7m+9/S0Qnn2mhEQ3YUqvo5zyvsN\ncOlYw5O/rQKBgDLasFsuW+ZrmyYvhhPJ/ENm5D+s5DtG2KRjYhYxW3Jrr5zKZzEY\n7NUz/mVbysHs6V30zVtCYQXT6ljRbWPjywwP9b915ppeqJISaBiAD2ia+XZCP9dS\njabeBWyo0NT3mMYjJWHE3gdDRuFAJkYEtCi0/GXxzBywwg4JA7A89jM9AoGBAI/v\nqu5weFv/WTrzHdaJcsGcqTafsRuwpEjvi00jgpwRomVX6oOE/s0ug8iauVCnXB7r\nR8jUg4ciEPRM+FunMQtrxu9FLrUqN2syh32JuRCsNzDFl18dSuLOj7ypg1aJMVoA\nJz3NTI6z00O62yPwpULwrI1DXcGavayFdxYXk2ehAoGAeIEaOzuGxJUhke2063Hw\nHel+KxS3kNTosuPjo5p6TuUK+366nbkDgVNF89nabJOSiUd8YIKlqcLd1GIUI73G\noE5iXBfbvrEHoQLFaa8h7HbMfEWayRfLo171G72r8wQdBk6q4Vamfq1WkqaYC5tU\nuNV99cd0uY6cRxjmMq09gGw=\n-----END PRIVATE KEY-----\n",
// FIREBASE_CLIENT_EMAIL="firebase-adminsdk-o8m8w@clocker-work-app.iam.gserviceaccount.com",
// FIREBASE_CLIENT_ID="105329730260504532139",
// FIREBASE_CLIENT_CERT="https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o8m8w%40clocker-work-app.iam.gserviceaccount.com"


export { firebaseServer }