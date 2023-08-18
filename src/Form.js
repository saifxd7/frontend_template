import React, { useState } from "react";

function Form(props) {
  // Initialize state for the form data and form submission status
  const [product, setProduct] = useState(props.data);
  const [submitted, setSubmitted] = useState(false);

  // Handle form input changes
  const changeFormData = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    // Check if the form is valid before calling the 'add' function
    if (
      product.name.length >= 5 &&
      product.price !== "" &&
      product.description !== ""
    ) {
      props.addProduct(product); // Call the 'add' function passed as a prop
    }
  };

  // Handle form cancellation
  const handleCancel = (event) => {
    event.preventDefault();
    props.close(); // Call the 'close' function passed as a prop
  };

  return (
    <div className="form-overlay">
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control mt-2"
            value={product.name}
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={changeFormData}
          />
          {submitted && product.name.length < 5 && (
            <span className="text-danger">
              Product name must be at least 5 characters
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            className="form-control mt-2"
            value={product.description}
            type="text"
            name="description"
            placeholder="Enter description"
            onChange={changeFormData}
          />
          {submitted && product.description === "" && (
            <span className="text-danger">Product description required</span>
          )}
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            className="form-control mt-2"
            value={product.price}
            onChange={changeFormData}
            type="number"
            name="price"
            placeholder="Enter Price"
          />
          {submitted && product.price === "" && (
            <span className="text-danger">Product Price required</span>
          )}
        </div>
        <button className="btn btn-primary float-end" onClick={handleSubmit}>
          Send
        </button>
        <button className="btn btn-danger float-end" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Form;
