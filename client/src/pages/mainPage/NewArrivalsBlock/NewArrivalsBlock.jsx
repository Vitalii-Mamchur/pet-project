import React, {useRef} from 'react';
import styles from './NewArrivalsBlock.module.scss';
import {useSelector} from 'react-redux';
import {getItemsList, getItemsLoadingStatus} from '../../../store/itemsSlice';
import ItemPreviewCard from '../../../components/ItemPreviewCard/ItemPreviewCard';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules';
import BigLeftArrowIcon from '../../../components/svg/arrowIcons/BigLeftArrowIcon/BigLeftArrowIcon';

const NewArrivalsBlock = () => {
  const swiperRef = useRef();
  const isItemsLoading = useSelector(getItemsLoadingStatus);
  const items = useSelector(getItemsList);
  let newArrivalItems = [];
  if (!isItemsLoading && items) {
    newArrivalItems = items.filter((item) => item.status === 'new');
  }
  return (
    <article className={styles.newArrivalsBlock} data-testid='NewArrivalsBlock'>
      <section className={styles.newArrivalsBlock__titleSection}>
        <h2 className={styles.newArrivalsBlock__title2}>new arrivals</h2>
        <section className={styles.newArrivalsBlock__arrowSection}>
          <button
            className={styles.newArrivalsBlock__button}
            type='button'
            aria-label='go to previous slide'
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <BigLeftArrowIcon />
          </button>
          <button
            className={`${styles.newArrivalsBlock__button} ${styles.buttonRight}`}
            type='button'
            aria-label='go to previous slide'
            onClick={() => swiperRef.current?.slideNext()}
          >
            <BigLeftArrowIcon />
          </button>
        </section>
      </section>
      {!isItemsLoading && newArrivalItems && (
        <Swiper
          className={styles.newArrivalsSwiper}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={8}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            769: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            581: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            501: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
          }}
        >
          {newArrivalItems.map((item) => (
            <SwiperSlide key={item._id}>
              <ItemPreviewCard id={item._id} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </article>
  );
};

export default NewArrivalsBlock;
