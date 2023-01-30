import React, { useState } from 'react';
import styles from '../styles/OrderDetails.module.css';

export const OrderDetails = ({ total, createOrder, props }) => {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!customer || !phoneNumber || !address) {
      setError(true);
      return;
    }
    setError(false);
    createOrder({ customer, address, total, method: 0, phoneNumber });
  };

  return (
    <div className={styles.modelContainer}>
      <div className={styles.modelWrapper}>
        <h1 className={styles.title}>You will pay ${total} after delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name</label>
          <input
            placeholder='John Doe'
            type='text'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone number</label>
          <input
            placeholder='+91 9844010478'
            type='text'
            className={styles.input}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <input
            placeholder='31/4, 4th main,link road,4th floor,door 8'
            type='text'
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {error && <p className={styles.error}>Please enter all the details!</p>}
        <button className={styles.submit} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
