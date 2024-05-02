"use client"
import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter, useParams } from "next/navigation";


function ProductForm() {
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
    });

    const [file,setFile] = useState(null)

    const form = useRef(null);
    const router = useRouter();
    const params = useParams();

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
      if(params.id){
        axios.get('/api/productos/'+ params.id)
        .then(res => {
          setProduct({
            name: res.data.name,
            price: res.data.price,
            description: res.data.description,
          })
        })
      }
    }, [])

    const hadleSubmit= async (e) => {
        e.preventDefault()

        if(!params.id){
          const res = await axios.post('/api/productos', product)
          console.log(res)
        } else {
          const res = await axios.put('/api/productos/'+params.id, product)
          console.log(res)
        }

        form.current.reset()
        router.refresh();
        router.push("/products");
    };

  return (
    <form 
    id='newProduct'
    className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
    onSubmit={hadleSubmit}
    ref={form}>
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Name:
        </label>
        <input
          name="name"
          type="text"
          placeholder="name"
          onChange={handleChange}
          value={product.name}
          className="shadow appearance-none  text-gray-700 border rounded w-full py-2 px-3"
          autoFocus
        />

        <label
          htmlFor="price"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Price:
        </label>
        <input
          name="price"
          type="text"
          placeholder="00.00"
          onChange={handleChange}
          value={product.price}
          className="shadow appearance-none  text-gray-700 border rounded w-full py-2 px-3"
        />

        <label
        htmlFor="name"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Description:
      </label>
      <textarea
        name="description"
        rows={3}
        placeholder="description"
        onChange={handleChange}
        value={product.description}
        className="shadow appearance-none  text-gray-700 border rounded w-full py-2 px-3"
      />

      <label
        htmlFor="image"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Product Image:
      </label>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save Product
      </button>
    </form>
  )
}

export default ProductForm