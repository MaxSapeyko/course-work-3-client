import api from './config';

export const getWorkById = (workId) => api.get(`/work/by-id/${workId}`);

export const addNewWorkPlace = (body) => api.post(`/work/create-new`, { ...body });
