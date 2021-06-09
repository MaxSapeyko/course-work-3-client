import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, notification } from "antd";

import { getCommissariatList } from "../../../API/commissariat";
import { getCallUpListByComId } from "../../../API/callUp";
import BackBtn from "../../../components/BackToDirBtn/index.jsx";
import { NOTIFICATION_TYPE } from '../../../utils/consts';

import useStyles from "./style";

const Commissariat = () => {
  const classes = useStyles();

  const [commissariatList, setCommissariatList] = useState([
    {
      name: "",
      address: "",
      phoneNumber: "",
    },
  ]);
  const [modalProps, setModalProps] = useState({
    showModal: false,
    selectedListItem: 0,
  });
  const [callUpList, setCallUpList] = useState([
    {
      callUpDate: "",
      conscriptList: "",
    },
  ]);

  const callUpShow = (index) => {
    getCallUpListByComId(String(commissariatList[index].id))
      .then((res) => {
        setCallUpList(res.data);
      })
      .catch((error) => {
        notification[NOTIFICATION_TYPE.error]({
          message: 'Error',
          description: `Error ${error.message}`,
        });
      });
    setModalProps({ showModal: true, selectedListItem: index });
  };

  const byField = (field) => {
    return (a, b) => a[field] > b[field] ? 1 : -1;
  }

  const sortCommissariatList = (field) => {
    let copyCommissariatList = [...commissariatList];
    copyCommissariatList.sort(byField(field));
    setCommissariatList(copyCommissariatList);
  }

  useEffect(() => {
    getCommissariatList()
      .then((res) => {
        setCommissariatList(res.data);
      })
      .catch((error) => {
        notification[NOTIFICATION_TYPE.error]({
          message: 'Error',
          description: `Error ${error.message}`,
        });
      });
  }, []);

  return (
    <div className={classes.root}>
      <BackBtn />
      <h2>Список коміссаріатів</h2>
      <p>***Доступне сортування за назвою та адресою</p>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>
              <button
                onClick={() => sortCommissariatList('name')}
              >
                Назва
              </button>
            </th>
            <th>
              <button
                onClick={() => sortCommissariatList('address')}
              >
                Адреса
              </button>
            </th>
            <th>Телефон</th>
            <th>Список призовів</th>
          </tr>
        </thead>
        <tbody>
          {commissariatList.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <button onClick={() => callUpShow(index)}>Переглянути</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Список призовів"
        visible={modalProps.showModal}
        onCancel={() =>
          setModalProps({ showModal: false, selectedListItem: 0 })
        }
        footer=""
      >
        {callUpList.map((item, index) => (
          <div key={index}>
            <p>Дата призову: {item.callUpDate}</p>
            <p>Кількість призовників: {item.conscriptList.length}</p>
            <Link
              to={{
                pathname: "/conscripts",
                state: { state: "part", idArr: item.conscriptList },
              }}
            >
              Переглянути список призовників
            </Link>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default Commissariat;
