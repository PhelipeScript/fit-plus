import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/firestoreService";

/** @type {UserContextProps} */
export const UserContext = createContext(null)

/**
 * 
 * @param {{ children: React.ReactNode }} props 
 */
export function UserProvider({ children }) {
  const [user, setUser] = useState(/** @type {UserProps | null} */(null))

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (error) {
        console.error(error)
      } finally {
      }
    }

    loadUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
