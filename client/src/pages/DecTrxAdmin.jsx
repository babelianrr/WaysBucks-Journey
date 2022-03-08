import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import dateFormat from "dateformat";
import rupiahFormat from "rupiah-format";

import NavbarAdmin from "../components/NavbarAdmin";

import imgWaysBucks from "../assets/waysbucks.png"

import { API } from "../config/api";

export default function DecTrxAdmin() {
  const title = "Approve Transaction";
  document.title = "WaysBucks | " + title;

  let history = useHistory();
  const { id } = useParams();
  const [transaction, setTransaction] = useState({
    id: null,
    name: "",
    phone: "",
    address: "",
    postal: "",
    status: "",
    qty: null,
    price: null,
    userOrder: {
      id: null,
      name: "",
      email: "",
      role: ""
    },
    beverages: {
      name: "",
      image: ""
    },
    toppings: {
      name: ""
    }
  });
  const [form, setForm] = useState({
    status: ""
  })

  const getTransaction = async (id) => {
    try {
      const response = await API.get("/transactionn/" + id);
      setTransaction(response.data.data.transactions[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction(id);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const declined = "Declined";

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        status: declined
      }

      const body = JSON.stringify(data);

      const response = await API.patch("/transaction/" + id, body, config);
      console.log(response.data.data);

      history.push("/transaction-admin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    history.push("/transaction-admin");
  };

  return (
    <>
      <NavbarAdmin />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="h1 text-red fw-9 mb-4">Approve Transaction</div>
          </Col>
        </Row>
        <Row>
          <Col xs="7">
            <div className="text-red fs-18">Are you sure to approve this transaction?</div>
            <div className="card bg-pink no-border my-3 p-2">
              <div class="row g-0">
                <div class="col-4">
                  <img src={transaction.beverages.image} alt="img" class="img-fluid card" />
                </div>
                <div class="col-8 ps-4">
                  <p className="card-title text-red fw-9 fs-24">{transaction.beverages.name}</p>
                  <p className="card-text text-red fs-18"><strong>Order time:</strong> {dateFormat(transaction.createdAt, "d mmmm yyyy, h:MM:ss TT")}</p>
                  <p className="card-text text-red fs-18"><strong>Topping:</strong> {transaction.toppings.name}</p>
                  <p className="card-text text-red fs-18"><strong>Price:</strong> {rupiahFormat.convert(transaction.price)}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <input className="form-control" type="hidden" name="status" value="Declined" onChange={handleChange} id="formGroupStatus" required />
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="danger" size="md">
                  Confirm
                </Button>
              </div>
            </form>
            <div className="mt-2">
              <Button variant="secondary" className="form-control btn" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
