import React, { useEffect, useState, useContext } from 'react';
import { Modal } from 'antd';
import { useLocation } from 'react-router';

import {
  getConscriptList,
  getConscriptListByIdArr,
  delConscriptById,
} from '../../../API/conscript';
import { getRelativeById } from '../../../API/relative';
import { getWorkById } from '../../../API/work';
import { getStudyById } from '../../../API/study';
import BackBtn from '../../../components/BackToDirBtn/index.jsx';
import { AppContext } from '../../../Context';

import useStyles from './style';

const Conscripts = () => {
  const classes = useStyles();
  const location = useLocation();
  const { auth } = useContext(AppContext);

  const [conscriptList, setConscriptList] = useState([
    {
      name: '',
      surname: '',
      lastname: '',
    },
  ]);
  const [modalProps, setModalProps] = useState({
    showModal: false,
    selectedListItem: 0,
  });
  const [relative, setRelative] = useState({
    showRelative: false,
    name: '',
    surname: '',
    lastname: '',
    homeAddress: '',
    phoneNumber: '',
  });
  const [work, setWork] = useState({
    showWork: false,
    organizationName: '',
    post: '',
    admissionDate: '',
    releaseDate: '',
    address: '',
  });
  const [study, setStudy] = useState({
    showStudy: false,
    organizationName: '',
    faculty: '',
    course: '',
    admissionDate: '',
    releaseDate: '',
    address: '',
  });

  const getRelative = (relativeId) => {
    getRelativeById(relativeId).then((res) => {
      setRelative((prev) => ({
        showRelative: !prev.showRelative,
        name: res.data.name,
        surname: res.data.surname,
        lastname: res.data.lastname,
        homeAddress: res.data.homeAddress,
        phoneNumber: res.data.phoneNumber,
      }));
    });
  };

  const getWork = (workId) => {
    getWorkById(workId).then((res) => {
      setWork((prev) => ({
        showWork: !prev.showWork,
        organizationName: res.data.organizationName,
        post: res.data.post,
        admissionDate: res.data.admissionDate,
        releaseDate: res.data.releaseDate,
        address: res.data.address,
      }));
    });
  };

  const getStudy = (studyId) => {
    getStudyById(studyId).then((res) => {
      setStudy((prev) => ({
        showStudy: !prev.showStudy,
        organizationName: res.data.organizationName,
        faculty: res.data.faculty,
        course: res.data.course,
        admissionDate: res.data.admissionDate,
        releaseDate: res.data.releaseDate,
        address: res.data.address,
      }));
    });
  };

  const byField = (field) => {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  };

  const sortConscriptList = (field) => {
    let copyConscriptList = [...conscriptList];
    copyConscriptList.sort(byField(field));
    setConscriptList(copyConscriptList);
  };

  useEffect(() => {
    if (location.state?.state === 'part') {
      getConscriptListByIdArr(location.state.idArr)
        .then((res) => {
          setConscriptList(res.data);
        })
        .catch((error) => console.log('Error', error));
    } else {
      getConscriptList()
        .then((res) => {
          setConscriptList(res.data);
        })
        .catch((error) => console.log('Error', error));
    }
  }, [location.state?.state, location.state?.idArr, conscriptList]);

  return (
    <div className={classes.root}>
      <BackBtn />
      <h2>Список призовників</h2>
      <p>***Доступне сортування за ПІБ та датою народження</p>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>
              <button onClick={() => sortConscriptList('lastname')}>
                Прізвище
              </button>
            </th>
            <th>
              <button onClick={() => sortConscriptList('name')}>Ім'я</button>
            </th>
            <th>
              <button onClick={() => sortConscriptList('surname')}>
                По батькові
              </button>
            </th>
            <th>Стать</th>
            <th>Місце народження</th>
            <th>
              <button onClick={() => sortConscriptList('birthday')}>
                Дата народження
              </button>
            </th>
            <th>Номер телефону</th>
            <th>Фото</th>
            <th>Детально</th>
            {auth && <th />}
          </tr>
        </thead>
        <tbody>
          {conscriptList?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.lastname}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.sex}</td>
              <td>{item.placeOfBirth}</td>
              <td>{item.birthday}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <img src={process.env.REACT_APP_API_URL + item.photo} alt='' />
              </td>
              <td>
                <button
                  onClick={() =>
                    setModalProps({ showModal: true, selectedListItem: index })
                  }
                >
                  Показати
                </button>
              </td>
              {auth && (
                <td>
                  <button onClick={() => delConscriptById(item.id)}>
                    Видалити
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title='Детальна інформація'
        visible={modalProps.showModal}
        onCancel={() =>
          setModalProps({ showModal: false, selectedListItem: 0 })
        }
        footer=''
      >
        <p>
          {conscriptList[modalProps.selectedListItem].lastname}{' '}
          {conscriptList[modalProps.selectedListItem].name}{' '}
          {conscriptList[modalProps.selectedListItem].surname}
        </p>
        <div>
          <p>Родич</p>
          <button
            onClick={() =>
              getRelative(conscriptList[modalProps.selectedListItem].relativeId)
            }
          >
            Показати
          </button>
          {relative.showRelative && (
            <div>
              <p>Прізвище: {relative.lastname}</p>
              <p>Ім'я: {relative.name}</p>
              <p>По батькові: {relative.surname}</p>
              <p>Домашня адреса: {relative.homeAddress}</p>
              <p>Телефон: {relative.phoneNumber}</p>
            </div>
          )}
        </div>
        <div>
          <p>Робота</p>
          <button
            onClick={() =>
              getWork(conscriptList[modalProps.selectedListItem].workId)
            }
          >
            Показати
          </button>
          {work.showWork && (
            <div>
              <p>Назва організації: {work.organizationName}</p>
              <p>Посада: {work.post}</p>
              <p>Дата прийому на роботу: {work.admissionDate}</p>
              <p>Дата звільнення: {work.releaseDate}</p>
              <p>Адреса організації: {work.address}</p>
            </div>
          )}
        </div>
        <div>
          <p>Освіта</p>
          <button
            onClick={() =>
              getStudy(conscriptList[modalProps.selectedListItem].studyId)
            }
          >
            Показати
          </button>
          {study.showStudy && (
            <div>
              <p>Назва організації: {study.organizationName}</p>
              <p>Факультет: {study.faculty}</p>
              <p>Курс: {study.course}</p>
              <p>Дата вступу: {work.admissionDate}</p>
              <p>Дата випуску: {work.releaseDate}</p>
              <p>Адреса закладу: {work.address}</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Conscripts;
