import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

/**
 * @returns {UserContextProps}
 */
export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser deve ser usado dentro do UserProvider');
  return context
}
