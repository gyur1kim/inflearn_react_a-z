import React, {useEffect, useState} from 'react';
import './Nav.css'

function Nav(props) {

  // 스크롤바를 일정 내리면 Nav바의 배경을 까맣게, 그렇지 않으면 배경을 투명하게..
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 리스너 하나 등록하기, 스크롤이 발생하면 이벤트 발생
    window.addEventListener("scroll", ()=>{
      if (window.scrollY > 50){
        setShow(true);
      }
      else{
        setShow(false);
      }
    })
    // 컴포넌트를 사용하지 않을 때 리스너 해제
    return () => {
      window.removeEventListener("scroll", ()=>{});
    };
  });

  return (
    <nav className={`nav ${show ? 'nav__black' : ''}`}>
      {/* 로고 태그 */}
      <img
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix logo"
        className="nav__logo"
        /* 새로고침 */
        onClick={() => window.location.reload()}
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User logged"
        className="nav__avatar"
      />
    </nav>
  );
}

export default Nav;