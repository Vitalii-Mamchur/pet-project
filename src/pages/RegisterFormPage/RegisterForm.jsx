import React, {useEffect, useState} from 'react';
import styles from './RegisterForm.module.scss';
import {useFormik} from 'formik';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearUserResponse, getResponse, signUp, signUpWithGoogle} from '../../store/userSlice';
import GoogleIcon from '../../components/svg/googleIcon/googleIcon';
import {useGoogleLogin} from '@react-oauth/google';
import {validationSchemaRegisterForm} from '../../utils/validationSchema';
import googleService from '../../services/google.service';
import TextField from '../../components/form/formFields/textField/textField';
import transformErrorMessage from '../../utils/generateErrorMessage';
import {Modal} from '../../components/modal';
import ModalVerifyEmail from '../../components/modal/modalContent/ModalVerifyEmail/ModalVerifyEmail';
import {showBodyOverflow} from '../../services/modal.service';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const response = useSelector(getResponse());
  const navigate = useNavigate();
  const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false);
  const [email, setEmail] = useState(null);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchemaRegisterForm,
    onSubmit: (values) => {
      setEmail(values.email);
      dispatch(signUp({...values, email: values.email.toLowerCase()}));
    },
  });
  const googleRegister = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      googleService.get(accessToken).then((userInfo) => {
        dispatch(signUpWithGoogle({
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          email: userInfo.email,
        }));
      });
    },
  });
  const closeModal = () => {
    setShowVerifyEmailModal(false);
    showBodyOverflow();
    navigate('/');
  };
  useEffect(()=>{
    if (response && response.code === 201) {
      setShowVerifyEmailModal(true);
      formik.resetForm();
    }
  }, [response]);
  useEffect(() => {
    if (response) {
      dispatch(clearUserResponse());
    }
  }, [formik.values, dispatch]);
  return (
    <div className={styles.registerForm}>
      <div className={styles.titleBlock}>
        <p>
          Sign up
        </p>
        <span>
          Welcome! Please enter your details
        </span>
      </div>
      <div>
        {response ?
          <div className={(response.code !== 200) ? styles.errorMessagesBlock : styles.successMessagesBlock}>
            <p>{transformErrorMessage[response.message]}</p>
          </div> : null}
      </div>
      <div className={styles.inputsBlock}>
        <form
          className={styles.form}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            label='First name'
            name='firstName'
            placeholder={'Enter your first name'}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
          />
          <TextField
            label='Last name'
            name='lastName'
            placeholder={'Enter your last name'}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />
          <TextField
            label='Email'
            name='email'
            placeholder={'example@ex.com'}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <TextField
            type='password'
            label='Password'
            name='password'
            placeholder='**********'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <TextField
            type='password'
            label='Confirm password'
            name='confirmPassword'
            placeholder='**********'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className={styles.button}
          >
            <span>
              Sign up
            </span>
            <div/>
          </button>
        </form>
        <div className={styles.socialButtonsBlock}>
          <div className={styles.divider}>
            <div></div>
            <span>or</span>
            <div></div>
          </div>
          <div>
            <div
              id='signUpDiv'>
            </div>
            <button className={styles.googleButton}
              onClick={()=> googleRegister()}
            >
              <GoogleIcon />
              <span>
                Sign up with Google
              </span>
            </button>
          </div>
        </div>
      </div>
      <p>
        Already have an account?{'  '}
        <NavLink
          to="/login"
          role="button"
        >
          {' '}
          <span>Sign in</span>
        </NavLink>
      </p>
      <Modal
        isOpen={showVerifyEmailModal}
        handleCloseModal={closeModal}
      >
        <ModalVerifyEmail handleCloseModal={closeModal} email={email}/>
      </Modal>
    </div>
  );
};

export default RegisterForm;
