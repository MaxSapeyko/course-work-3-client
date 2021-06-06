import api from './config';

export const getConscriptList = () => api.get('/conscript');

export const getSortedByBirthday = (start, end) =>
  api.get(`/conscript/sort-by-birthday/${start}/${end}`);

export const getSortedByLastname = (inputStr) =>
  api.get(`/conscript/sort-by-lastname/${inputStr}`);

export const getConscriptListByIdArr = (conscriptId) =>
  api.post('/conscript/by-idArr', {
    conscriptId,
  });

export const addNewConscript = (file) => api.post('/conscript/add', file);

export const updateConscriptCallUpId = (id, callUpId) =>
  api.patch(`/conscript/update-call-up-id/${id}/${callUpId}`);

export const delConscriptById = (conscriptId) =>
  api.delete(`/conscript/delete-by-id${conscriptId}`);
