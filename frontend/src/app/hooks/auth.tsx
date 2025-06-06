'use client'
import { createContext, useContext, useState, useEffect } from "react";
import api from '../../services/api';
import { AlertToast } from '../components/AlertToast';
import { USER_ROLES } from "../utils/roles";
import { useRouter } from "next/navigation";
import { updateUserById, UpdatedData, UpdatedDataResponse, getUserById } from "@/services/users";
import { useCookies } from "react-cookie"
import { truncate } from "fs";


interface SignInData {
    email: string;
    password: string;
}

interface User {
    email: string;
    id: string;
    name: string;
    role: string;
}

interface AuthContextData {
    signIn: (data: SignInData) => Promise<any>;
    signOut: () => void;
    user: User;
    userUpdate: (id: string, userUpdatedData: UpdatedData) => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [message, setMessage] = useState({ status: '', description: '' });
    const [user, setUser] = useState<User>({ email: "", id: "", name: "", role: "" });
    const [cookie, setCookie, removeCookie] = useCookies(["@SAGAN_ACCESS_TOKEN"])

    const signIn = async ({ email, password }: SignInData) => {
        try {
            const response = await api.post('/auth',
                { email, password },
                { withCredentials: true }
            );
            if (response) {
                api.defaults.withCredentials = true;
                const USER_REQ = await getUserById(response.data.id);
                if (USER_REQ) {
                    setUser(USER_REQ);
                    setMessage({ status: 'success', description: 'Login realizado com sucesso' });

                    localStorage.setItem("@sagan/user", JSON.stringify(USER_REQ))
                    router.push('/home')
                }

            } else {
                setMessage({ status: 'error', description: 'Credenciais inválidas' });
            }
            return true;
        } catch (e: any) {
            if (e.response) {
                alert(e.response.data.message);
            } else {
                console.error('An error occurred: ', e);
            }
            return false
        }
    };

    const signOut = () => {
        removeCookie("@SAGAN_ACCESS_TOKEN", { path: "/" })
        localStorage.removeItem("@sagan/user")
        setUser({ email: "", id: "", name: "", role: "" })
        api.defaults.withCredentials = false

        alert('Disconnect')
        router.push('/login')
    };

    const userUpdate = async (id: string, updateForm: UpdatedData) => {
        try {
            const res = await updateUserById(id, updateForm) // ja vem com response.data
            if (res) {
                const { name, email, id, role } = res // modificar user para retornar college
                const updatedUser: User = { name, email, id, role }

                localStorage.setItem("@sagan/user", JSON.stringify(updatedUser))
                setUser(updatedUser)
                setMessage({ status: 'success', description: 'Usuário atualizado com sucesso' });
            }
        } catch (err) {
            setMessage({ status: 'error', description: 'Ocorreu um erro' });
            console.error(err)
        }
    }

    useEffect(() => {
        async function reconnect() {
            const _user = localStorage.getItem("@sagan/user") || null;
            if (_user != null) {
                const foundUser = await getUserById(JSON.parse(_user).id)
                if (foundUser) {
                    setUser(foundUser)
                }
            }
        }
        reconnect()
    }, [])

    return (
        <AuthContext.Provider value={{ signIn, signOut, user, userUpdate }}>
            {children}
            <AlertToast message={message} setMessage={setMessage} />
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
