import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({ pizzaList ,hideAddToCartButton}) => {
  return (
    <div className={styles.container} id='products'>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
      Nestled in the heart of a bustling neighborhood, SK Pizzeria exudes warmth and welcomes guests with the irresistible aroma of freshly baked pizza. The exterior is adorned with rustic red bricks, and a charming neon sign proudly displays the restaurant's name.<br></br><br></br>
      Upon entering, the atmosphere is lively, filled with the hum of conversation and the sizzling sounds emanating from the open kitchen. The interior is tastefully decorated with checkered tablecloths, vintage pizza paddles on the walls, and dim, ambient lighting that creates a cozy, intimate feel.
      </p>
      <div  style={{display:'flex',justifyContent:'center',gap:'2rem',margin:'4rem 4rem',flexWrap:'wrap'}}>
        {pizzaList?.map((pizza) => {
          return <PizzaCard key={pizza._id} pizza={pizza} hideAddToCartButton={hideAddToCartButton}/>;
        })}
      </div>
    </div>
  );
};

export default PizzaList;
