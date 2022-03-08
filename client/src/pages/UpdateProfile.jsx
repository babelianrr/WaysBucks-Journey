import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import { UserContext } from "../context/userContext";

import Navbar from "../components/Navbar";

import { API } from "../config/api";

export default function UpdateProfile() {
  let history = useHistory();

  const title = "Update Profile";
  document.title = "WaysBucks | " + title;

  const [state] = useContext(UserContext);

  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const getUser = async (id) => {
    try {
      const response = await API.get("/profile/" + id);
      setUser(response.data.data.user);
      setPreview(response.data.data.user.image);
      setForm({
        ...form,
        name: response.data.data.user.name,
        email: response.data.data.user.email,
        password: response.data.data.user.password,
        image: response.data.data.user.image
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type == "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }

  };
  console.log(form);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form?.image[0], form?.image[0]?.name);
      formData.set("name", form.name);
      formData.set("email", form.email);
      formData.set("password", form.password);

      const response = await API.patch("/user/" + id, formData, config);
      console.log(response);

      history.push("/profile/" + state.user.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    history.push("/profile/" + state.user.id);
  };

  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col xs="1"></Col>
          <Col xs="6">
            <form onSubmit={handleSubmit}>
              <h3 className="text-red fw-9">Update Profile</h3>
              <div className="form-group my-4 form-red" controlid="formGroupName">
                <input className="form-control" type="text" placeholder="Name" name="name" onChange={handleChange} value={form.name} />
              </div>
              <div className="form-group my-4 form-red" controlid="formGroupEmail">
                <input className="form-control" type="email" placeholder="Email" name="email" onChange={handleChange} value={form.email} />
              </div>
              <div className="form-group my-4 form-red" controlid="formGroupPassword">
                <input className="form-control" type="password" placeholder="Password" name="password" onChange={handleChange} value={form.password} />
              </div>
              <div className="form-group my-4 form-red" controlid="formGroupFile">
                <input type="file" id="upload" name="image" onChange={handleChange} className="form-control" />
              </div>
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" className="form-control btn btn-red" size="md">
                  Update Profile
                </Button>
              </div>
            </form>
            <div className="mt-4">
              <Button variant="secondary" className="form-control btn" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Col>
          <Col xs="4">
            {preview && (
              <div>
                <img src={preview} alt="preview" className="img-fluid card" />
              </div>
            )}
          </Col>
          <Col xs="1"></Col>
        </Row>
      </Container>
    </>
  );
}
