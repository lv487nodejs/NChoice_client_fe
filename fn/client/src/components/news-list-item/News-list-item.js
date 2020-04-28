import React from 'react'
import './News-list-item.css';
import { Card, Image } from 'react-bootstrap'

const NewsListItem = () => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString("en-US", options)
    return (
        <> 
            <Card border="light" className="news-card">
                <Card.Img className="card-img" variant="top" src="/images/oops.jpg" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <div>
                    <small id="loading" className="author">by Volodymyr Trach</small>
                    <span> ___________  </span>
                    <Image src="images/dollar.png" roundedCircle />
                </div>
                    <small className="text-muted">{date}</small>
                </Card.Footer>
            </Card>
            <Card border="light" className="news-card">
                <Card.Img className="card-img" variant="top" src="/images/oops.jpg" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <div>
                    <small id="loading" className="author">by Volodymyr Trach</small>
                    <span> ___________  </span>
                    <Image src="images/dollar.png" roundedCircle />
                </div>
                    <small className="text-muted">{date}</small>
                </Card.Footer>
            </Card>
            <Card border="light" className="news-card">
                <Card.Img className="card-img" variant="top" src="/images/oops.jpg" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <div>
                    <small id="loading" className="author">by Volodymyr Trach</small>
                    <span> ___________  </span>
                    <Image src="images/dollar.png" roundedCircle />
                </div>
                    <small className="text-muted">{date}</small>
                </Card.Footer>
            </Card>
            <Card border="light" className="news-card">
                <Card.Img className="card-img" variant="top" src="/images/oops.jpg" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <div>
                    <small id="loading" className="author">by Volodymyr Trach</small>
                    <span> ___________  </span>
                    <Image src="images/dollar.png" roundedCircle />
                </div>
                    <small className="text-muted">{date}</small>
                </Card.Footer>
            </Card>
            <Card border="light" className="news-card">
                <Card.Img className="card-img" variant="top" src="/images/oops.jpg" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <div>
                    <small id="loading" className="author">by Volodymyr Trach</small>
                    <span> ___________  </span>
                    <Image src="images/dollar.png" roundedCircle />
                </div>
                    <small className="text-muted">{date}</small>
                </Card.Footer>
            </Card>
            </>
    )
}

export default NewsListItem
