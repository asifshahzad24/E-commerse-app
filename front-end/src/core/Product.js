import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState({});
  const [relatedProduct, setrelatedProduct] = useState([]);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      setProduct(data);
      // fetch related product
      listRelated(data._id).then((related) => {
        if (related.error) {
          setError(related.error);
        } else {
          setrelatedProduct(related);
        }
      });
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      className="container-fluid"
      description={product && product.description && product.description}
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Product</h4>
          {relatedProduct.map((product, i) => (
            <div className="mb-3">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
