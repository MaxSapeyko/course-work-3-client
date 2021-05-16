import api from './config';

export const getCommissariatList = () => api.get('/commissariat');

export const createNewCommissariat = (body) => api.post('/commissariat/add', {
  ...body,
})
