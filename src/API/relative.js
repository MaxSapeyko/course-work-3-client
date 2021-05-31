import api from './config';

export const getRelativeList = () => api.get(`/relative/`);

export const getRelativeById = (relativeId) => api.get(`/relative/by-id/${relativeId}`);

export const addNewRelative = (body) => api.post(`/relative/create-new`, { ...body });
