import React, { useState } from 'react';

import { addNewConscript } from '../../API/conscript';
import { Form, Input, Button, Select, DatePicker } from 'antd';

import useStyles from './style';

const { Option } = Select;
const AddCons = () => {
  const classes = useStyles();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "Обов'язкове поле!",
    types: {
      email: '$Некоректний email!',
    },
  };
  const [file, setFile] = useState();

  const upload = (file) => {
    setFile(file);
  };

  const submit = (data) => {
    const fd = new FormData();
    fd.append('photo', file, file.name)
    fd.append('lastname', data.conscript.lastname)
    fd.append('name', data.conscript.name)
    fd.append('surname', data.conscript.surname)
    fd.append('birthday', data.conscript.birthday)
    fd.append('placeOfBirth', data.conscript.placeOfBirth)
    fd.append('sex', data.conscript.sex)
    fd.append('homeAddress', data.conscript.homeAddress)
    fd.append('passportCode', data.conscript.passportCode)
    fd.append('registrationNumber', data.conscript.registrationNumber)
    fd.append('phoneNumber', data.conscript.phoneNumber)
    fd.append('callUpId', data.conscript.callUpId)
    fd.append('relativeId', data.conscript.relativeId)
    fd.append('workId', data.conscript.workId)
    fd.append('studyId', data.conscript.studyId)

    addNewConscript(fd)
      .then(() => console.log('Призовника додано'))
      .catch((error) => console.log(`Error ${error}`));
  };

  return (
    <div className={classes.root}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={submit}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['conscript', 'lastname']}
          label="Прізвище"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'name']}
          label="Ім'я"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'surname']}
          label="По батькові"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'birthday']}
          label="Дата народження"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={['conscript', 'placeOfBirthday']}
          label="Місце народження"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'sex']}
          label="Стать"
          rules={[{ required: true }]}
        >
          <Select initialValues="чоловік">
            <Option value="чоловік">чоловік</Option>
            <Option value="жінка">жінка</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['conscript', 'homeAddress']}
          label="Домашня адреса"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'photo']}
          label="Фото"
          rules={[{ required: true }]}
        >
          <input type="file" onChange={(e) => upload(e.target.files[0])} />
        </Form.Item>
        <Form.Item
          name={['conscript', 'passportCode']}
          label="Код паспорту"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'registrationNumber']}
          label="Реєстраційний номер"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['conscript', 'phoneNumber']}
          label="Телефон"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Додати
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCons;
