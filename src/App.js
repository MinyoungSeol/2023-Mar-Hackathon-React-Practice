/* eslint-disable */

import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function App() {

  let dataBinding = '서버에서 가져온 데이터';

  function 함수(){
    return 100
  }

  let style = { color:'blue', fontSize: '30px' };

  let posts = '토론토 푸틴 맛집';

  //실행 후 [array]가 남음, a='벚꽃 공원 추천', b=이 데이터를 수정하기 위한 함수
  useState('벚꽃 공원 추천'); //[a,b]

  // var [a,b] = [10, 100] 이런 너낌
  let [title, changeTitle] = useState(['벚꽃 공원 추천', '토론토 푸틴 맛집', '당장 스카버러를 떠나십시오']); //문자, 숫자, array, object 다 저장 가능
  //단순 변수가 아닌 state 에 데이터를 저장하는 이유
  //state는 뭔가 변경되면(제목의 정렬,수정 등) HTML '새로고침'아닌 '재렌더링'됨
  //자주 바뀌는, 중요한 데이터는 변수 말고 state로 저장하세요이

  let [like, changeLike] = useState([0,0,0]);

  function titleChange(){
    var newArray = [...title]; //deep copy [... ], 서로 값 공유를 하지 않고 독립적인 값을 가지는 복사
    newArray[0] = '단풍 공원 추천';
    changeTitle( newArray )
    // changeTitle(['단풍 공원 추천', '토론토 비버테일 맛집', '스카버러 우웩']);
  }

  let [modal, setModal] = useState(false);

  let [modalTitle, setModalTitle] = useState('firstIndex');

  let [input, changeInput] = useState('');

  // Map 문법
  // 1. array 자료 갯수만큼 함수안의 코드 실행해줌
  // 2. 함수의 파라미터는 array 안에 있던 자료임
  // 3. return에 뭐 적으면 array로 담아줌
  // [1,2,3].map(function(param){
  //   return 'param'
  // });
  // ()안에 들어가는 함수 = 콜백함수



  return (
    <div className="App">

      {/* NavBar starts */}
      <nav className="black-nav">
        <div>안녕하시렵니까?</div>
      </nav>
      {/* NavBar ends */}

      {/* 데이터 바인딩 */}
      <h2>"데이터 바인딩"이란?</h2>
      <h4> { dataBinding } </h4>
      <h5>↑ 이러케 보여쥽니다</h5>
      <h6>데이터를 HTML에 꽂아넣는것</h6>

      {/* 함수 */}
      <h3> { 함수() } </h3>

      {/* 이미지 */}
      <img src = { logo } className="App-logo"/>

      {/* 인라인 스타일은 무조건 {} */}
      <div style={ style }>인라인 스타일은 무조건 중괄호 안에</div>

      <br></br>
      <hr></hr>
      <br></br>
      <br></br>

      {/* list starts */}

      {/* <div className="list">
        <h3> { title[0] } <span onClick={ ()=>{ changeLike(like++) } }>👍🏻</span> { like } </h3>
        <p>2월 17일 발행</p>
        <button onClick={ titleChange }>제목을 바꾸시렵니까?</button>
        <hr/>
      </div> */}
{/* onclick 등에 붙는 함수 뒤에 () 붙이지 않도록 주의할 것,
            ()가 붙으면 함수 바로 실행이라는 뜻이 됨
        */}

      {/* 
          리액트
          onClick={ 클릭될 때 실행할 함수 }
          onClick={ ()=>{ 실행할 내용 } }
      */}

      {/* <div className="list">
        <h3> { title[1] } </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>

      <div className="list">
        <h3 onClick={ ()=>{ setModal(!modal) } }> { title[2] } </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div> */}

      {/* Map 함수 이용한 루프 */}
      {
        title.map(function(a, i){
          return (
            <div className="list" key={i}>
              <h3 onClick={()=>{ setModal(!modal); setModalTitle(i) }}> { title[i] } </h3> {/* {a} 도 가능 | 두번째 파라미터 i는 반복문이 돌때마다 1씩 증가하는 정수*/}
              <p>2월 17일 발행</p>
              <span onClick={ ()=>{ 
                let likeIndex = [...like];
                likeIndex[i] = likeIndex[i] + 1;
                changeLike(likeIndex)
              } }>👍🏻</span> <span> { like[i] } </span>
              <br/>
              <button onClick={ ()=> {
                let deleteTitle = [...title];
                deleteTitle.splice(i, 1);
                changeTitle(deleteTitle);

                let deleteLikeIndex = [...like];
                deleteLikeIndex.splice(i, 1);
                changeLike(deleteLikeIndex);
              } }>ㄲㅈ</button>
              <hr></hr>
            </div>
          )
        })
      }

      {/* list ends */}

      
      <input onChange={ (e)=>{ 
        changeInput(e.target.value);
      } }/>
      {/* e = 지금 발생하는 이벤트에 관련한 여러 기능 담김, 이 경우 input에 입력한 값
          e.target.value = 이벤트 발생한 html태그에. 입력한 값
          상위 html로 퍼지는 '이벤트버블링'막고 싶을 때 e.stopPropagation : 만약 특정 버튼이 특정 태그 안에 함께 있어야 하는 상황에 사용하면 좋음
      */}

      <button onClick={ ()=>{ 
        let postTitle = [...title];
        postTitle.unshift(input);
        changeTitle(postTitle);

        let addLikeIndex = [...like];
        addLikeIndex.unshift(0);
        changeLike(addLikeIndex);
      } }>up!</button>


      {/* Modal starts */}

      {
        //자바스크립트 표현식 대신 삼항연산자 표현식
        // 조건식 ? 참일 때 실행할 코드 : 거짓일 때 실행할 코드
        // 1 + 1 == 2 ? '맞음' : '아님'
        modal == true ? <Modal title={title} modalTitle={modalTitle} changeTitle={changeTitle}/> : null

        //부모 컴포넌트 -> 자식 컴포넌트간 state 전달 위한 props 문법
        //1. <자식 컴포넌트 작명 = { state이름 }>
        //2. props 파라미터 등록 후 props.작명 사용
      }

      {/* Model ends */}
      

    </div> /* App ends */
  );
}

// Component 문법
function Modal(props){
  return(
    <div className="modal">
      <h2>{props.title[ props.modalTitle ]}</h2>
      <p>Date</p>
      <p>Detail</p>
      <button onClick={ ()=>{ props.changeTitle(['단풍 공원 추천', '토론토 어쩌구', '스카버러 어쩌구']) } }>제목을 바꾸시렵니까?</button>
    </div>
  )
  //return() 안에 있는 건 태그 하나로 묶어야 함 자식 하나밖에 못가짐
}

export default App;
