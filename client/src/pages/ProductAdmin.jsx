import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router";
import rupiahFormat from "rupiah-format";

import NavbarAdmin from "../components/NavbarAdmin";
import DeleteData from "../components/modal/DeleteData";

import imgEmpty from "../assets/empty.svg";

import { API } from "../config/api";

export default function ProductAdmin() {
  let history = useHistory();

  const title = "Products";
  document.title = "WaysBucks | " + title;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const dataPerPage = 2;
  const numberOfRecordsVisited = page * dataPerPage;
  const totalPages = Math.ceil(products.length / dataPerPage);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const addProduct = () => {
    history.push("/add-product");
  };

  const handleUpdate = (id) => {
    history.push("/update-product/" + id);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/beverage/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <NavbarAdmin />
      <Container className="py-5">
        <Row>
          <Col xs="6">
            <div className="h1 mb-4 fw-9 text-red">Product List</div>
          </Col>
          <Col xs="6" className="text-end">
            <Button onClick={addProduct} className="btn-success" style={{ width: "200px" }}>
              Add Product
            </Button>
          </Col>
          <Col xs="12">
            {products.length !== 0 ? (
              <>
                <Table bordered hover size="lg">
                  <thead>
                    <tr>
                      <th width="2%" className="text-center">
                        No
                      </th>
                      <th className="text-center">Photo</th>
                      <th className="text-center">Product Name</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .slice(
                        numberOfRecordsVisited,
                        numberOfRecordsVisited + dataPerPage
                      )
                      .map((item, index) => (
                        <tr key={index}>
                          <td className="align-middle text-center">{(index + 1) + (dataPerPage * (page))}.</td>
                          <td className="align-middle text-center">
                            <img
                              src={item.image}
                              style={{
                                width: "120px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "10px"
                              }}
                              alt="preview"
                            />
                          </td>
                          <td className="align-middle text-center">{item.name}</td>
                          <td className="align-middle text-center">{rupiahFormat.convert(item.price)}</td>
                          <td className="align-middle text-center">
                            <Button
                              onClick={() => {
                                handleUpdate(item.id);
                              }}
                              className="btn-sm btn-success me-2"
                              style={{ width: "135px" }}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => {
                                handleDelete(item.id);
                              }}
                              className="btn-sm btn-danger"
                              style={{ width: "135px" }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <ReactPaginate previousLabel={"«"} nextLabel={"»"} pageCount={totalPages} onPageChange={changePage} containerClassName={"pagination"} pageClassName={"page-item"} pageLinkClassName={"page-link"} previousLinkClassName={"page-link"} nextLinkClassName={"page-link"} disabledClassName={"disabled"} activeClassName={"active"} />
              </>
            ) : (
              <div className="text-center pt-5">
                <img src={imgEmpty} className="img-fluid" style={{ width: "40%" }} alt="empty" />
                <div className="mt-3">No data product</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
    </>
  );
}
