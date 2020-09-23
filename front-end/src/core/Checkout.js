import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { emptyCart, removeItem } from "./cartHelpers";
import { getBraintreeClientToken, processPayment } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to check out</button>
      </Link>
    );
  };

  const buy = () => {
    //sent the nonce to your server
    // nonce = data.instance.requestPaymentMethod
    let nonce;
    let getnonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        // once you have nonce set nonce as payment method
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            setData({ ...data, success: response.success });
            emptyCart(() => {
              
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault'
              }
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! yout payment was successfull.
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
