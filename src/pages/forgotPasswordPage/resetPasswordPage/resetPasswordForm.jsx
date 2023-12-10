import React, {useEffect} from 'react';
import styles from './resetPasswordForm.module.scss';
import TextField from '../../../components/form/formFields/textField/textField';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {clearUserResponse, getResponse, setNewPassword} from '../../../store/userSlice';
import * as Yup from 'yup';
import transformErrorMessage from '../../../utils/generateErrorMessage';

const ResetPasswordForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const email = urlParams.get('email');
  const dispatch = useDispatch();
  const response = useSelector(getResponse());
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      confirmPassword: Yup.string()
          .required('Password confirmation is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      password: Yup.string()
          .required('Password is required')
          .min(8, 'Password has to be longer than 8 characters')
          .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
          .matches(/(?=.*[!_$%&*"])/, 'Password must contain at ' +
            'least one of symbols !_$%&*')
          .matches(/(?=.*[A-Z])/, 'Password must contain at' +
            ' least one capital letter')
          .max(16, 'Password hasn\'t\' to be longer than 16 characters'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      dispatch(setNewPassword(token, email, values.password));
    },
  });
  useEffect(() => {
    dispatch(clearUserResponse());
  }, []);
  return (
    <div className={styles.resetPasswordForm} data-testid="ResetPasswordForm">
      <div
        className={styles.titleBlock}
      >
        <p className={styles.title}>Reset PASSWORD</p>
        <p>Please enter a new password:</p>
      </div>
      {response ?
        <div className={(response.code !== 200) ? styles.errorMessagesBlock : styles.successMessagesBlock}>
          <p>{transformErrorMessage[response.message]}</p>
        </div> : null}
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
      >
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
          className={styles.button}
          type="submit"
          disabled={!formik.isValid}>
          <span>
            Reset
          </span>
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;