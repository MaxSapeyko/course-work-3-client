import api from './config';

export const getStudyById = (studyId) => api.get(`/study/by-id/${studyId}`);

export const addNewStudyPlace = (body) => api.post(`/study/create-new`, { ...body });
