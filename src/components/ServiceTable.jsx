import { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, message  } from 'antd';
import axios from 'axios';
import { DeleteFilled, EditFilled,} from '@ant-design/icons';


const ServiceTable = () => {
  const [data, setData] = useState([]);

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
        render: (text) => <a>{text}</a>,
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
            <Button color="primary" variant="outlined">
                <EditFilled/>
            </Button>
            <Button color="danger" variant="outlined" onClick={() => handleDelete(record.id)}>
                <DeleteFilled/>
            </Button>
        </Space>
        ),
    },
    ];
  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default ServiceTable;
