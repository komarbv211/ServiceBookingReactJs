import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Space, message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function CreateService() {
  const { TextArea } = Input;
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
  }, []);

  const onSubmit = (serviceData) => {
    axios.post('https://localhost:7204/api/Services/Create', {
      name: serviceData.name,
      description: serviceData.description,
      price: serviceData.price,
      provider: serviceData.provider,
      rating: serviceData.rating,
      reviewCount: serviceData.reviewCount,
      imageUrl: serviceData.imageUrl,
      categoryId: serviceData.categoryId,
    })
    .then(() => {
      message.success('Service created successfully!');
    })
    .catch((error) => {
      console.error('Error creating service:', error);
      message.error('Error creating service');
    });
  };

  return (
    <>
      <h2>Create New Service</h2>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Provider"
          name="provider"
          rules={[{ required: true, message: 'Please input the provider!' }]}
        >
          <Input />
        </Form.Item>
     
        <Form.Item
          label="Image URL"
          name="imageUrl"
        //   rules={[{ required: true, message: 'Please input the image URL!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
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
            <Button type="primary" htmlType="submit" >
              Create
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

