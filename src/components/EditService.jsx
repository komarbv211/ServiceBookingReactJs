import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Space, message } from 'antd';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function EditService() {
  const { TextArea } = Input;
  const [form] = Form.useForm(); // Ініціалізуємо форму
  const { id } = useParams(); // Отримуємо id сервісу з URL
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7204/api/Categories/GetAll')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        message.error('Error loading categories');
      });

    axios.get(`https://localhost:7204/api/Services/GetById${id}`)
      .then((response) => {
        form.setFieldsValue(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching service data:', error);
        message.error('Error loading service data');
      });
  }, [id, form]);

  const onSubmit = (serviceData) => {
    axios.put('https://localhost:7204/api/Services/Update', {
      id, 
      ...serviceData,
    })
    .then(() => {
      message.success('Service updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating service:', error);
      message.error('Error updating service');
    });
  };

  return (
    <>
      <h2>Edit Service</h2>
      <Form
        form={form} 
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        
        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Provider" name="provider" rules={[{ required: true, message: 'Please input the provider!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Image URL" name="imageUrl">
          <Input />
        </Form.Item>

        <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select a category!' }]}>
          <Select placeholder="Select a category">
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Space>
            <Link to="/services">
              <Button type="default" htmlType="reset">
                Cancel
              </Button>
            </Link>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
