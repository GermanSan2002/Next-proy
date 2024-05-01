import axios from 'axios'
import React from 'react'
import Buttons from './buttons';

async function getProduct(id){
    const { data } = await axios.get(`http://localhost:3000/api/productos/`+ id);
    return data;
}

async function ProductDetailPage({ params }) {
    const product = await getProduct(params.id);

    return (
        <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <div className="flex w-4/6 h-4/6 justify-center">
                <div className="p-6 bg-white w-1/3 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-3 text-slate-900">{product.name}</h3>
                        <h4 className="text-4xl font-bold text-slate-900">{product.price}$</h4>
                        <p className="text-slate-700">{product.description}</p>
                    </div>
                    {/* Botones en la parte inferior derecha */}
                    <div className="flex justify-end">
                        <Buttons productId={params.id}/>
                    </div>
                </div>
            <img src="https://i.imgur.com/zryxaH8.jpg" className="w-3/6" alt="" />
          </div>
        </section>
      );
}

export default ProductDetailPage