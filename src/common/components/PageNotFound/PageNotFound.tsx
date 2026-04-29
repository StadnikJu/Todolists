import { Button, Container } from "@mui/material"
import styles from "./PageNotFound.module.css"
import { Path } from "../Routing/Roting"
import { Link } from "react-router"
 
export const PageNotFound = () => (
  <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button to={Path.Main} component={Link} variant="contained" sx={{ width: "330px", mt: "20px" }}>
      Return to the main page
    </Button>
  </Container>
)