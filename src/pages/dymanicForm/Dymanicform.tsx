import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./DymanicForm.scss";

const Dymanicform = () => {
  const [items, setItems] = useState([{ size: "", price: "", quantity: "" }]);

  useEffect(() => {
    if (items.length === 0) {
      setItems([{ size: "", price: "", quantity: "" }]);
    }
  }, [items]);

  const handleAddItem = () => {
    const isAnyFieldBlank = items.some(
      (item) => item.size === "" || item.price === "" || item.quantity === ""
    );

    if (isAnyFieldBlank) {
      toast.error("Please fill all the fields before adding a new item.", {
        position: "top-center",
        className: "toast-container-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setItems([...items, { size: "", price: "", quantity: "" }]);
  };

  const handleChange = (index: any, field: any, value: any) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleRemoveItem = (index: any) => {
    const currentItems = [...items];
    currentItems.splice(index, 1);
    setItems(currentItems);
  };
  return (
    <div className="container">
      <div className="card">
        <h2>Customize Product Variants</h2>

        {items.map((item, index) => (
        
          <div key={index} className="card-items">
              <select
              value={item.size}
              onChange={(e) => handleChange(index, "size", e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>

            <input 
            type="text" 
            value={item.price} 
            onChange={(e) => handleChange(index, "price", e.target.value)}
            placeholder="Price" />
         
            <input 
            type="number" 
            value={item.quantity} 
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
            placeholder="Quantity" />

            <button
              className="button remove-items"
              onClick={() => handleRemoveItem(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <div>
          <button className="button add-items" onClick={() => handleAddItem()}>
            Add New Size
          </button>
        </div>
      </div>
      <ToastContainer className="toast-container-center" />
    </div>
  );
};

export default Dymanicform;


