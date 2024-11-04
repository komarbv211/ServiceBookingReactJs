import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const LikeContext = createContext({
    likedProducts: [],
    toggleLike: () => null,
    count: 0, });

export const LikeProvider = ({ children }) => {
    const [likedProducts, setLikedServices] = useState([]);

    const toggleLike = (product) => {
      setLikedServices((prevLiked) => {
            if (prevLiked.find((item) => item.id === product.id)) {
                return prevLiked.filter((item) => item.id !== product.id);
            }
            return [...prevLiked, product];
        });
    };

    const value = { likedProducts, toggleLike, count: likedProducts.length }; 

    return (
        <LikeContext.Provider value={value}>
            {children}
        </LikeContext.Provider>
    );
};

LikeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLike = () => useContext(LikeContext);
