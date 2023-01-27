import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '@/redux/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const amount = cart.total;
  const currency = 'USD';
  const style = { layout: 'vertical' };

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handlePayment = () => {};

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/orders`, data);
      res.status === 201 && router.push('/orders/' + res.data._id);
      dispatch(reset());
    } catch (error) {
      console.log(error);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && (
          <div className={styles.spinner}>Loading</div>
        )}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              const shipping = details?.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart?.products?.map((product) => (
              <tr className={styles.tr} key={product._id + cart.total}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout='fill'
                      objectFit='cover'
                      alt=''
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extraOptions.map((val) => val.text).toString()}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>
                    ${product.prices[product.size]}
                  </span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>${product.price}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart?.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart?.total}
          </div>
          {open ? (
            <div className={styles.paypalWrapper}>
              <button className={styles.cashOnDelivery} onClick={handlePayment}>
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'Aat0xP-muCgIugSEvLMvuu4Bs072KyV4vlSnOS-c4tDZnHuTx1bboK0WGLM7I3IKzoM0aYz8MQqNSrgX',
                  components: 'buttons',
                  currency: currency,
                  'disable-funding': 'venmo,paylater,card',
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
