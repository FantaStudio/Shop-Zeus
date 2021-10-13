const url_backend = "http://localhost:3000/api";

export const endpoints = {
  auth: {
    login: `${url_backend}/v1/auth/login`,
    register: `${url_backend}/v1/auth/register`,
    fetchProfile: `${url_backend}/v1/auth/profile`,
  },
};
