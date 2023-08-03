import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import "./DymanicForm.scss";

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

  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";

  /*   return (
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
}; */

  return (
    <div className="mt-10 px-72">
      <div className="flex flex-col gap-3 items-center mb-5">
        {items.map((item, index) => (
          <div key={index} className="flex gap-8 items-center justify-center">
            <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
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
              className={inputClassName}
              placeholder="Price"
            />

            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              className={inputClassName}
              placeholder="Quantity"
            />

            <button
              className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
              onClick={() => handleRemoveItem(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <div>
          <button 
          className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
          onClick={() => handleAddItem()}>
            Add New Size
          </button>
        </div>
      </div>
      <ToastContainer className="toast-container-center" />
    </div>
  );
};

export default Dymanicform;
