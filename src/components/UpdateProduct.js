import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

function UpdateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
const navigate=useNavigate();
    const params = useParams();

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                let result = await fetch(`http://localhost:5000/product/${params.id}`,{
                    headers: {
                        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                });
                result = await result.json();
                setName(result.name);
                setPrice(result.price);
                setCategory(result.category);
                setCompany(result.company);
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        getProductDetails();
    }, [params]);

    const updateProduct = async () => {
        try {
            const updatedProduct = { name, price, category, company };
            await fetch(`http://localhost:5000/product/${params.id}`, {
                method: 'PUT', // or 'POST' if appropriate
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify(updatedProduct),
                
            });
            console.log('Product updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='product'>
            <h1>Update Product</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder='Enter product name'
                        className='inputBox'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />

                    <input
                        type="text"
                        placeholder='Enter product price'
                        className='inputBox'
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                    />

                    <input
                        type="text"
                        placeholder='Enter product category'
                        className='inputBox'
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                    />

                    <input
                        type="text"
                        placeholder='Enter product company'
                        className='inputBox'
                        value={company}
                        onChange={(e) => { setCompany(e.target.value) }}
                    />

                    <button onClick={updateProduct} className='appButton'>Update Product</button>
                </>
            )}
        </div>
    );
}

export default UpdateProduct;
