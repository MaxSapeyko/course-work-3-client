import api from './config';

export const getStudyById = (studyId) => api.get(`/study/by-id/${studyId}`);
