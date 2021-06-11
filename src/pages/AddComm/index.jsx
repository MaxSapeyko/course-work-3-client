import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useHistory } from 'react-router-dom';

import { createNewCommissariat } from '../../API/commissariat';
import { NOTIFICATION_TYPE } from '../../utils/consts';

import useStyles from './style';

const AddComm = () => {
  const classes = useStyles();
  
  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "Обов'язкове поле!",
  };

  const submit = (data) => {
    createNewCommissariat(data.commissariat)
      .then(() => {
        notification[NOTIFICATION_TYPE.success]({
          message: 'Success',
          description: 'Комісаріат додано!',
        });
        history.push('/commissariat');
      })
      .catch((error) => {
        notification[NOTIFICATION_TYPE.error]({
          message: 'Error',
          description: `Error ${error.message}`,
        });
      });
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
          name={['commissariat', 'name']}
          label='Назва комісаріату'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['commissariat', 'address']}
          label='Адреса'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['commissariat', 'phoneNumber']}
          label='Телефон'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Додати
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddComm;
