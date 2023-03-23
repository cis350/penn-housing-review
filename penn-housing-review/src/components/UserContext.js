// Import React and createContext
import React, { createContext } from "react";

// Create a UserContext object
const UserContext = createContext();

// Create a custom hook to access the UserContext
export const useUser = () => {
  return React.useContext(UserContext);
};

// Create a UserProvider component that wraps the children with the UserContext.Provider
export const UserProvider = ({ children }) => {
  // Use state variables to store the user information
  const [username, setUsername] = React.useState("");
  const [userID, setUserID] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");

  // Use an effect hook to fetch the user information from an API or localStorage
  React.useEffect(() => {
    // Fetch the user information here and update the state variables accordingly
    // For example:
    // fetch("/api/user")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setUsername(data.username);
    //     setUserID(data.userID);
    //     setUserEmail(data.userEmail);
    //   });
  }, []);

  // Return the UserContext.Provider with the value prop containing the user information and setters
  return (
    <UserContext.Provider value={{ username, userID, userEmail, setUsername, setUserID, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};