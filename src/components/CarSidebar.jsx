import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCarThunk, purcharseCartThunk } from '../store/slices/carProducts.slice';


const CarSidebar = ({show, handleClose}) => {
    const dispatch = useDispatch();

    const car = useSelector(state=> state.car)

    useEffect(()=>{
        dispatch(getCarThunk())
    },[])

    const [total, setTotal] = useState('')

    // useEffect(()=>{
    //     let total = 0
    //     cart.ForEach(product => {
    //         total += product.price * price.productsInCart.quantity
    //     })
    //     setTotal
    // },[])

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Products</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                    {car.map(cart=>(
                        <ListGroupItem key={cart.id}>
                            <Link to={`/new/${cart.id}`}>
                                {cart.title}
                            </Link>
                            <h2>Price: {cart.price}</h2>
                            <h3>Quantity: {cart.productsInCart.quantity}</h3>
                        </ListGroupItem>
                    ))}
                </ListGroup>
                <Link to={'/products'}>
                    <Button onClick={()=> dispatch(purcharseCartThunk())}>Checkout</Button>
                </Link>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CarSidebar;