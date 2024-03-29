import React, {useEffect, useState} from 'react';
import styles from './CheckOutUserInfoBlock.module.scss';
import LoginFormBlock from '../../../../components/form/formBlocks/LoginFormBlock/LoginFormBlock';
import {useFormik} from 'formik';
import UnknownUserContactFormBlock
  from '../../../../components/form/formBlocks/UnknownUserContactFormBlock/UnknownUserContactFormBlock';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getIsLoggedIn, getUser} from '../../../../store/userSlice';
import {validationSchemaCheckOutUserInfo} from '../../../../utils/validationSchema';
import {setUserInfo} from '../../../../store/ordersSlice';
import RadioButtonCheckedIcon
  from '../../../../components/svg/radioButtonIcons/RadioButtonCheckedIcon/RadioButtonCheckedIcon';
import RadioButtonEmptyIcon
  from '../../../../components/svg/radioButtonIcons/RadioButtonEmptyIcon/RadioButtonEmptyIcon';
import LeftArrowIcon from '../../../../components/svg/arrowIcons/LeftArrowIcon/LeftArrowIcon';

const CheckOutUserInfoBlock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCurrentDetails, setUserCurrentDetails] = useState('1');
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getUser);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
    validationSchema: validationSchemaCheckOutUserInfo,
    onSubmit: async (values)=> {
      dispatch(setUserInfo(values));
      navigate('/cart/checkoutDelivery');
    },
  });
  const userCurrentDetailsList = [
    {
      id: '1',
      label: 'new user',
      value: <UnknownUserContactFormBlock formik={formik}/>,
    },
    {
      id: '2',
      label: 'registered user',
      value: <LoginFormBlock type='1'/>,
    },
  ];
  useEffect(() => {
    if (isLoggedIn) {
      setUserCurrentDetails('1');
    }
    if (user) {
      formik.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, isLoggedIn]);
  return (
    <div className={styles.checkOutUserInfoBlock}>
      <p className={styles.checkOutUserInfoBlock__title}>Contact details</p>
      <div className={styles.checkOutUserInfoBlock__radioBlock}>
        {userCurrentDetailsList.map((detail, index)=> <div key={index}>
          <div
            className={styles.checkOutUserInfoBlock__radioWrapper}
          >
            <button
              className={styles.checkOutUserInfoBlock__radioButton}
              type='button'
              disabled={isLoggedIn}
              onClick = {()=> setUserCurrentDetails(detail.id) }
            >
              {userCurrentDetails === detail.id ? <RadioButtonCheckedIcon/>:<RadioButtonEmptyIcon/>}
            </button>
            <label
              className={styles.checkOutUserInfoBlock__label}
            >
              {detail.label}
            </label>
          </div>
        </div>)}
      </div>
      {userCurrentDetails === '2' && userCurrentDetailsList[1].value}
      <form onSubmit={formik.handleSubmit} className={styles.checkOutUserInfoBlock__checkOutUserInfoBlock} data-testid="CheckOutUserInfoBlock">
        {userCurrentDetails === '1' && userCurrentDetailsList[0].value}
        <div className={styles.checkOutUserInfoBlock__navigationButtonsSection}>
          <button
            type='button'
            onClick={()=> navigate(-1) }
            className={styles.checkOutUserInfoBlock__buttonLeft}
          >
            <LeftArrowIcon/>
            <span>
              go back
            </span>
          </button>
          <button
            className={styles.checkOutUserInfoBlock__buttonRight}
            type='submit'
            disabled={!formik.isValid || !formik.dirty}
          >
            <span>
              next step
            </span>
            <LeftArrowIcon/>
          </button>
        </div>
      </form>
    </div>
  );
};
export default CheckOutUserInfoBlock;
