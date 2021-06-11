import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { NOTIFICATION_TYPE } from '../../utils/consts';
import { addNewConscript } from '../../API/conscript';
import { addNewRelative, getRelativeList } from '../../API/relative';
import { addNewWorkPlace, getWorkList } from '../../API/work';
import { addNewStudyPlace, getStudyList } from '../../API/study';
import { Form, Modal, Input, Button, Select, DatePicker, notification } from 'antd';

import useStyles from './style';

const { Option } = Select;

const AddCons = () => {
  const classes = useStyles();

  const history = useHistory();

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
  const [relativeProps, setRelativeProps] = useState({
    relativeList: [],
    show: false,
    id: 0,
    isDone: false,
  });
  const [studyProps, setStudyProps] = useState({
    studyList: [],
    show: false,
    id: 0,
    isDone: false,
  });
  const [workProps, setWorkProps] = useState({
    workList: [],
    show: false,
    id: 0,
    isDone: false,
  });

  const upload = (file) => {
    setFile(file);
  };

  const setRelativeData = (data) => {
    addNewRelative(data.relative).then((res) => {
      setRelativeProps((prev) => ({
        ...prev,
        isDone: true,
        id: res.data.id,
        show: false,
      }));
    });
  };
  const setWorkData = (data) => {
    addNewWorkPlace(data.work).then((res) => {
      setWorkProps((prev) => ({
        ...prev,
        isDone: true,
        id: res.data.id,
        show: false,
      }));
    });
  };
  const setStudyData = (data) => {
    addNewStudyPlace(data.study).then((res) => {
      setStudyProps((prev) => ({
        ...prev,
        isDone: true,
        id: res.data.id,
        show: false,
      }));
    });
  };

  const submit = (data) => {
    const fd = new FormData();
    fd.append('photo', file, file.name);
    fd.append('lastname', data.conscript.lastname);
    fd.append('name', data.conscript.name);
    fd.append('surname', data.conscript.surname);
    fd.append('birthday', data.conscript.birthday);
    fd.append('placeOfBirth', data.conscript.placeOfBirth);
    fd.append('sex', data.conscript.sex);
    fd.append('homeAddress', data.conscript.homeAddress);
    fd.append('passportCode', data.conscript.passportCode);
    fd.append('registrationNumber', data.conscript.registrationNumber);
    fd.append('phoneNumber', data.conscript.phoneNumber);
    fd.append('relativeId', relativeProps.id);
    fd.append('workId', workProps.id);
    fd.append('studyId', studyProps.id);

    addNewConscript(fd)
      .then(() => {
        notification[NOTIFICATION_TYPE.success]({
          message: 'Success',
          description: 'Призовника додано!',
        });
        history.push('/conscripts')
      })
      .catch((error) => {
        notification[NOTIFICATION_TYPE.error]({
          message: 'Error',
          description: `Error ${error.message}`,
        });
      });
  };

  useEffect(() => {
    getStudyList().then((res) => {
      setStudyProps((prev) => ({ ...prev, studyList: res.data }));
    });
    getWorkList().then((res) => {
      setWorkProps((prev) => ({ ...prev, workList: res.data }));
    });
    getRelativeList().then((res) => {
      setRelativeProps((prev) => ({ ...prev, relativeList: res.data }));
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
          name={['conscript', 'lastname']}
          label='Прізвище'
          rules={[{ required: true }]}
        >
          <Input placeholder='Введіть прізвище' />
        </Form.Item>
        <Form.Item
          name={['conscript', 'name']}
          label="Ім'я"
          rules={[{ required: true }]}
        >
          <Input placeholder="Введіть ім'я" />
        </Form.Item>
        <Form.Item
          name={['conscript', 'surname']}
          label='По батькові'
          rules={[{ required: true }]}
        >
          <Input placeholder='Введіть по батькові' />
        </Form.Item>
        <Form.Item
          name={['conscript', 'birthday']}
          label='Дата народження'
          rules={[{ required: true }]}
        >
          <DatePicker placeholder='Оберіть дату' />
        </Form.Item>
        <Form.Item
          name={['conscript', 'placeOfBirth']}
          label='Місце народження'
          rules={[{ required: true }]}
        >
          <Input placeholder='Введіть місце народження' />
        </Form.Item>
        <Form.Item
          name={['conscript', 'sex']}
          label='Стать'
          rules={[{ required: true }]}
        >
          <Select placeholder='Оберіть стать'>
            <Option value='чоловік'>чоловік</Option>
            <Option value='жінка'>жінка</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['conscript', 'homeAddress']}
          label='Домашня адреса'
          rules={[{ required: true }]}
        >
          <Input placeholder='Введіть домашню адресу' />
        </Form.Item>
        <Form.Item
          name={['conscript', 'photo']}
          label='Фото'
          rules={[{ required: true }]}
        >
          <input type='file' onChange={(e) => upload(e.target.files[0])} />
        </Form.Item>
        <Form.Item
          name={['conscript', 'passportCode']}
          label='Код паспорту'
          rules={[{ required: true }]}
        >
          <Input placeholder='Введіть код паспорту' />
        </Form.Item>
        <Form.Item
          name={['conscript', 'registrationNumber']}
          label='Реєстраційний номер'
          rules={[{ required: true }]}
        >
          <Input placeholder='Введіть реєстраційний номер' />
        </Form.Item>
        <Form.Item
          name={['conscript', 'phoneNumber']}
          label='Телефон'
          rules={[{ required: true }]}
        >
          <Input placeholder='Введіть номер телефону' />
        </Form.Item>
        <Form.Item
          name={['conscript', 'relativeId']}
          label='Родич (ПІБ, телефон)'
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder='Введіть ПІБ родича'
            onChange={(value) =>
              setRelativeProps((prev) => ({
                ...prev,
                isDone: true,
                id: relativeProps.relativeList.filter((item) => {
                  if (item.phoneNumber === value.split(',')[1].trim()) {
                    return item;
                  }
                  return null;
                })[0].id,
              }))
            }
          >
            {relativeProps.relativeList.map((item) => (
              <Option
                key={item.id}
                value={`${item.lastname} ${item.name} ${item.surname}, ${item.phoneNumber}`}
              >{`${item.lastname} ${item.name} ${item.surname}, ${item.phoneNumber}`}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type='primary'
            onClick={() =>
              setRelativeProps((prev) => ({ ...prev, show: true }))
            }
          >
            Ввести дані родича
          </Button>
        </Form.Item>
        <Form.Item
          name={['conscript', 'workId']}
          label='Робота'
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder='Введіть назву організації'
            onChange={(value) =>
              setWorkProps((prev) => ({
                ...prev,
                isDone: true,
                id: workProps.workList.filter((item) => {
                  if (item.organizationName === value) {
                    return item;
                  }
                  return null;
                })[0].id,
              }))
            }
          >
            {workProps.workList.map((item) => (
              <Option key={item.id} value={item.organizationName}>
                {item.organizationName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type='primary'
            onClick={() => setWorkProps((prev) => ({ ...prev, show: true }))}
          >
            Ввести дані про роботу
          </Button>
        </Form.Item>
        <Form.Item
          name={['conscript', 'studyId']}
          label='Навчальний заклад'
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder='Введіть назву ВНЗ'
            onChange={(value) =>
              setStudyProps((prev) => ({
                ...prev,
                isDone: true,
                id: studyProps.studyList.filter((item) => {
                  if (item.organizationName === value) {
                    return item;
                  }
                  return null;
                })[0].id,
              }))
            }
          >
            {studyProps.studyList.map((item) => (
              <Option key={item.id} value={item.organizationName}>
                {item.organizationName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type='primary'
            onClick={() => setStudyProps((prev) => ({ ...prev, show: true }))}
          >
            Ввести дані про навчальний заклад
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Додати
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title='Введіть дані родича'
        visible={relativeProps.show}
        footer={null}
        onCancel={() => setRelativeProps((prev) => ({ ...prev, show: false }))}
      >
        <Form
          {...layout}
          name='nest-messages'
          onFinish={setRelativeData}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['relative', 'lastname']}
            label='Прізвище'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['relative', 'name']}
            label="Ім'я"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['relative', 'surname']}
            label='По батькові'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['relative', 'homeAddress']}
            label='Домашня адреса'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['relative', 'phoneNumber']}
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
      </Modal>

      <Modal
        title='Введіть дані про роботу'
        visible={workProps.show}
        footer={null}
        onCancel={() => setWorkProps((prev) => ({ ...prev, show: false }))}
      >
        <Form
          {...layout}
          name='nest-messages'
          onFinish={setWorkData}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['work', 'organizationName']}
            label='Назва організації'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['work', 'address']}
            label='Адреса'
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
      </Modal>

      <Modal
        title='Введіть дані про навчальний заклад'
        visible={studyProps.show}
        footer={null}
        onCancel={() => setStudyProps((prev) => ({ ...prev, show: false }))}
      >
        <Form
          {...layout}
          name='nest-messages'
          onFinish={setStudyData}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['study', 'organizationName']}
            label='Назва закладу'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['study', 'address']}
            label='Адреса'
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
      </Modal>
    </div>
  );
};

export default AddCons;
