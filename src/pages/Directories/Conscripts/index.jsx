import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button, notification } from 'antd';
import { useLocation } from 'react-router';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  SwapOutlined,
} from '@ant-design/icons';

import {
  getConscriptList,
  getConscriptListByIdArr,
  delConscriptById,
} from '../../../API/conscript';
import { getRelativeById } from '../../../API/relative';
import { getWorkById } from '../../../API/work';
import { getStudyById } from '../../../API/study';
import { updateCallUpConscriptList } from '../../../API/callUp';
import { AppContext } from '../../../Context';
import BackBtn from '../../../components/BackToDirBtn/index.jsx';
import BirthdayModal from './BirthdayModal';
import LastnameModal from './LastnameModal';
import { NOTIFICATION_TYPE } from '../../../utils/consts';

import { useStyles, showMoreStyles } from './style';

const Conscripts = () => {
  const classes = useStyles();
  const showMoreClasses = showMoreStyles();
  const location = useLocation();
  const { auth } = useContext(AppContext);

  const [conscriptList, setConscriptList] = useState([
    {
      name: '',
      surname: '',
      lastname: '',
    },
  ]);
  const [isVisibleBithdayModal, setIsVisibleBithdayModal] = useState(false);
  const [isVisibleLastnameModal, setIsVisibleLastnameModal] = useState(false);
  const [sortStatus, setSortStatus] = useState(false);

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

  const deleteCons = (id, index) => {
    delConscriptById(id).then(() => {
      updateCallUpConscriptList(conscriptList[index].callUpId, id);

      const copyConscriptList = [...conscriptList];
      copyConscriptList.splice(index, 1);

      setConscriptList(copyConscriptList);
    });
  };

  const sortConscriptList = async (field) => {
    let copyConscriptList = [...conscriptList];

    setSortStatus((prev) => !prev);

    if (!sortStatus) {
      await copyConscriptList.sort((a, b) =>
        a[field].toLowerCase() > b[field].toLowerCase()
          ? 1
          : b[field].toLowerCase() > a[field].toLowerCase()
          ? -1
          : 0
      );
    }

    if (sortStatus) {
      await copyConscriptList.sort((a, b) =>
        a[field].toLowerCase() < b[field].toLowerCase()
          ? 1
          : b[field].toLowerCase() < a[field].toLowerCase()
          ? -1
          : 0
      );
    }

    setConscriptList(copyConscriptList);
  };

  const delFilters = () => {
    getConscriptList()
      .then((res) => {
        setConscriptList(res.data);
      })
      .catch((error) => {
        notification[NOTIFICATION_TYPE.error]({
          message: 'Error',
          description: `Error ${error.message}`,
        });
      });
  };

  useEffect(() => {
    if (location.state?.state === 'part') {
      getConscriptListByIdArr(location.state.idArr)
        .then((res) => {
          setConscriptList(res.data);
        })
        .catch((error) => {
          notification[NOTIFICATION_TYPE.error]({
            message: 'Error',
            description: `Error ${error.message}`,
          });
        });
    } else {
      getConscriptList()
        .then((res) => {
          setConscriptList(res.data);
        })
        .catch((error) => {
          notification[NOTIFICATION_TYPE.error]({
            message: 'Error',
            description: `Error ${error.message}`,
          });
        });
    }
  }, [location.state?.state, location.state?.idArr]);

  return (
    <div className={classes.root}>
      <BackBtn />
      <h2>Список призовників</h2>
      <Button onClick={() => delFilters()} type='primary'>
        Відмінити фільтрацію
      </Button>
      <p>***Доступне сортування за ПІБ та датою народження</p>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>
              <div className='th_block'>
                <Button onClick={() => setIsVisibleLastnameModal(true)}>
                  Прізвище
                </Button>
                <Button
                  onClick={() => sortConscriptList('lastname')}
                  type='primary'
                  icon={[<SortAscendingOutlined />, <SortDescendingOutlined />]}
                  style={{ width: '70px' }}
                />
              </div>
            </th>
            <th>
              <div className='th_block'>
                <p>Ім'я</p>
                <Button
                  onClick={() => sortConscriptList('name')}
                  type='primary'
                  icon={[<SortAscendingOutlined />, <SortDescendingOutlined />]}
                  style={{ width: '70px' }}
                />
              </div>
            </th>
            <th>
              <div className='th_block'>
                <p>По батькові</p>
                <Button
                  onClick={() => sortConscriptList('surname')}
                  type='primary'
                  icon={[<SortAscendingOutlined />, <SortDescendingOutlined />]}
                  style={{ width: '70px' }}
                />
              </div>
            </th>
            <th>
              <div className='th_block th_block-sex'>
                <p>Стать</p>
              </div>
            </th>
            <th>
              <div className='th_block'>
                <p>Місце народження</p>
              </div>
            </th>
            <th>
              <div className='th_block'>
                <p>Дата народження</p>
                <Button
                  onClick={() => setIsVisibleBithdayModal(true)}
                  type='primary'
                  icon={<SwapOutlined />}
                />
              </div>
            </th>
            <th>
              <div className='th_block'>
                <p>Номер телефону</p>
              </div>
            </th>
            <th>
              <div className='th_block th_block-photo'>
                <p>Фото</p>
              </div>
            </th>
            <th>
              <div className='th_block th_block-more'>
                <p>Детально</p>
              </div>
            </th>
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
                    setModalProps({
                      showModal: true,
                      selectedListItem: index,
                    })
                  }
                >
                  Показати
                </button>
              </td>
              {auth && (
                <td>
                  <button onClick={() => deleteCons(item.id, index)}>
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
        className={showMoreClasses.root}
        footer={null}
      >
        <p>
          {conscriptList[modalProps.selectedListItem].lastname}{' '}
          {conscriptList[modalProps.selectedListItem].name}{' '}
          {conscriptList[modalProps.selectedListItem].surname}
        </p>
        <div>
          <p className='title'>Родич</p>
          <button
            className='show-btn'
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
          <p className='title'>Робота</p>
          <button
            className='show-btn'
            onClick={() =>
              getWork(conscriptList[modalProps.selectedListItem].workId)
            }
          >
            Показати
          </button>
          {work.showWork && (
            <div>
              <p>Назва організації: {work.organizationName}</p>
              <p>Адреса організації: {work.address}</p>
            </div>
          )}
        </div>
        <div>
          <p className='title'>Освіта</p>
          <button
            className='show-btn'
            onClick={() =>
              getStudy(conscriptList[modalProps.selectedListItem].studyId)
            }
          >
            Показати
          </button>
          {study.showStudy && (
            <div>
              <p>Назва навчального закладу: {study.organizationName}</p>
              <p>Адреса закладу: {work.address}</p>
            </div>
          )}
        </div>
      </Modal>

      <BirthdayModal
        isVisible={isVisibleBithdayModal}
        setVisible={setIsVisibleBithdayModal}
        setConscriptList={setConscriptList}
      />

      <LastnameModal
        isVisible={isVisibleLastnameModal}
        setVisible={setIsVisibleLastnameModal}
        setConscriptList={setConscriptList}
      />
    </div>
  );
};

export default Conscripts;
