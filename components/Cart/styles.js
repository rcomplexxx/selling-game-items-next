import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  toolbar: {
    minHeight: "64px", // Replace with the desired height value
  },
  title: {
    marginTop: "5%",
    color: "white",
  },
  emptyButton: {
    backgroundColor: "transparent",
    color: "white",
    minWidth: "150px",
   
  },
  checkoutButton: {
    minWidth: "150px",
  },
  link: {
    textDecoration: "none",
  },
  cardDetails: {
    display: "flex",
    marginTop: "15vh",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "5vh",
  },
  emptyCartText: {
    color: "white",
    marginBottom: "5vh",
  },
}));
