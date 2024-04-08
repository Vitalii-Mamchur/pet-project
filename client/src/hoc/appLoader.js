import {useDispatch, useSelector} from 'react-redux';
import {fetchItemsList} from '../store/itemsSlice';
import PropTypes from 'prop-types';
import {fetchCategoriesList} from '../store/categorySlice';
import {fetchColorsList} from '../store/colorsSlice';
import {getIsLoggedIn, fetchUserData} from '../store/userSlice';
import {useEffect} from 'react';
import {fetchCitiesList} from '../store/citiesSlice';
import Cookies from 'js-cookie';

const AppLoader = ({children}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const rememberMe = Cookies.get('rememberMe');
  useEffect(() => {
    dispatch(fetchCategoriesList());
    dispatch(fetchColorsList());
    dispatch(fetchItemsList());
    dispatch(fetchCitiesList());
    if (rememberMe) {
      console.log('rememberMe', rememberMe);
    }
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserData());
    }
  }, [isLoggedIn]);
  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
