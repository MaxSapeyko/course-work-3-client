import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';

import { getCommissariatList } from '../../API/commissariat';
import { getConscriptList } from '../../API/conscript';
import { createCallUp } from '../../API/callUp';

import useStyles from './style';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const CreateCallUp = () => {
  const classes = useStyles();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "Обов'язкове поле!",
  };

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
  // const [showCommissariatModal, setShowCommissariatModal] = useState(false);

  const commissariatModal = (commissariatList) => {
    Modal.info({
      title: 'Список комісаріатів',
      content: (
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
            {commissariatList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>
                  <Button
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        commissariatId: item.id,
                      }))
                    }
                  >
                    Обрати
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
      onOk() { },
    });
  };

  const showCommissariatModal = () => {
    getCommissariatList()
      .then((res) => {
        commissariatModal(res.data, true);
      })
      .catch((error) => console.log(`Error ${error}`));
  };

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

  const getConscriptData = () => {
    getConscriptList()
      .then((res) => {
        setData((prev) => ({ ...prev, conscriptList: res.data }));
        setShowConscriptModal(true);
      })
      .catch((error) => console.log(`Error ${error}`));
  };

  const submit = () => {
    createCallUp(formData)
      .then(() => console.log('Succes'))
      .catch((error) => console.log(`Error ${error}`));
  };

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
          <Input
            placeholder='YYYY-MM-DD'
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, callUpDate: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          name={['callUp', 'conscriptList']}
          label='Список призовників'
        >
          <Button onClick={getConscriptData}>Обрати</Button>
        </Form.Item>
        <Form.Item name={['callUp', 'commissariatId']} label='Комісаріат'>
          <Button onClick={showCommissariatModal}>Обрати</Button>
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
            {data.conscriptList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.lastname + ' ' + item.name + ' ' + item.surname}</td>
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
            ))}
          </tbody>
        </table>
        <Button
          type='primary'
          onClick={() => setShowConscriptModal(false)}
        >
          OK
        </Button>
      </Modal>;
    </div>
  );
};

export default CreateCallUp;
