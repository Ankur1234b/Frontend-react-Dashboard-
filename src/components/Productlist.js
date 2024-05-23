import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Ensure react-router-dom is installed and imported

function Productlist() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []); // Dependency array to ensure the effect runs only once

    const getProducts = async () => {
        try {
            let result = await fetch('http://localhost:5000/products', {
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            if (result.ok) {
                setProducts(products.filter(product => product._id !== id));
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            try {
                let result = await fetch(`http://localhost:5000/search/${key}`, {
                    headers: {
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                });
                result = await result.json();
                if (result) {
                    setProducts(result);
                }
            } catch (error) {
                console.error('Failed to search products:', error);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <input type="text" className="search-product-box" placeholder='Search Product'
                onChange={searchHandle}
            />
            <ul className='header'>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {products.length > 0 ? (
                products.map((item, index) => (
                    <ul key={item._id} className='product-item'>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                ))
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
}

export default Productlist;
