import { Table, Tag } from 'antd';
import { useLike } from '../context/LikeContext';

const FavoritesPage = () => {
  const { likedProducts } = useLike();

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
  ];

  return (
    <div>
      <h1>Favorites</h1>
      <Table columns={columns} dataSource={likedProducts} rowKey="id" />
    </div>
  );
};

export default FavoritesPage;
