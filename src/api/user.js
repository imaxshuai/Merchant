export const login = (params)=>Http.post('merchant/auth/login', params);
export const me = (header)=>Http.post('merchant/me', {},header);
export const customer = (params, header)=>Http.get('contactInfo', params, header);
export const customerPay = (params, header)=>Http.post('transaction', params, header);