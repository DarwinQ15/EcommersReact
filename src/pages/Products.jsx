import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Products = () => {
    const dispatch = useDispatch();
    const purchases = useSelector(state=> state.purchases)
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1>hola :D</h1>
            <ListGroup>
                {
                    purchases.map(purchase=>(
                        <ListGroup.Item>
                            {purchase.cart.products.map(product=>(
                                <div key={product.id} onClick={()=> navigate(`/new/${product?.id}`)}>
                                    <p>{product.title}</p>
                                </div>
                            ))}
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    );
};

export default Products;