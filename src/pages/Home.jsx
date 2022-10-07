import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import productsSlice, { getProductsThunk } from '../store/slices/products.slice';
import { Button, InputGroup, Form, Row, Col, ListGroup, Card } from 'react-bootstrap';
import '../styles/home.css'
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading.slice';


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const productsList = useSelector(state => state.products)

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [newProducts, setNewProducts] = useState([])

    const [seachValue, setSeachValue] = useState('')

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    console.log(categories);

    useEffect(() => {
        setNewProducts(productsList)
    }, [productsList])

    const filterCategory = (categoryId) => {
        dispatch(setIsLoading(true))
        //alert(categoryId);
        const filtered = productsList.filter((product) => product.category.id === categoryId)
        setNewProducts(filtered)
        setTimeout(() => {
            dispatch(setIsLoading(false))
        }, 500)
    }

    const searchProduct = () => {
        const filtered = productsList.filter(
            product => product.title.includes(seachValue)
        )
        setNewProducts(filtered)
    }

    return (
        <div>
            <Row>
                <Col lg={2}>
                    <ListGroup>
                        {categories.map((category) => (
                            <ListGroup.Item
                                key={category.id}
                                onClick={() => filterCategory(category.id)}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search Product"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setSeachValue(e.target.value)}
                            value={seachValue}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={searchProduct}
                        >
                            Button
                        </Button>
                    </InputGroup>

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
                </Col>
            </Row>
        </div>
    );
};

export default Home;