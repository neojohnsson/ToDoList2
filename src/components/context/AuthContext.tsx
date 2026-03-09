
import { createContext } from 'react'

type AuthContextType = {
    role: string,
    userId: string
}

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };