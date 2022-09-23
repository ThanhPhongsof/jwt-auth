import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Layout = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <div>
      <h1>JWT AUTHENTICATION</h1>
      <nav style={{ borderBottom: "1px solid", paddingBottom: "1rem" }}>
        <Link to=".">Home</Link> | <Link to="login">Login</Link> |{" "}
        <Link to="register">Register</Link> | <Link to="profile">Profile</Link>{" "}
        {isAuthenticated && (
          <>
            | <button>Logout</button>{" "}
          </>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
