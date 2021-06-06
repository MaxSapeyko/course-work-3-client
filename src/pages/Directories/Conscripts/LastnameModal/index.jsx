import React, { useState } from 'react';
import { Modal, Input, notification } from 'antd';

import { NOTIFICATION_TYPE } from '../../../../utils/consts';
import { getSortedByLastname } from '../../../../API/conscript';

const LastnameModal = ({ isVisible, setVisible, setConscriptList }) => {
  const [inputStr, setInputStr] = useState('');

  const handleOk = () => {
    if (inputStr.length > 0) {
      getSortedByLastname(inputStr).then((res) => {
        if (res.data.length > 0){
        setConscriptList(res.data);
        } else {
          notification[NOTIFICATION_TYPE.warning]({
            message: 'Warning',
            description: `Призовників з введеним прізвищем не знайдено`,
          });
        }
        setInputStr('');
        setVisible(false);
      }).catch(error => {
        notification[NOTIFICATION_TYPE.error]({
          message: 'Error',
          description: `Error ${error.message}`,
        });
      })
    }
  };

  return (
    <Modal
      visible={isVisible}
      onCancel={() => setVisible(false)}
      onOk={() => handleOk()}
    >
      <p>Введіть прізвище по якому буде відсортовано список призовників</p>
      <Input onChange={(event) => setInputStr(event.target.value)}/>
    </Modal>
  );
};

export default LastnameModal;
