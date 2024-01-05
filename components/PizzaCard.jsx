import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/PizzaCard.module.css';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/cartSlice';

const PizzaCard = ({ pizza,hideAddToCartButton=false }) => {
  const router = useRouter();
const dispatch=useDispatch();


  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addProduct({ ...pizza,quantity:1, price:pizza.prices[0] }));
  };
  return (
    <div
      style={{border:'1px solid gray',
      borderRadius:'1rem',
      overflow:'hidden',
      minWidth:'230px',
      maxWidth:'230px',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      cursor:'pointer'

    
    }}
      onClick={() => router.push(`/product/${pizza._id}`)}
    >
      <Image src={pizza.img} alt='' width='230' height='200' />
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.desc} 
      style={{
        textAlign:'justify',
        margin:'0.5rem',
        fontSize:'0.8rem'
        }}
>{pizza.desc}</p>
      {!hideAddToCartButton && <div style={{marginBottom:'1rem'}}>
        <button style={{
          all:'unset',
           background:'green',
           color:'white',
           padding:'4px 12px',
           borderRadius:'0.5rem',
          cursor:'pointer',


      }}
      onClick={handleAddToCart}
      
      >Add to card</button>
      </div>}
    </div>
  );
};

export default PizzaCard;

// other way to navigate like link
{
  /* <Link href={`/product/${pizza._id}`} passHref><Image /></Link> */
}
