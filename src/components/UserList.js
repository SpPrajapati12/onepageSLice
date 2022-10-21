import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllUsersById } from './redux/user';
import { deleteUser, getAllUsers, addUser, updateUser, hideshow } from './redux/users';

const UserList = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users.users)
  const user = useSelector((state) => state.user.user)
  const hide = useSelector((state) => state.users.hide)
  console.log(hide);
  // const { userName, email, phone } = user
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    userName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getAllUsers())
    if (id) {
      dispatch(getAllUsersById(id))
    }
  }, [dispatch, navigate])


  useEffect(() => {
    if (user) {
      setValues({ ...user });
    }
  }, [user]);

  // const { userName, phone, email } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      dispatch(addUser({ ...values }));
      setValues({
        userName: "",
        phone: "",
        email: "",
      });
      dispatch(hideshow(false))
      navigate('/')
    } else {
      dispatch(
        updateUser({
          id: id,
          userName: values.userName,
          phone: values.phone,
          email: values.email,
        })
      );
      setValues({
        userName: "",
        phone: "",
        email: "",
      });
      dispatch(hideshow(false))
      window.alert("user successfully Edit");
      navigate("/")

    }
  };

  const deleteData = (id) => {
    dispatch(deleteUser(id));
    dispatch(getAllUsers())
    navigate("/")
    setValues({
      userName: "",
      phone: "",
      email: "",
    });
  }

  return (
    <div>
      {!hide && <button className="btn btn-primary m-5" onClick={() => dispatch(hideshow(true))}>+</button>}
      {hide && <div className="container">
        <h1>
          {id ? "Edit User" : "Add User"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInput">Name</label>
            <input
              type="text"
              value={values.userName}
              className="form-control"
              id="exampleInput"
              aria-describedby="emailHelp"
              placeholder="User Name"
              onChange={(e) => setValues({ ...values, userName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              value={values.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Number</label>
            <input
              type="number"
              value={values.phone}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Mo Number"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          {/* <button type="button" className="btn btn-success mr-3" onClick={() => navigate("/")}>
          Back
        </button> */}
          {/* <Link to="/"> */}
          <button type="button" className="btn btn-primary m-2" onClick={() => {
            navigate("/")
            dispatch(hideshow(false))
            setValues({
              userName: "",
              phone: "",
              email: "",
            });
          }}>
            cancel
          </button>
          <button type="submit" className="btn btn-success m-2">
            {id ? "Update" : "Submit"}
          </button>
          {/* </Link> */}
        </form>
      </div>}
      <div className="container">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">userName</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0
              ? users.map((i) => (
                <tr key={i.id}>
                  <th scope="row">{i.id}</th>
                  <td>{i.userName}</td>
                  <td>{i.phone}</td>
                  <td>{i.email}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning mr-4"
                      onClick={() => {
                        navigate(`/edit/${i.id}`)
                        dispatch(hideshow(true))
                      }
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(i.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
