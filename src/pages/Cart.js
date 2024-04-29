import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const Cart = () => {
    // 장바구니 state가 App, Detail, Cart 컴포넌트 모두 필요하면 어디 만들어야함? - App
    // 이 때 props로 전달하는 게 귀찮으므로 Redux라는 라이브러리를 사용할 것.

    // let state = useSelector((state) => { return state.stock })
    // <- state 안에 있던 모든 state를 뜻함.
    // 따라서 편하게 쓰려면 useSelector((state)=>{return state.user}) 와 같은 방식으로
    // 필요한 state인 user만 가져와서 사용 가능하다. 
    // { return }은 생략할 수 있으므로
    // useSelector((state)=> state.stock)  <= 이런 식으로도 사용 가능

    let item = useSelector((state) => { return state.item })
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                {
                    item.map(function (a, i) {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td>{item[i].id}</td>
                                    <td>{item[i].name}</td>
                                    <td>{item[i].count}</td>
                                    <td>안녕</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </div>
    );
};

export default Cart;