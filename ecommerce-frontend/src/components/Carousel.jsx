import { useEffect, useState } from "react";
import "./Carousel.css";

const trendingProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: "₹1,29,999",
    image:
      "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pro_Max_Blue_Titanium_PDP_Image_Position-1__en-IN.jpg",
  },
  {
    id: 2,
    name: "Dell XPS Laptop",
    price: "₹89,999",
    image:
      "https://dellstatic.luroconnect.com/media/catalog/product/l/a/laptop-dell-dc15250nt-sl-metal-usbc-full-function-gallery-2.jpg",
  },
  {
    id: 3,
    name: "Sony Smart TV",
    price: "₹54,999",
    image:
      "https://sony.scene7.com/is/image/sonyglobalsolutions/TVFY24_UM_1_FrontWithStand_M",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: "₹7,999",
    image:
      "https://www.jiomart.com/images/product/original/rvc3uqboi7/savvy-bucket-t500-smart-watch-1-3-full-touch-men-women-smartwatch-black-strap-freesize-product-images-orvc3uqboi7-p599130187-0-202303081021.jpg?im=Resize=(420,420)",
  }
];

function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % trendingProducts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Top Trending Products</h2>

      <div className="carousel-track">
        {trendingProducts.map((product, i) => (
          <div
            key={product.id}
            className={`carousel-card ${
              i === index ? "active" : ""
            }`}
          >
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
