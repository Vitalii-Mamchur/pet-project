import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {updateUser} from '../store/userSlice';

const useChangeFavorite = (user, id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    if (user) {
      setFavorite(user.favorite.includes(id));
    }
  }, [user, id]);
  const handleIsFavorite = (() => {
    if (user) {
      if (isFavorite) {
        dispatch(updateUser({...user, favorite: user.favorite.filter((item) => item !== id)}));
      } else {
        dispatch(updateUser({...user, favorite: [...user.favorite, id]}));
      }
    } else {
      navigate('/logIn');
    }
  });
  return [isFavorite, handleIsFavorite];
};

useChangeFavorite.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default useChangeFavorite;