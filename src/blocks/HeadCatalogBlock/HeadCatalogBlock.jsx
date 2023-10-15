import React from 'react';
import styles from './HeadCatalogBlock.module.scss';

const HeadCatalogBlock = () => {
  return (
    <div className={styles.head} data-testid='HeadCatalogBlock'>
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>
          10% discount on the summer collection
        </h2>
        <button className={styles.heroBtn}>
          <span>
            View more
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeadCatalogBlock;
