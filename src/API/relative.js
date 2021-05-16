import api from './config';

export const getRelativeById = (relativeId) => api.get(`/relative/by-id/${relativeId}`);
