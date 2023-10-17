import React from 'react';
import styles from './itemsList.module.scss';
import ItemPreviewCard from '../ItemPreviewCard/ItemPreviewCard';
import PropTypes from 'prop-types';

const ItemsList = ({idArray}) => {
  return (
    <div className={styles.itemsList} data-testid="ItemsList">
      <p>wish list</p>
      <div className={styles.previewCardList}>
        {idArray.map((id) => <ItemPreviewCard id={id} key={id}/>)}
      </div>
    </div>
  );
};
ItemsList.propTypes = {
  idArray: PropTypes.array,
};
export default ItemsList;
