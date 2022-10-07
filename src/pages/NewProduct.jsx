import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductThunk } from '../store/slices/carProducts.slice';
import { deleteProduct } from '../store/slices/products.slice';
import '../styles/newProduct.css'


const NewProduct = () => {
    const [newProducts, setNewProducts] = useState([])
    const [price, setPrice] = useState(0)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { id } = useParams();

    const productList = useSelector((state) => state.products)

    const productsDetail = productList.find((products) => products.id === Number(id))

    useEffect(() => {
        setNewProducts(productList)
    }, [productList])

    const productNew = productList.filter(
        product => product.category.id === productsDetail
    )

    console.log(productList);

    console.log(productsDetail);

    useEffect(() => {
        setPrice(0)
    }, [id])

    const addProductCart = () => {
        alert("price: " + price);
        const cart = {
            id: id,
            quantity: price
        }
        dispatch(getProductThunk(cart));
    };

    useEffect(() => {
        let total = 0
    }, [])

    const removeProduct = (data) => {
        dispatch(deleteProduct(data.id))
    }

    return (
        <div>
            <ul>
                {
                    productNew.map(product => (
                        <li>
                            <Link to={`/new/new/${product.category.id}`} />
                        </li>
                    ))
                }
            </ul>
            <Row xs={1} md={2} xl={3} className="g-2">
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={productsDetail?.productImgs[0]}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={productsDetail?.productImgs[1]}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={productsDetail?.productImgs[2]}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
                <div>
                    <h1>
                        <h5>{productsDetail.title}</h5>
                    </h1>
                    <p>{productsDetail.description}</p>
                </div>
            </Row>
            <div className='btn-add'>
                <Button className="me-3" onClick={() => setPrice(price - 1)}>-</Button>
                {price}
                <Button className="ms-3" onClick={() => setPrice(price + 1)}>+</Button>
                <br />

                <Button className='mt-3' onClick={addProductCart}>add product</Button>
            </div>

            <h1>MORE PRODUCTS</h1>
            
            <Row xs={1} md={2} xl={3} className="g-2">
                        {newProducts.map((product) => (
                            <Col className='col' key={product.id}>
                                <Card className='card' onClick={() => navigate(`/new/${product.id}`)}>
                                    <div className='image'>
                                        <Card.Img className='img over' variant="top" src={product.productImgs[1]} />
                                        <Card.Img className='img' variant="top" src={product.productImgs[0]} />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                    </Card.Body>
                                    <Card.Body>
                                        <Card.Text>Price</Card.Text>
                                        <Card.Text>{product.price}</Card.Text>
                                    </Card.Body>
                                    <div className='car-product'>
                                        <i class='bx bx-cart'></i>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

        </div>
    );
};

export default NewProduct;