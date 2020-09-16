import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data.data);
            }
        });
    };

    useEffect(() => {
        init()
    }, []);

    return (
        <Layout
            title="Shop"
            className="container-fluid"
            description="Serach and find products"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox categories={categories} />
                    </ul>

                </div>
                <div className="col-8">

                </div>

            </div>


        </Layout>
    );

};

export default Shop;