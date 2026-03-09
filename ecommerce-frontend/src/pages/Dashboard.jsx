import React from "react";
import "./Dashboard.css";
import Carousel from "../components/Carousel";

function Dashboard({ setPage }) {
  return (
    <div className="dashboard-container">
      <div className="hero">
        <h1>Welcome to CartZen</h1>
        <p>Discover amazing deals and shop your favorite products!</p>

        <button className="shop-btn" onClick={() => setPage("products")}>
          Start Shopping →
        </button>
      </div>
      <Carousel/>
      <div className="promo-section">
        <img src="https://cdn.prod.website-files.com/644936ee98f322622c685779/645ce6722ad9dd61c8f739a1_Classic-T-Shirt-Gery-Navy.jpg" alt="Shopping 1" />
        <img src="https://www.falconsuits.in/cdn/shop/files/ChatGPTImageJun4_2025_02_44_51PM.png?v=1750326775" alt="Shopping 2" />
        <img src="https://www.jiomart.com/images/product/original/rv7wwtzwjs/crestello-black-silicone-strap-analog-wrist-watch-for-men-black-dial-cr-bk014-blk-product-images-rv7wwtzwjs-0-202306031527.jpg?im=Resize=(500,630)" alt="Shopping 3" />
        <img src="https://5.imimg.com/data5/CO/XW/MY-44197581/ladies-stylish-purse.jpg" />
      </div>
    </div>
  );
}

export default Dashboard;
