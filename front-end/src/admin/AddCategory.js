import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCategory } from './apiAdmin';
import { Link } from "react-router-dom";


const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //destructor user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = event => {
        setError("");
        setName(event.target.value);

    };

    const clickSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //make request to api to create category
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setError("");
                    setSuccess(true);
                }
            });
    };

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} category is created </h3>
        }

    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>
    );


    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    value={name}
                />

            </div>
            <button className="btn btn-outline-primary">
                Create Category
            </button>
        </form>

    );

    return (
        <Layout
            title="Add new category"
            description={`G'day ${user.name}`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>

            </div>


        </Layout>
    );
};

export default AddCategory;