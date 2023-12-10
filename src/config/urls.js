<<<<<<< HEAD
export const API_BASE_URL = 'https://dai.tongdaihoidap.com/';
=======
export const API_BASE_URL = 'http://192.168.0.100:3000/';
>>>>>>> 4ebfed0138e2072d105232ec0a5f28432ee9cfeb

export const getApiUrl = endpoint => API_BASE_URL + endpoint;

export const Login_API = getApiUrl('v1/api/access/login');
export const SIGNUP_API = getApiUrl('v1/api/access/signup');
export const LOGOUT_API = getApiUrl('v1/api/access/signOut');
export const CATEGORY_API = getApiUrl('v1/api/category');
export const PRODUCT_API = getApiUrl('v1/api/product');
export const CHAT_API = getApiUrl('v1/api/chat');
export const ORDER_API = getApiUrl('v1/api/checkout');
export const SHOP_API = getApiUrl('v1/api/shop');
export const DISCOUNT_API = getApiUrl('v1/api/discount');
export const ADD_CART_API = getApiUrl('v1/api/cartv2');
export const USER_API = getApiUrl('v1/api/user');
export const DETAILSHOP_API = getApiUrl('v1/shop/getShop/');
export const OTP_API = getApiUrl('v1/api/access/verifyOtp');
export const NOTIFI_API = getApiUrl('v1/api/notification');
