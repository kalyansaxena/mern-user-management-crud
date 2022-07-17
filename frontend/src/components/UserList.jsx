import "../scss/UserList.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUsers, reset } from "../redux/userSlice";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Table Header Columns
const columns = [
  { field: "id", headerName: "ID", width: 230 },
  { field: "first_name", headerName: "First Name", width: 130 },
  { field: "last_name", headerName: "Last Name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
];

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    users,
    isGetUsersSuccess,
    isGetUsersError,
    isDeleteUserSuccess,
    isDeleteUserError,
    message,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    } else {
      setUserList(users);
    }
  }, [dispatch, users.length, users]);

  useEffect(() => {
    if (isGetUsersError) {
      toast.error(`Error occured while fetching users: ${message.message}`);
      dispatch(reset());
    }
    if (isGetUsersSuccess) {
      setUserList(users);
      dispatch(reset());
    }
  }, [
    users,
    isGetUsersSuccess,
    isGetUsersError,
    message,
    dispatch,
    setUserList,
  ]);

  useEffect(() => {
    if (isDeleteUserError) {
      toast.error(`Error occured: ${message.message}`);
      dispatch(reset());
    }
    if (isDeleteUserSuccess) {
      toast.success("User Deletion successful");
      dispatch(reset());
      dispatch(getUsers());
      navigate("/");
    }
  }, [isDeleteUserError, isDeleteUserSuccess, message, dispatch, navigate]);

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = (userId) => {
    const user = userList.filter((u) => userId === u.id)[0];
    confirmAlert({
      title: `User: ${user.first_name} ${user.last_name}`,
      message: "Are you sure to delete the user ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteUser(userId));
          },
        },
        {
          label: "No",
          onClick: () => {
            console.log("Deletion Canceled");
          },
        },
      ],
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </div>
            <div
              className="deleteButton deleteUser"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="user-list">
      <div className="table">
        <DataGrid
          rows={userList}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default UserList;
