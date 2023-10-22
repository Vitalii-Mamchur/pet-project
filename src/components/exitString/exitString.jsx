import React from 'react';
import styles from './exitString.module.scss';
import ExitIcon from '../svg/exitIcon/exitIcon';
import {useDispatch} from 'react-redux';
import {logOut} from '../../store/userSlice';
import {useNavigate} from 'react-router-dom';

const ExitString = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };
  return (
    <div
      className={styles.exitString}
      data-testid="ExitString"
      onClick={handleLogOut}
    >
      <span>exit</span>
      <ExitIcon/>
    </div>
  );
};

export default ExitString;