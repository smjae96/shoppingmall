// object 자료 설명
// let a = ['kim', 20]
// let b = {name : 'kim', age : 20}
// b.age

let data = [

    {
        id: 0,
        title: "White and Black",
        content: "Born in France",
        price: 120000,
        image: "/shoes1.jpg"
    },

    {
        id: 1,
        title: "Red Knit",
        content: "Born in Seoul",
        price: 110000,
        image: "https://codingapple1.github.io/shop/shoes2.jpg"
    },

    {
        id: 2,
        title: "Grey Yordan",
        content: "Born in the States",
        price: 130000,
        image: "https://codingapple1.github.io/shop/shoes3.jpg"
    }

]

export default data;
// 다른 파일에서 이 변수를 가져다 쓸 수 있음 export default a
// 여러 변수를 가져다 쓰고 싶을 때는 중괄호 문법 사용 export {a,b}