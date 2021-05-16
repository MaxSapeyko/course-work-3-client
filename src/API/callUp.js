import api from './config';

export const getCallUpList = () => api.get('/callup');

export const getCallUpListByComId = (comId) => api.get(`/callup/by-com-id/${comId}`);

export const createCallUp = (body) => api.post('/callup/add', {
  ...body,
});
