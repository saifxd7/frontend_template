import React, { useEffect, useState } from "react";
import ProductList from "./productList";
import { deleteData, getData, putData, postData } from "./api";
import ProductForm from "./Form";

const App = () => {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [initialForm, setInitialForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    const response = await getData();
    setProducts(response.data);
  }

  async function addProduct(product) {
    let data = {
      name: product.name,
      description: product.description,
      price: product.price,
    };

    if (edit) {
      await putData(product.id, data);
    } else {
      await postData(data);
    }

    getAllProducts();
    setOpenForm(false);
  }

  async function deleteProduct(id) {
    await deleteData(id);
    getAllProducts();
  }

  function editProduct(value) {
    setEdit(true);
    setOpenForm(true);
    setInitialForm(value);
  }

  function closeForm() {
    setOpenForm(false);
  }

  function showForm() {
    if (edit) {
      setInitialForm({ name: "", price: "", description: "" });
    } else {
      setInitialForm((prevState) => ({ ...prevState }));
    }

    setOpenForm(true);
    setEdit(false);
  }

  return (
    <div className="wrapper m-5 w-50">
      <h2 className="text-primary text-center">Gadgets Database</h2>
      <button className="btn btn-primary float-end" onClick={showForm}>
        Add new
      </button>
      <ProductList
        products={products}
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      ></ProductList>
      {openForm && (
        <ProductForm
          addProduct={addProduct}
          data={initialForm}
          close={closeForm}
        />
      )}
    </div>
  );
};

export default App;
