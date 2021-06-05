import React, { useEffect, useState } from 'react';
import { Form, notification, Button, Modal, DatePicker, Radio, Checkbox } from 'antd';
import { useHistory, withRouter } from 'react-router';

import { getCommissariatList } from '../../API/commissariat';
import { getConscriptList, updateConscriptCallUpId } from '../../API/conscript';
import { createCallUp } from '../../API/callUp';
import { NOTIFICATION_TYPE } from '../../utils/consts';

import {useStyles, useModalStyles} from './style';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: "Обов'язкове поле!",
};

const CreateCallUp = () => {
  const classes = useStyles();
  const modalClasses = useModalStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    callUpDate:
      new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getDate(),
    conscriptList: [],
    commissariatId: '',
  });

  const [data, setData] = useState({
    conscriptList: [],
    commissariatList: [],
  });

  const [showConscriptModal, setShowConscriptModal] = useState(false);
  const [showCommissariatModal, setShowCommissariatModal] = useState(false);

  const setConscript = (conscriptId) => {
    const copyFormData = { ...formData };
    const index = copyFormData.conscriptList.indexOf(conscriptId);

    if (index === -1) {
      copyFormData.conscriptList.push(conscriptId);
    } else {
      copyFormData.conscriptList.splice(index, 1);
    }

    setFormData(copyFormData);
  };

  const updateCallUpIds = async (conscriptList, callUpId) => {
    await conscriptList.forEach((item) => {
      updateConscriptCallUpId(item, callUpId);
    });

    history.push('/directories');
  };

  const submit = () => {
    createCallUp(formData)
      .then(async (res) => {
        await updateCallUpIds(formData.conscriptList, res.data.id);
        notification[NOTIFICATION_TYPE.success]({
          message: 'Success',
          description: 'Призов сформовано.',
        });
      })
      .catch((error) => {
        notification[NOTIFICATION_TYPE.error]({
          message: 'Error',
          description: `Error ${error.message}`,
        });
      });
  };

  const getCommissariat = () => {
    const commissariat = data.commissariatList.filter(
      (item) => item.id === formData.commissariatId
    );

    return `${commissariat[0].name}, ${commissariat[0].address}`;
  };

  useEffect(() => {
    getCommissariatList()
      .then((res) => {
        setData((prev) => ({ ...prev, commissariatList: res.data }));
      })
      .catch((error) => {
        notification[NOTIFICATION_TYPE.console.error]({
          message: 'Error',
          description: `Error ${error.message}`,
        });
      });

    getConscriptList()
      .then((res) => {
        setData((prev) => ({ ...prev, conscriptList: res.data }));
      })
      .catch((error) => {
        notification[NOTIFICATION_TYPE.console.error]({
          message: 'Error',
          description: `Error ${error.message}`,
        });
      });
  }, []);

  return (
    <div className={classes.root}>
      <Form
        {...layout}
        name='nest-messages'
        onFinish={submit}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['callUp', 'callUpDate']}
          label='Дата призову'
          rules={[{ required: true }]}
        >
          <DatePicker
            placeholder='YYYY-MM-DD'
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, callUpDate: value }))
            }
          />
        </Form.Item>
        <Form.Item
          name={['callUp', 'conscriptList']}
          label='Список призовників'
        >
          <Button onClick={() => setShowConscriptModal(true)}>Обрати</Button>
          {formData.conscriptList.length > 0 && (
            <p>
              Кількість обраних призовників: {formData.conscriptList.length}
            </p>
          )}
        </Form.Item>
        <Form.Item name={['callUp', 'commissariatId']} label='Комісаріат'>
          <Button onClick={() => setShowCommissariatModal(true)}>Обрати</Button>
          {formData.commissariatId && (
            <p>Обраний комісаріат: {getCommissariat()}</p>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Додати
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title='Список призовників'
        visible={showConscriptModal}
        footer={false}
        className={modalClasses.root}
        onCancel={() => setShowConscriptModal(false)}
      >
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>ПІБ</td>
              <td></td>
              <td />
            </tr>
          </thead>
          <tbody>
            {data.conscriptList.filter((item) => item.callUpId === 0).length ===
            0 ? (
              <tr>
                <td>Призовників не знайдено</td>
              </tr>
            ) : (
              data.conscriptList.map(
                (item, index) =>
                  item.callUpId === 0 && (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {item.lastname + ' ' + item.name + ' ' + item.surname}
                      </td>
                      <td></td>
                      <td>
                        <Checkbox
                          checked={formData.conscriptList.includes(item.id)}
                          onClick={() => setConscript(item.id)}
                        >
                          Обрати
                        </Checkbox>
                      </td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      </Modal>

      <Modal
        title='Список комісаріатів'
        visible={showCommissariatModal}
        footer={false}
        className={modalClasses.root}
        onCancel={() => setShowCommissariatModal(false)}
      >
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>Назва</td>
              <td>Адреса</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {data.commissariatList.length > 0 ? (
              data.commissariatList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>
                    <Radio
                      checked={formData.commissariatId === item.id}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          commissariatId: item.id,
                        }))
                      }
                    >
                      Обрати
                    </Radio>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Список комісаріатів пустий</td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default withRouter(CreateCallUp);
