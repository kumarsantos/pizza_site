import axios from 'axios';
import { useRouter } from 'next/router';
import React, { use, useState } from 'react';
import styles from '../styles/Add.module.css';

export const Add = ({ setClose = { setClose } }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const changePrice = (e, index) => {
    const currentPrice = prices;
    currentPrice[index] = e.target.value;
    setPrices(currentPrice);
  };
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'pizza_file');
    try {
      setIsLoading(true);
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/santoshkumarsah/image/upload',
        data
      );
      const { url } = uploadRes?.data;
      if (url) {
        const collectedData = {
          img: url,
          desc,
          title,
          prices,
          extraOptions,
        };
        await axios.post('http://localhost:3000/api/products', collectedData);
        setIsLoading(false);
        setClose(true);
        router.reload(window.location.pathname);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <span className={styles.close} onClick={() => setClose(true)}>
            X
          </span>
          <h1 className={styles.title}>Add a new Pizza</h1>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            type='file'
            className={styles.input}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            type='text'
            placeholder='Title'
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <input
            type='text'
            placeholder='Description'
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <input
            type='number'
            placeholder='Small'
            className={`${styles.input} ${styles.inputSm}`}
            onChange={(e) => changePrice(e, 0)}
          />
          <input
            type='number'
            placeholder='Medium'
            className={`${styles.input} ${styles.inputMd}`}
            onChange={(e) => changePrice(e, 1)}
          />
          <input
            type='number'
            placeholder='Large'
            className={`${styles.input} ${styles.inputLg}`}
            onChange={(e) => changePrice(e, 2)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <input
            type='text'
            placeholder='Item'
            name='text'
            className={`${styles.input} ${styles.inputSm}`}
            onChange={handleExtraInput}
          />
          <input
            type='number'
            placeholder='Price'
            name='price'
            className={`${styles.input} ${styles.inputSm}`}
            onChange={handleExtraInput}
          />
          <button onClick={handleExtra} className={styles.add}>
            Add
          </button>
        </div>
        <div className={styles.extraItems}>
          {extraOptions?.map((option, i) => (
            <div key={option.text + i} className={styles.extraItem}>
              <span>{option.text}</span>
              <span>{option.price}</span>
            </div>
          ))}
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          {isLoading ? 'Loading...' : 'Create'}
        </button>
      </div>
    </div>
  );
};
