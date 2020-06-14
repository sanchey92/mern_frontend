import React, {FC, useState} from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import Header from "../Header/Header";
import Links from "../Links/Links";
import SideDrawer from "../SideDraver/SideDrawer";
import Backdrop from "../../UIElements/Backdrop/Backdrop";

const MainNavigation: FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openDrawerHandler = () => setIsOpen(true)
  const closeDrawerHandler = () => setIsOpen(false)

  return (
    <>
      {isOpen && <Backdrop onClick={closeDrawerHandler}/>}
         <SideDrawer show={isOpen} onClick={closeDrawerHandler}>
          <nav className='main-navigation__drawer-nav'>
            <Links/>
          </nav>
        </SideDrawer>
      <Header>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <Links/>
        </nav>
      </Header>
    </>

  );
};

export default MainNavigation;