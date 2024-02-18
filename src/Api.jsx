import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Api = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    view();
  }, []);

  const view = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const AddProduct = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
        <div className="container">
          <form className='w-50 m-auto'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">Title</label>
                    <input type="text" className="form-control" name="title"  value={newProduct.title}  onChange={handleInputChange}/>
               </div>
               <div className="mb-3">
                   <label htmlFor="exampleInputEmail1" className="form-label text-white">Price</label>
                   <input type="text" className="form-control" name="price" value={newProduct.price} onChange={handleInputChange}/>
                </div>  
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">Description</label>
                    <input type="text" className="form-control" name="description" value={newProduct.description}  onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">Image URL</label>
                    <input type="text" className="form-control" name="image" value={newProduct.image} onChange={ handleInputChange}/>
               </div> 
               <button type='button' className="btn btn-primary" onClick={AddProduct}>Add</button>
           </form>
           </div>   
      <div className='d-flex flex-wrap justify-content-center'>
               {
                    products.map((val) => {
                        return (
                            <div className="card m-3 p-3" style={{ width: '18rem' }}>
                                <img src={val.image} className="card-img-top" alt="..." style={{ height: "200px", backgroundSize: "cover" }} />
                                <div className="card-body">
                                <p className="card-text">{val.price}</p>
                                    <h5 className="card-title">{val.title}</h5>
                                    <p className="card-text"style={{height:"200px",overflow:"hidden"}}>{val.description}</p>
                                    <a href="#" className="btn btn-primary" onClick={() => deleteData(val.id)}>Delete</a>
                                </div>
                            </div>

                        )
                    })
                }
            </div >
        </div>    
  
  );
};

export default Api;
