import React from 'react';
import styles from './userPaymentByCardForm.module.scss';
import PropTypes from 'prop-types';
import TextField from '../../formFields/textField/textField';

const UserPaymentByCardForm = ({formik}) => {
  const handleCardNumberChange = (e) => {
    const {value} = e.target;
    const formattedValue = value
        .replace(/[^\d]/g, '')
        .replace(/(.{4})/g, '$1-')
        .trim()
        .slice(0, 19);
    formik.setFieldValue('cardNumber', formattedValue);
  };
  return (
    <div className={styles.userPaymentByCardForm} data-testid="UserPaymentByCardForm">
      <TextField
        label='Card number'
        name='cardNumber'
        placeholder='Enter the card number'
        onChange={handleCardNumberChange}
        value={formik.values.cardNumber}
        error={formik.errors.cardNumber}
        onBlur={formik.handleBlur}
        touched={formik.touched.cardNumber}
      />
      <div className={styles.block}>
        <TextField
          label='Validity date'
          name='validityDate'
          placeholder='MM/YY'
          onChange={formik.handleChange}
          value={formik.values.validityDate}
          error={formik.errors.validityDate}
          onBlur={formik.handleBlur}
          touched={formik.touched.validityDate}
        />
        <TextField
          label='CVV/CVC'
          name='cvvCvc'
          placeholder='3 numbers'
          onChange={formik.handleChange}
          value={formik.values.cvvCvc}
          error={formik.errors.cvvCvc}
          onBlur={formik.handleBlur}
          touched={formik.touched.cvvCvc}
        />
      </div>
      <TextField
        label='Name on card'
        name='cardHolderName'
        placeholder='Enter the name indicated on the card'
        onChange={formik.handleChange}
        value={formik.values.cardHolderName}
        error={formik.errors.cardHolderName}
        onBlur={formik.handleBlur}
        touched={formik.touched.cardHolderName}
      />
    </div>
  );
};
UserPaymentByCardForm.propTypes = {
  formik: PropTypes.object.isRequired,
};
export default UserPaymentByCardForm;