const url_backend = "http://localhost:3000/api";

export const endpoints = {
  auth: {
    login: `${url_backend}/v1/auth/login`,
    register: `${url_backend}/v1/auth/register`,
    fetchProfile: `${url_backend}/v1/auth/profile`,
  },
  admin: {
    fetchClients: `${url_backend}/v1/admin/users`,
  },
  products: {
    createProduct: `${url_backend}/v1/admin/products`,
    fetchProductsByAdmin: `${url_backend}/v1/admin/products`,
    fetchProduct: `${url_backend}/v1/products/{productId}`,
    changeProductByAdmin: `${url_backend}/v1/admin/products/{productId}`,
    replaceImageByAdmin: `${url_backend}/v1/admin/products/replace-image/{productId}`,
    fetchProducts: `${url_backend}/v1/products`,
  },
  orders: {
    fetchOrders: `${url_backend}/v1/orders`,
    createOrder: `${url_backend}/v1/orders`,
    fetchOrderByAdmin: `${url_backend}/v1/admin/orders`,
    fetchOrderByAdminCsv: `${url_backend}/v1/admin/orders/csv`,
  },
};
