import React from 'react';
import styles from './linkedinIcon.module.scss';

const LinkedinIcon = () => (
  <div className={styles.linkedinIcon} data-testid="LinkedinIcon">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" fill="#1A6449"/>
      {/* eslint-disable-next-line max-len */}
      <path d="M16.7998 12.4468V15.7563H14.8626V12.6486C14.8626 11.8818 14.5801 11.3571 13.894 11.3571C13.3693 11.3571 13.0464 11.7204 12.9254 12.0432C12.885 12.1643 12.8446 12.3258 12.8446 12.5275V15.7563H10.9074C10.9074 15.7563 10.9478 10.5096 10.9074 9.98495H12.8446V10.7921C13.0868 10.3885 13.5711 9.82351 14.5801 9.82351C15.8312 9.82351 16.7998 10.671 16.7998 12.4468ZM8.88949 7.2002C8.24375 7.2002 7.7998 7.64414 7.7998 8.20916C7.7998 8.77419 8.20339 9.21813 8.84913 9.21813C9.53523 9.21813 9.93882 8.77419 9.93882 8.20916C9.97918 7.60378 9.57559 7.2002 8.88949 7.2002ZM7.92088 15.7563H9.8581V9.98495H7.92088V15.7563Z" fill="#FAFAFA"/>
    </svg>
  </div>
);

export default LinkedinIcon;