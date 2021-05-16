import api from './config';

export const getWorkById = (workId) => api.get(`/work/by-id/${workId}`);
