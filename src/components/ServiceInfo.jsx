import { LeftOutlined } from '@ant-design/icons';
import { Image, Tag,  Skeleton, Space, Button } from 'antd';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const api = "https://localhost:7204/api/Services/GetById";

export default function ServiceInfo() {

    const [item, setItem] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(api + id)
            .then(res => res.json())
            .then(data => setItem(data));
    }, [id]);

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
            {
                item ?
                    <div>
                        <h2>{item.title}</h2>
                        <p>{item.categoryName}</p>
                        <hr />
                        <Image
                            width={200}
                            src={item.imageUrl}
                        />
                        <p>Price: {item.price}$</p>
                        <p>Discount: {item.discount}%</p>
                        <p>Rating: {item.rating >= 4 ?
                            <Tag color="green">{item.rating}</Tag>
                            :
                            <Tag color="volcano">{item.rating}</Tag>}</p>

                        <p>{item.description}</p>
                    </div>
                    :
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <Space>
                            <Skeleton.Input active style={{ width: 200 }} />
                            <Skeleton.Input active style={{ width: 200 }} />
                        </Space>
                        <Skeleton.Image style={{ width: 200, height: 150 }} />
                        <Skeleton active style={{ width: 300 }} />
                    </div>
            }
        </div >
    )
}