import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./AppLayout.module.css";
import { TableContainer, Table, TableBody, TableCell, TableHead, Paper, TableRow } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const { email, userid, username }: { email: string; userid: string; username: string } = JSON.parse(localStorage.getItem("user")!);

// creating fake data to populate table

const userDatas = [
  {
    name: "test1",
    email: "test1@gmail.com",
    phone: "08121071207",
    address: "west street",
    dateCreated: "nil",
  },
  {
    name: "test2",
    email: "test2@gmail.com",
    phone: "08121071207",
    address: "west street",
    dateCreated: "nil",
  },
  {
    name: "test3",
    email: "test3@gmail.com",
    phone: "08121071207",
    address: "west street",
    dateCreated: "nil",
  },
  {
    name: "test4",
    email: "test4@gmail.com",
    phone: "08121071207",
    address: "west street",
    dateCreated: "nil",
  },
];

console.log(userDatas);

function AppLayout() {
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "address", name: "Address" },
    { id: "datecreated", name: "DateCreated" },
    { id: "action", name: "Action" },
  ];

  const navigate = useNavigate();
  const { user } = useAuth()!;

  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useAuth()!;

  console.log(user);

  useEffect(function () {
    // fetching the data created by user in this hook from this endpoint https://crud-api-s9wj.onrender.com/getinfo/{userId} as the page loads

    if (userid === null || userid === undefined) return;

    fetch(`https://crud-api-s9wj.onrender.com/getinfo/${userid}/`)
      .then((response) => {
        if (!response.ok) throw new Error("error fetching data");

        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  function handleLogout() {
    dispatch({ type: "logout" });
    localStorage.clear();
    navigate("/");
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCLoseModal() {
    setShowModal(false);
  }

  return (
    <div className={styles.app_layout}>
      <Paper sx={{ margin: "1%" }}>
        <div className={styles.cta_btn}>
          <Button type="add" onClick={handleOpenModal}>
            Add new (+)
          </Button>

          <div className={styles.user_profile}>
            <div className={styles.user}>
              <p>Welcome, {username.toUpperCase()}</p>
            </div>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "midnightblue" }}>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ color: "white" }}>
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {showModal && <Modal close={handleCLoseModal} title="Create new data" methodType={"POST"} />}
    </div>
  );
}

export default AppLayout;
