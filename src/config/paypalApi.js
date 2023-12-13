const base64 = require('base-64');

const credentials = {
  baseUrl: 'https://api-m.sandbox.paypal.com',
  clientId:
    'AZL-NWQLklu-PWxMzDOwxUgjldttRIqnikzlNoRvvB8N4juknXnm-5g-gYtefrlhgUSrXEKbbImy-PXo',
  secretKey:
    'EHUH6Ys-vZe3MVSzIMXHFBQpdRj2GszJkbAcV261gt4aidJt7fEkcw4XGfAivCEJiHA9bG8IRwaTbSmB',
};

const orderDetail = {
  intent: 'CAPTURE',
  purchase_units: [
    {
      items: [
        {
          name: 'T-Shirt',
          description: 'Green XL',
          quantity: '1',
          unit_amount: {
            currency_code: 'USD',
            value: '200.00',
          },
        },
        {
          name: 'T-Shirt',
          description: 'Green XL',
          quantity: '1',
          unit_amount: {
            currency_code: 'USD',
            value: '200.00',
          },
        },
      ],
      amount: {
        currency_code: 'USD',
        value: '400.00',
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: '400.00',
          },
        },
      },
    },
  ],
  application_context: {
    return_url: 'https://example.com/return',
    cancel_url: 'https://example.com/cancel',
  },
};

const generateToken = async () => {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${base64.encode(
      `${credentials.clientId}:${credentials.secretKey}`,
    )}`,
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials',
  };

  try {
    const response = await fetch(
      `${credentials.baseUrl}/v1/oauth2/token`,
      requestOptions,
    );
    const {access_token} = await response.json();
    return access_token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

const createOrder = async (token = '') => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(orderDetail),
  };

  try {
    const response = await fetch(
      `${credentials.baseUrl}/v2/checkout/orders`,
      requestOptions,
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const capturePayment = async (id, token = '') => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
  };

  try {
    const response = await fetch(
      `${credentials.baseUrl}/v2/checkout/orders/${id}/capture`,
      requestOptions,
    );
    const res = await response.json();
    console.log('Capture payment result:', res);
    return res;
  } catch (error) {
    console.error('Error capturing payment:', error);
    throw error;
  }
};

export default {
  generateToken,
  createOrder,
  capturePayment,
};
