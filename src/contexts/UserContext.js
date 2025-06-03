import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/firestoreService";

/** @type {import("react").Context<UserContextProps>} */
export const UserContext = createContext(null)

/**
 * 
 * @param {{ children: React.ReactNode }} props 
 */
export function UserProvider({ children }) {
  const [user, setUser] = useState(/** @type {UserProps | null} */(null))
  const [isUserLoading, setIsUserLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsUserLoading(false)
      }
    }

    loadUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading, setIsUserLoading }}>
      {children}
    </UserContext.Provider>
  )
}
