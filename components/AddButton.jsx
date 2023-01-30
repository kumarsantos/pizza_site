import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/AddButton.module.css';

const AddButton = ({ setClose, isAdmin }) => {
  const router = useRouter();

  const handleClick = () => {
    if (isAdmin) {
      setClose(false);
    } else {
      router.push('/admin/login');
    }
  };
  return (
    <div className={styles.mainAddButton} onClick={handleClick}>
      AddButton
    </div>
  );
};

export default AddButton;
