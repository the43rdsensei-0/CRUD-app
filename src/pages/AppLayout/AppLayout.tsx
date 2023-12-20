import { useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./AppLayout.module.css";
import { TableContainer, Table, TableBody, TableCell, TableHead, Paper, TableRow } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AppLayout() {
  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "address", name: "Address" },
    { id: "action", name: "Action" },
  ];

  const navigate = useNavigate();
  const { user } = useAuth()!;

  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useAuth()!;

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
              <p>Welcome, {user?.username.toUpperCase()}</p>
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

      {showModal && <Modal close={handleCLoseModal} title="Create new data" />}
    </div>
  );
}

export default AppLayout;
