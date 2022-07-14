import './App.css';
import jsq from './products.json'
import { Button, Container, Form, Nav, Navbar, NavDropdown, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import categori from './categories.js'

function App() {
  const [market, setMarket] = useState('');
  const [search, setSearch] = useState('')
  const [disc, setDisc] = useState(false);
  const [active, setActive] = useState(null)


  const s = jsq.filter(a => {
    if (disc) {
      return a.discount !== null
    } else if (active !== null) {
      return a.category_id === active.id
    }
    if (a.title.toLowerCase().includes(market.toLowerCase())) {
      return true
    } else {
      return false
    }
  })

  const seachBtn = () => {
    setMarket(search)
    setSearch((prev) => {
      return prev = ''
    })
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">ProMarket</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1" onClick={() => {

                setDisc(false)
                setActive(null)
                setMarket('')

              }}>Главная</Nav.Link>
              <Nav.Link href="#action2" onClick={() => {
                
                setDisc(true)
                setActive(null)

              }}>Скидки</Nav.Link>
              <NavDropdown title="Категории" id="navbarScrollingDropdown">

                {categori.map(b => (
                  <NavDropdown.Item onClick={() => {
                    setActive(b)
                    setDisc(false)
                    setMarket('')
                  }}>{b.short_title}</NavDropdown.Item>
                ))}

              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Поиск"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-success" onClick={seachBtn}>Поиск</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {!active ? null : <h4>{active.title}</h4>}
      {disc === true ? <h4>Скидки</h4> : ''}
      {!market ? null : <h4>Результаты поиска {s.length === 0 ? 'не найден' : s.length}</h4> }

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {s.map(g => {
          return (
            <Card className='card' style={{ width: '18rem' }}>
              {g.discount !== null ? <div className='discount'><h6>{g.discount}%</h6></div> : ''}
              <Card.Img /><div style={{
                width: "100%",
                height: 150,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(https://api.office.promarket.besoft.kg/${g.main_image.path.original})`,
              }} /><Card.Body>
                <Card.Title><h6 style={{ color: 'black' }} >{g.title}</h6></Card.Title>
                <Button className='button' variant="primary">{g.price} сом {g.discount !== null ? <s>{g.price - (g.price * g.discount / 100)} сом</s> : ''}</Button>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </>
  );
}

export default App;
