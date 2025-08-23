import React from "react";
import "./Home.css";
import CategoryList from "../../components/CategoryList/CategoryList";

const Home = () => {
  return (
    <>
    <main className="site-main">
      <div className="main-content">
        <img src="../../../assets/main.webp" alt="" className="main-img" />
        <h2 className="title">BegumSaab Pakistani Designer Suits Online</h2>
        <div className="description">
          <a href="">Maria. B</a> |<a href=""> Maria. B</a> |
          <a href=""> Jade</a> |<a href=""> Zara Shahjahan</a> |
          <a href=""> Gul Ahmad</a> |<a href=""> Sana Safinaz</a> |
          <a href=""> Gul Ahmad</a> | and
          <a href=""> more</a>
        </div>
        <div className="sale-btn">
          <button className="btn">🪔 Ramadan Sale →</button>
        </div>
      </div>
    </main>
    <CategoryList/>
    </>
  );
};

export default Home;
