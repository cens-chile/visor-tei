import { usuarios } from "./data.js";

export const fakePostLogin = (endpoint, payload) => {
    return new Promise((resolve, reject) => {
      // Simula latencia
      setTimeout(() => {
        if (endpoint !== "/api/token/") {
          return reject({
            response: { status: 404 }
          });
        }
  
        const user = usuarios.find(
          u => u.username === payload.username && u.password === payload.password
        );
  
        if (!user) {
          return reject({
            response: { status: 401 }
          });
        }
  
        // Simula token y decodificación
        const fakeAccessToken = btoa(
          JSON.stringify({
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            exp: Date.now() + 60 * 60 * 1000 // +1 hora
          })
        );
  
        resolve({
          data: {
            access: fakeAccessToken
          }
        });
      }, 500);
    });
};


/* export const parseJwt = (token) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
} */

export const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const json = atob(base64);
        return JSON.parse(json);
    } catch (e) {
        console.error('Error parsing JWT:', e);
        return null;
    }
};

// Borrar cuando se implemente el backend
export const createFakeJwt = (payload) => {
    const header = { alg: "HS256", typ: "JWT" };
    const base64 = (obj) =>
      btoa(JSON.stringify(obj))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
  
    return `${base64(header)}.${base64(payload)}.signature`;
};
