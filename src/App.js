import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
// * App.js에서 이미지 가져오는 법. 내가 짓고 싶은 이름으로 변수명 작명하고 from 다음에
// 이미지의 경로 작성.
import backImg from './img/bg.png';
import { useState } from 'react';
import data from './data';
//  import shoes1 from './img/shoes1.jpg';

function App() {
  
  let [shoes, setShoes] = useState(data);
  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container style={{ marginLeft: '0px' }}>
          <Navbar.Brand href="#home">Funxtion</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className='main-bg' style={{ backgroundImage: 'url(' + backImg + ')' }}></div>

      <div className='container'>
        <div className='row'>
          {shoes.map(function(item, index) {
            return (
            <Product shoes={shoes} index={index} />
          )})}
          
          
            
        </div>
      </div>
    </div>
  );
}


const Product = (props) => {
  return (
    <div className='col-md-4'>
      {/* 만약 외부에 호스팅해둔 이미지라면 이미지 절대주소를 src에 넣으면 됨.
        ex) https://codingapple1.github.io/shop/shoes1.jpg */}
      {/* 일일히 import해주는 게 귀찮은 경우 public 폴더에 이미지를 넣어서
        사용할 수도 있다. 그 때는 그냥 "/이미지경로"로 적어주면 됨!  
        서브 경로에 이미지 파일 넣을 시 process.env.PUBLIC_URL을 앞에 붙여줌!*/}
      <img src={props.shoes[props.index].image} width="80%" />
      <h4>{props.shoes[props.index].title}</h4>
      <p>{props.shoes[props.index].price}</p>
    </div>
  );
};


export default App;
