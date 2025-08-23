import React from 'react';
import './Sidebar.css';
import {NavLink} from 'react-router-dom'
import { assets } from '../../assets/assets';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add-item' className="option">
            <img src={assets.add_icon} alt="" />
            <p>Add Item</p>
        </NavLink>
        <NavLink to='/add-category' className="option">
            <img src={assets.add_icon} alt="" />
            <p>Add Category</p>
        </NavLink>
        <NavLink to='/list' className="option">
            <img src='' alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='orders' className="option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
