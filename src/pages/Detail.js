import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import {Context1} from './../App'

// import styled from 'styled-components';

// // 하나의 스타일이 입혀진 컴포넌트를 만드는 것.
// // props로 컴포넌트 재활용 가능.
// let YellowBtn = styled.button`
//     background : ${ props => props.bg };
//     color : ${props => props.bg == 'blue' ? 'white' : 'black'}; 
//     padding : 10px;
// `
// // 간단한 프로그래밍이 가능하다.(조건문처럼)
// let NewBtn = styled.button(YellowBtn);  // <- 방식으로 기존 스타일 복사 가능.

// 클래스 컴포넌트의 경우
// class Detail2 extends React.Component {
//     componentDidMount(){
//         // 컴포넌트 mount시 여기 코드 실행됨.
//     }
//     componentDidUpdate(){
//         // 컴포넌트 update시 여기 코드 실행됨
//     }
//     componentWillUnmount(){
//         // 컴포넌트 unmount시 여기 코드 실행됨.
//     }
// }


const Detail = (props) => {
   // 보관함 해체해주는 함수 useContext
   let {재고, shoes} = useContext(Context1)
    // useEffect 안의 코드는 html이 랜더링 완료된 후에 동작함.
   
    const [alert1, setAlert1] = useState(true);
    let [count, setCount] = useState(0);

    useEffect(() => {
        // mount, update 시 여기 코드 실행됨.
        // for (var i=0; i< 10000; i++) {
        //     console.log(1);
        // }
        let a = setTimeout(() => { setAlert1(false) }, 2000)
        console.log(2);
        return () => {  // <- 이 함수를 cleanup function 이라고 부른다!
            // useEffect 동작 전에 실행시키고 싶은 코드 작성
            console.log(1)
            clearTimeout(a) // 타이머 제거 함수

        }
    }, [])

    useEffect(() => { })  //1. 재랜더링마다 코드실행하고 싶으면
    useEffect(() => { }, [])   //2. mount시에만 코드실행하고 싶으면
    useEffect(() => {
        return () => {
            //3. unmount시 1회 코드 실행하고 싶으면
        }
    }, [])
    //4. useEffect 실행 전에 뭔가 실행하려면 언제나 return()=>{}
    useEffect(() => { }, [count]) //5.mount시 + 특정 state 변경시에만 실행하려면 [state명] 작성.

    // useEffect 바깓에 아래 반복문을 쓰면, 반복문이 먼저 실행된 후에 아래쪽 html이 랜더링 됨.
    // for (var i=0; i< 10000; i++) {
    //     console.log(1);
    // }
    let [num, setNum] = useState('')
    useEffect(() => {
        if (isNaN(num) == true) {
            alert('숫자만 입력하라고!')
        }
    }, [num])


    // 현재 url의 파라미터 정보들이 남음.
    let { id } = useParams();
    // url에 숫자 외에 이상한 문자가 들어간 경우. '찾는 상품이 없습니다.' 같은 문구를 보여주게 조건문 쓰면 됨.

    // url에 입력한 숫자와 props.shoes.id의 번호를 일치시켜주는 법
    let findProduct = props.shoes.find(function (x) {
        // find()는 array 뒤에 붙일 수 있으며 return 조건식 적으면 됨. 그러면 조건식에 맞는 자료 남겨줌.
        // find() 콜백함수에 파라미터 넣으면 array자료에 있던 자료를 뜻함. x라고 작명.
        // x.id == id 라는 조건식을 통해 array자료.id == url에입력한번호 일 경우 결과를 변수에 담아줌.
        // 그럼 {상품1개} 이런게 남을듯?
        return x.id == id;
    })

    let [tab, setTab] = useState(0);
    let [show, setShow] = useState('');
    useEffect(()=>{
        setShow('opacE')
    }, [])
    return (
        <div className={"container opacS "+show}>
            {/* <YellowBtn bg="blue">버튼</YellowBtn>
            <YellowBtn bg="orange">버튼</YellowBtn> */}
            {
                alert1 == true ? <div className='alert alert-warning'>2초이내 구매시 할인</div> : null
            }
            {/* <button onClick={() => { setCount(count + 1) }}>버튼</button> */}
            {/* <span>{count}</span> */}
            <div className="row">
                <div className="col-md-6">
                    {/* shoes[현재url에 입력한숫자]를 가져다 쓰기 위해 useParams 훅 사용 */}
                    <img src={findProduct.image} width="100%" />
                </div>
                <input onChange={(e) => { setNum(e.target.value) }}></input>
                <div className="col-md-6">
                    <h4 className="pt-5">{findProduct.title}</h4>
                    <p>{findProduct.content}</p>
                    <p>{findProduct.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
            {/* 기본으로 눌려 있는 버튼 defaultActiveKey */}
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>

        </div>
    );
};
// 팁1) props.어쩌구가 귀찮으면 { } 안에 props가 전달한 이름들을 작성.
// function TabContent({tab, props2}) {}
function TabContent(props) {
    let {재고} = useContext(Context1);
    // if(props.tab == 0) {
    //     return <div>내용0</div>
    // }
    // if(props.tab == 1) {
    //     return <div>내용1</div>
    // }
    // if(props.tab == 2) {
    //     return <div>내용2</div>
    // }
    const [fade, setFade] = useState('');
    useEffect(()=>{
        // setFade('end')
        let a = setTimeout(()=>{setFade('end')}, 100)   // 타이머(시간차)를 설정해주는 과정이 필요함.
        // state 변경하는 함수들이 근처에 있는 경우 그 함수들을 합쳐서 최종적으로 한 번만 state를
        // 변경해준다. (state변경함수를 모아서 딱 한번만 재랜더링 해줌.)
        // --> 이 현상을 "automatic batching" 이라고 부름.
        return () => {  // clean-up function으로 end를 떼줌.
            setFade('');
            clearTimeout(a);
        }
    }, [props.tab])
    // 팁2) if문 없이 같은 내용 코드 작성법
    return (<div className={'start '+fade} >
        {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][props.tab]}
    </div>)
}


export default Detail;