import axios from 'axios'
import React from 'react'
import ProductCard from '@/components/ProductCard';

async function loadProducts(){
    const {data} = await axios.get('http://localhost:3000/api/productos')
    return data
}

async function ProductPage() {
    const products = await loadProducts()

  return (
    <div className='grid gap-4 grid-cols-4 px-4'>
        {products.map(product => (
            <ProductCard product={product} key={product.id} />
        ))}
    </div>
  )
}

export default ProductPage