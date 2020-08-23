import React, { createContext, useState, useContext } from 'react'
import api from '../services/api'

interface Login {
  email: string
  senha: string
  nome?: string
  sobrenome?: string
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  whatsapp?: string;
  bio?: string;
  id: number;
}

interface IContext {
  loginFormData: Login | null
  setLoginFormData: React.Dispatch<React.SetStateAction<object>>;
  user: User | null
  signIn(): Promise<void>
  signOut(): void
  createAccount(): Promise<void>
  forgotPassword(): Promise<void>
  signed: boolean
  loading: boolean
}

const AuthContext = createContext<IContext>({} as IContext)

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loginFormData, setLoginFormData] = useState(null)


  const signIn = async () => {
    const { email, senha } = loginFormData
    
    setLoading(true)
    try {
      const response = await api.post("generate-token", {
        email: email,
        password: senha,
      });

       if (!response.data) {
         throw new Error("Email ou senha incorreta, tente novamente.");
       }

       setUser(response.data.user);
       setLoading(false);

       api.defaults.headers["Authotization"] = `Bearer ${response.data.token}`;

       localStorage.setItem(
         "@auth:user",
         JSON.stringify(response.data.user)
       );
       localStorage.setItem("@auth:token", response.data.token);

       return response.data.status
    } catch (error) {
      return error
    }
  }

  const signOut = () => {
    localStorage.clear()
    setUser(null);
  }

  const createAccount = async () => {
    const { email, senha, nome, sobrenome } = loginFormData

     try {
       const response = await api.post("create/web", {
         email: email,
         password: senha,
         name: `${nome} ${sobrenome}`
       });

       console.log(response);

       return response.data
     } catch (error) {
       console.log(error);
     }
  };

  const forgotPassword = async () => {
    const { email } = loginFormData

    try {
      await api.post("forgot_password", {
        email
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        loginFormData,
        user,
        signIn,
        setLoginFormData,
        signOut,
        createAccount,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

