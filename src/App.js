import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
// * App.js에서 이미지 가져오는 법. 내가 짓고 싶은 이름으로 변수명 작명하고 from 다음에
// 이미지의 경로 작성.
import backImg from './img/bg.png';
import { createContext, useState } from 'react';
import data from './data';
//  import shoes1 from './img/shoes1.jpg';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail';
import About from './pages/About';
import Event from './pages/Event';
import axios from 'axios';
import Cart from './pages/Cart';

// state 보관함(context)
export let Context1 = createContext()

function App() {

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12])
  let navigate = useNavigate();
  let [clickCount, setClickCount] = useState(0);
  let [loading, setLoading] = useState('')

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container style={{ marginLeft: '0px' }}>
          <Navbar.Brand href="#home">Funxtion</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }} >Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg' style={{ backgroundImage: 'url(' + backImg + ')' }}></div>
            <div className='container'>
              <div className='row'>
                {shoes.map(function (item, index) {
                  return (
                    <div key={index}>
                    <Card shoes={shoes} index={index} navigate={navigate} />
                    </div>
                  )
                })}
              </div>
            </div>
            <div>{loading}</div>
            <button align='center' onClick={() => {
              if (clickCount === 0) {
                // 로딩중 UI 보이기~
                setLoading('로딩중입니다!')
                axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((result) => {

                    let newShoes = [...shoes, ...result.data];
                    // for(let i=0; i<result.data.length; i++) {
                    //   newShoes.push(result.data[i]);
                    // }
                    setShoes(newShoes);
                    // 로딩중 UI 숨기기~
                    setLoading('');
                    setClickCount(clickCount + 1);

                  })  // 실제 가져온 데이터만 콘솔에 출력.
                  .catch(() => {
                    console.log('실패함 ㅅㄱ')
                  })
                // 동시에 url 여러 개 요청 시
                // Promise.all([axios.get('/url1'), axios.get('/url2')])
                // .then(()=>{

                // })
                // fetch를 쓰면 json으로 변환해주는 과정이 필요하다!!
                // fetch('https://codingapple1.github.io/shop/data2.json')
                // .then(result=>result.json())
                // .then(data=>{})
              } else if (clickCount === 1) {
                axios.get('https://codingapple1.github.io/shop/data3.json')
                  .then((result) => {

                    let newShoes = [...shoes, ...result.data];
                    // for(let i=0; i<result.data.length; i++) {
                    //   newShoes.push(result.data[i]);
                    // }
                    setShoes(newShoes);
                    setLoading('');
                    setClickCount(clickCount + 1);

                  })  // 실제 가져온 데이터만 콘솔에 출력.
                  .catch(() => {
                    console.log('실패함 ㅅㄱ')
                  })
              } else {
                alert('더 이상 상품이 없습니다!')
              }
            }
            }>더보기</button>
          </>
        } />
        {/* url 파라미터 (페이지 여러개 만들고 싶을 때)
          /detail/아무거나 라는 뜻. 
          ex) /detail/0, /detail/1 <- 이런식으로 뒤에 아무거나 써도 잘 접근됨.*/}
        <Route path='/detail/:id' element={
          <Context1.Provider value={{ 재고, shoes}}>
            <Detail shoes={shoes} />
          </Context1.Provider>} />

            <Route path='/about' element={<About />} >
              <Route path='member' element={<div>멤버임</div>} />
              <Route path='location' element={<About />} />
            </Route>
            {/* 위와 아래가 공통된 문법이다. */}
            {/* <Route path='/about/member' element={<About/>} />
        <Route path='/about/location' element={<About/>} /> */}
            <Route path='/event' element={<Event />} >
              <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
              <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
            </Route>
            <Route path="*" element={<div>없는페이지요</div>} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

    </div>
  );
}


const Card = (props) => {
  return (
    <div className='col-md-4'>
      {/* 만약 외부에 호스팅해둔 이미지라면 이미지 절대주소를 src에 넣으면 됨.
        ex) https://codingapple1.github.io/shop/shoes1.jpg */}
      {/* 일일히 import해주는 게 귀찮은 경우 public 폴더에 이미지를 넣어서
        사용할 수도 있다. 그 때는 그냥 "/이미지경로"로 적어주면 됨!  
        서브 경로에 이미지 파일 넣을 시 process.env.PUBLIC_URL을 앞에 붙여줌!*/}
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.index + 1) + ".jpg"} width="80%" height="70%" onClick={() => {
        props.navigate('/detail/' + props.index)
      }} />
      <h4>{props.shoes[props.index].title}</h4>
      <p>{props.shoes[props.index].price}</p>
    </div>
  );
};


export default App;
