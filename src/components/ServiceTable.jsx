import { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, message, Popconfirm } from 'antd';
import axios from 'axios';
import {AppstoreAddOutlined, DeleteFilled, EditFilled, LikeFilled} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLike } from '../context/LikeContext';

const ServiceTable = () => {
  const [data, setData] = useState([]);
  const { likedProducts, toggleLike } = useLike();
  const isLiked = (product) => likedProducts.some((item) => item.id === product.id);

  useEffect(() => {
    axios.get('https://localhost:7204/api/Services/GetAll')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }, []);
    const handleDelete = (id) => {
        axios
          .delete(`https://localhost:7204/api/Services/Delete${id}`)
          .then(() => {
            message.success('Service deleted successfully!');
            setData((prevData) => prevData.filter((item) => item.id !== id));
          })
          .catch((error) => {
            console.error('Error deleting service:', error);
            message.error('Error deleting service');
          });
      };
    
    const columns = [
    {
        title: 'Image',
        dataIndex: 'imageUrl',
        key: 'image',
        render: (_, item) => <img height={50} src={item.imageUrl} alt={item.title}></img>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, item) => <Link to={`/services/${item.id}`}>{text}</Link>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider',
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        render: (rating) => <Tag color={rating >= 4 ? 'green' : 'volcano'}>{rating}</Tag>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
        <Space size="middle">
            <Button 
              onClick={() => toggleLike(record)} 
              style={{ color: isLiked(record) ? 'green' : 'black'}}>
              <LikeFilled />
            </Button>
            <Link to={`/services/update/${record.id}`}>
              <Button color="primary" variant="outlined">
                  <EditFilled />
              </Button>
            </Link>

            <Popconfirm
              title="Delete the service"
              description={`Are you sure to delete ${record.name}?`}
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
              >
              <Button color="danger" variant="outlined" >
                  <DeleteFilled/>
              </Button>
            </Popconfirm>
            
        </Space>
        ),
    },
    ];
  return (
    <>
      <div>
        <Link to="/services/create">
            <Button type="primary" icon={<AppstoreAddOutlined />} style={{ marginBottom: '16px' }}>
                Create New Service
            </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </>
    )
};

export default ServiceTable;
