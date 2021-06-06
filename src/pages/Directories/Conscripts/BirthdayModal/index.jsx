import React, { useState } from 'react';
import { Modal, DatePicker, notification } from 'antd';

import { NOTIFICATION_TYPE } from '../../../../utils/consts';
import { getSortedByBirthday } from '../../../../API/conscript';

const { RangePicker } = DatePicker;

const BirthdayModal = ({ isVisible, setVisible, setConscriptList }) => {
  const [dateInterval, setDateInterval] = useState([]);

  const handleOk = () => {
    console.log(dateInterval);
    if (dateInterval.length === 2) {
      getSortedByBirthday(dateInterval[0], dateInterval[1]).then((res) => {
        setConscriptList(res.data);
        setDateInterval([]);
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
      <p>Оберіть проміжок, по якому буде виконано сортування</p>
      
      <RangePicker format={'YYYY-MM-DD'} onChange={(dates, dateStrings) => setDateInterval(dateStrings)}/>
    </Modal>
  );
};

export default BirthdayModal;
