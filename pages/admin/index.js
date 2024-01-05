import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products }) => {
  const [productsList, setProductsList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleEdit = async (product) => {};
  const handleChangeStage = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`
      );
      const allOrders = orderList.map((order) => {
        if (order._id === id) {
          return res.data;
        }
        return order;
      });
      setOrderList(allOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
      );
      if (res) {
        const allProduct = productsList.filter((pro) => pro._id !== id);
        setProductsList(allProduct);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productsList?.map((product) => (
              <tr className={styles.trTitle} key={product._id}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button
                    className={styles.buttonDelete}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.buttonDelete}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Oders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList?.map((order) => (
              <tr className={styles.trTitle} key={order?._id}>
                <td>{order?._id?.slice(0, 5)}...</td>
                <td>{order?.customer}</td>
                <td>${order?.total}</td>
                <td>{order?.method === 0 ? "CASH" : "PAID"}</td>
                <td>{status[order?.status]}</td>
                <td>
                  <button
                    className={styles.stageButton}
                    disabled={order?.status === 2}
                    onClick={() => handleChangeStage(order?._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const products = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  );
  const orders = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders`
  );

  return {
    props: {
      orders: orders.data,
      products: products.data,
    },
  };
};

export default Index;
