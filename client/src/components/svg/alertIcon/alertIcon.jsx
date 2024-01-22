import React from 'react';
import styles from './alertIcon.module.scss';

const AlertIcon = () => (
  <div className={styles.alertIcon} data-testid="AlertIcon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* eslint-disable-next-line max-len */}
      <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#EA001B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export default AlertIcon;