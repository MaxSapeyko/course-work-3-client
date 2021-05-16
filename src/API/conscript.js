import api from './config';

export const getConscriptList = () => api.get('/conscript');

export const getConscriptListByIdArr = (conscriptId) => api.post('/conscript/by-idArr', {
  conscriptId,
});

export const addNewConscript = (file) => api.post('/conscript/add', file)
