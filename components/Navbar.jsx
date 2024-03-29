import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const router = useRouter();

  const handleRedirect=(id)=>{
    const element=document.getElementById(id);
    element?.scrollIntoView({behavior:'smooth'});
  }

  const { quantity } = useSelector((state) => state.cart);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src='/img/telephone.png' alt='' width='32' height='32' />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem} onClick={() => router.push('/')}>
            Home
          </li>
          <li className={styles.listItem} onClick={() => handleRedirect('products')}>Products</li>
          {/* <li className={styles.listItem}>Menu</li> */}
          {/* <Image src='/img/logo.png' alt='' width='160' height='69' /> */}
          <h1>SK PIZZA</h1>

          {/* <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li> */}
          {/* <li className={styles.listItem}>Contact</li> */}
        </ul>
      </div>
      <div className={styles.item}>
        <div className={styles.cart} onClick={() => router.push('/cart')}>
          <Image src='/img/cart.png' alt='' width='30' height='30' />
          <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
