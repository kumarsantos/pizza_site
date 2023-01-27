import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/PizzaCard.module.css';

const PizzaCard = ({ pizza }) => {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => router.push(`/product/${pizza._id}`)}
    >
      <Image src={pizza.img} alt='' width='200' height='200' />
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.desc}>{pizza.desc} </p>
    </div>
  );
};

export default PizzaCard;

// other way to navigate like link
{
  /* <Link href={`/product/${pizza._id}`} passHref><Image /></Link> */
}
