export const API_BASE_URL = 'https://49a2-116-96-44-199.ngrok-free.app/';

export const getApiUrl = endpoint => API_BASE_URL + endpoint;

export const Login_API = getApiUrl('v1/api/access/login');
export const SIGNUP_API = getApiUrl('v1/api/access/signup');
export const LOGOUT_API = getApiUrl('v1/api/access/signOut');
export const CATEGORY_API = getApiUrl(' v1/api/category');
export const PRODUCT_API = getApiUrl('v1/api/product');
export const CHAT_API = getApiUrl('v1/api/chat');
export const ORDER_API = getApiUrl('v1/api/checkout');
export const SHOP_API = getApiUrl('v1/api/shop');
export const DISCOUNT_API = getApiUrl('v1/api/discount');
export const ADD_CART_API = getApiUrl('v1/api/cartv2');
export const USER_API = getApiUrl('v1/api/user');
export const DETAILSHOP_API = getApiUrl('v1/shop/getShop/');
