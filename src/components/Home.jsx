import { useEffect, useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { LikeFilled } from '@ant-design/icons';
import { useLike } from '../context/LikeContext';
import axios from 'axios';
import DefaultImage from '../assets/ServiceBookingBackground.png';

const defaultImageUrl = DefaultImage; 

const Home = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const { likedProducts, toggleLike } = useLike();

    useEffect(() => {
        axios.get('https://localhost:7204/api/Services/GetAll')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    const isLiked = (service) => likedProducts.some(item => item.id === service.id);

    const showDetails = (service) => setSelectedService(service);

    const handleCloseModal = () => setSelectedService(null);

    return (
       
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
                {services.map(service => (
                    <Card
                        key={service.id}
                        title={service.name}
                        cover={
                            <img 
                                alt={service.name} 
                                src={service.imageUrl || defaultImageUrl} 
                                style={{ height: 200 }} 
                            />
                        }
                        style={{ 
                            width: 240, 
                            border: '3px solid #D8BFD8' 
                        }}
                        actions={[
                            <Button 
                                key="like"
                                type="text"
                                icon={<LikeFilled style={{ color: isLiked(service) ? 'green' : 'gray' }} />}
                                onClick={() => toggleLike(service)}
                            />,
                            <Button 
                                key="details"
                                type="link" 
                                onClick={() => showDetails(service)}
                            >
                                Детальніше
                            </Button>
                        ]}
                    >
                        <Card.Meta description={service.description} />
                    </Card>
                ))}

                {selectedService && (
                    <Modal
                        visible={true}
                        title={selectedService.name}
                        onCancel={handleCloseModal}
                        footer={null}
                    >
                        <img 
                            alt={selectedService.name} 
                            src={selectedService.imageUrl || defaultImageUrl} 
                            style={{ width: '100%', marginBottom: '16px' }}
                        />
                        <p>{selectedService.description}</p>
                        <p>Price: {selectedService.price} $</p>
                        <p>Provider: {selectedService.provider}</p>
                        <p>Rating: {selectedService.rating}</p>
                    </Modal>
                )}
            </div>
    );
};

export default Home;
