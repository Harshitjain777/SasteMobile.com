import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddProduct =  () => {
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [contact , setContact]=useState('');
    const [image, setImage] = useState(null);
    const auth=localStorage.getItem('user');
    const email=JSON.parse(auth).email;
    const navigate=useNavigate();

    const handleDescChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.split(' ').length <= 200) {
            setDesc(inputValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('brand', brand);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('desc', desc);
        formData.append('contact' , contact);
        formData.append('image', image);
        formData.append('email' , email);
        const result= await axios.post(
            'http://localhost:5000/addproduct',
            formData,
            {
                headers:{'Content-Type':'multipart/form-data'},
            }
          )
        alert("Product added Successfully");
        
    }

    return (
        <div className="container">
            <h2>Add a Mobile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input id="brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Device Name:</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price in Rupees:</label>
                    <input id="price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Short description about Phone:</label>
                    <textarea id="desc" value={desc} onChange={handleDescChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Contact Number</label>
                    <input id="price" type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit">Add Mobile</button>
            </form>
        </div>
    )
}

export default AddProduct;
