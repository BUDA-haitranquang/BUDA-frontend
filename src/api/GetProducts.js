import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { LOAD_PRODUCTS } from '../graphQl/queries';

export default function GetProducts() {
    const {error, loading, data} = useQuery(LOAD_PRODUCTS);
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        if(data){
            console.log(data.productsByUser);
            setProducts(data.productsByUser);
        }
        
    }, [data])
    return (
        <div>
            { products.map((row) => <h1>{row.name}</h1>)}
        </div>
    )
}
