import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import styles from './Footer.module.scss';
import {useSelector} from 'react-redux';
import {getCategories} from '../../store/categorySlice';
import LogoIcon from '../svg/logoIcon/logoIcon';
import TiktokIcon from '../svg/socialMediaIcons/tiktokIcon/tiktokIcon';
import FacebookIcon from '../svg/socialMediaIcons/facebookIcon/facebookIcon';
import InstagrammIcon from '../svg/socialMediaIcons/instagrammIcon/instagrammIcon';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useSelector(getCategories());
  const navigateToHome = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  function getCategoryId(categoryName) {
    if (categories) {
      return categories.filter((category) => category.name === categoryName)[0]
          ._id;
    }
  }
  return (
    <footer className={styles.container} data-testid='Footer'>
      <div className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerTopLeft}>
            <div className={styles.footerContact}>
              <h3>Contact</h3>
              <div className={styles.footerList}>
                <Link to='tel:+380441234567'>+38(044)123-45-67</Link>
                <Link to='mailto:bavovna19@gmail.com'>Contact Us</Link>
                <Link to='/creators'>Project team</Link>
              </div>
            </div>
            <div className={styles.footerShop}>
              <h3>Shop</h3>
              <div className={styles.footerList}>
                <Link to='/shop?status=sale'>Sale</Link>
                <Link to='/shop?status=new'>New</Link>
                <Link to={`/shop?status=${getCategoryId('t-shirts')}`}>
                  T-Shirts
                </Link>
                <Link to={`/shop?status=${getCategoryId('dresses')}`}>
                  Dresses
                </Link>
                <Link to={`/shop?status=${getCategoryId('pants')}`}>Pants</Link>
                <Link to={`/shop?status=${getCategoryId('skirts')}`}>
                  Skirts
                </Link>
              </div>
            </div>
            <div className={styles.footerHelp}>
              <h3>Help</h3>
              <div className={styles.footerList}>
                <Link to='/help/delivery'>Delivery information</Link>
                <Link to='/help/return'>Return information</Link>
                <Link to='/help/payment'>Payment</Link>
                <Link to='/help/faq'>FAQ</Link>
              </div>
            </div>
          </div>
          <div className={styles.footerTopRight}>
            <button onClick={navigateToHome}>
              <LogoIcon />
            </button>
            <div className={styles.socialList}>
              <a href='https://www.instagram.com/' target='_blank' className={styles.socialListItem} rel="noreferrer">
                <InstagrammIcon />
              </a>
              <a href='https://www.facebook.com/' target='_blank' className={styles.socialListItem} rel="noreferrer">
                <FacebookIcon />
              </a>
              <a href='https://www.tiktok.com/' target='_blank' className={styles.socialListItem} rel="noreferrer">
                <TiktokIcon />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomLeft}>
            <p className={styles.footerBottomItem}>
              © 2024 Bavovna | All Rights Reserved
            </p>
            <div
              className={`${styles.footerBottomItem} ${styles.footerBottomCookies}`}
            >
              <Link to='/help/cookies'>Cookies settings</Link>
            </div>
            <div className={styles.footerBottomItem}>
              <Link to='/help/privacy'>Privacy policy</Link>
            </div>
          </div>
          <div className={styles.footerBottomRight}>
            <img src='/img/svg/liqpay.png' alt='liqpay' />
            <img src='/img/svg/mastercard.svg' alt='mastercard' />
            <img src='/img/svg/visa.svg' alt='visa' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
