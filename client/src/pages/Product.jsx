import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import ProductCard from "../components/card/ProductCard";

import imgEmpty from "../assets/empty.svg";

import { API } from "../config/api";


export default function Product() {
  const { t } = useTranslation();
  const title = "Home";
  document.title = "WaysBucks | " + title;

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await API.get("/beverages");
      setProducts(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    576: 1
  };

  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Container className="mt-5">
        <Row>
          <Col>
            <h2 className="fw-9 text-red">{t('products')}</h2>
          </Col>
        </Row>
        <Row className="my-4">
          {products.length !== 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {products?.map((item, index) => (
                <ProductCard item={item} key={index} />
              ))}
            </Masonry>
          ) : (
            <Col sm="10">
              <div className="text-center pt-5">
                <img src={imgEmpty} className="img-fluid" style={{ width: "40%" }} alt="empty" />
                <div className="mt-3">{t('no_data')}</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
