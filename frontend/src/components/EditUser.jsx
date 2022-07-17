import "../scss/New.scss";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, getUsers, reset } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();

  const dispatch = useDispatch();
  const { users, isEditUserSuccess, isEditUserError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isEditUserError) {
      toast.error(`Error occured: ${message.message}`);
      dispatch(reset());
    }
    if (isEditUserSuccess) {
      toast.success(`${message.message}`);
      dispatch(reset());
      dispatch(getUsers());
      firstnameRef.current.value = "";
      lastnameRef.current.value = "";
      emailRef.current.value = "";
      ageRef.current.value = "";
      setUserId("");
      navigate("/users");
    }
  }, [isEditUserSuccess, isEditUserError, message, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      id: userId,
      first_name: firstnameRef.current.value,
      last_name: lastnameRef.current.value,
      email: emailRef.current.value,
      age: ageRef.current.value,
    };

    dispatch(editUser(userDetails));
  };

  useEffect(() => {
    const userId = location.pathname.split("/")[3];
    setUserId(userId);
    const user = users.filter((u) => userId === u.id)[0];
    firstnameRef.current.value = user.first_name;
    lastnameRef.current.value = user.last_name;
    emailRef.current.value = user.email;
    ageRef.current.value = user.age;
  }, [users, location.pathname]);

  return (
    <div className="new">
      <form onSubmit={handleSubmit}>
        <h1>Edit User</h1>
        <div className="formInput">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            placeholder="John"
            ref={firstnameRef}
            required
          />
        </div>
        <div className="formInput">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            placeholder="Doe"
            ref={lastnameRef}
            required
          />
        </div>
        <div className="formInput">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="JohnDoe@gmail.com"
            ref={emailRef}
            required
          />
        </div>
        <div className="formInput">
          <label htmlFor="age">Age</label>
          <input type="date" id="age" ref={ageRef} required />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default EditUser;
