import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, list } from "./apiCore";

const Search = () => {
  const [data, setdata] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setdata({ ...data.data, categories: data.data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
              console.log(response.error)
          } else {
            setdata({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const handleChange = (name) => (event) => {
    setdata({ ...data, [name]: event.target.value, searched: false });
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">Pick Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="serach"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}
      {JSON.stringify(results)}
      </div>
    </div>
  );
};

export default Search;
