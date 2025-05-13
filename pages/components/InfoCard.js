import React from 'react';
import styles from './InfoCard.module.css';

const InfoCard = ({ ipAddress, location, timezone, isp, loading, error }) => {
  return (
    <div className={styles.card}>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          <div className={styles.info}>
            <h2 className={styles.title}>IP ADDRESS</h2>
            <p className={styles.value}>{ipAddress || '-'}</p>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.info}>
            <h2 className={styles.title}>LOCATION</h2>
            <p className={styles.value}>{location || '-'}</p>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.info}>
            <h2 className={styles.title}>TIMEZONE</h2>
            <p className={styles.value}>{timezone || '-'}</p>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.info}>
            <h2 className={styles.title}>ISP</h2>
            <p className={styles.value}>{isp || '-'}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoCard;