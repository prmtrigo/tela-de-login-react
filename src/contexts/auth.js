import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const userStorage = localStorage.getItem("users_db");

        if (userToken && userStorage) {
            const hasUser = JSON.parse(userStorage)?.filter(
                (user) => user.nickname === JSON.parse(userToken)?.nickname
            );

            if (hasUser) setUser(hasUser[0]);
        }
    }, []);

    const signin = (nickname, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

        const hasUser = usersStorage?.filter((user) => user.nickname === nickname);

        if (hasUser?.length) {
        if (hasUser[0].nickname === nickname && hasUser[0].password === password) {
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem("user_token", JSON.stringify({ nickname, token }));
            setUser({ nickname, password });
            return;
        } else {
            return "Nome de Usuário ou senha incorretos";
        }
        } else {
        return "Usuário não cadastrado";
        }
    };

    const signup = (nickname, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

        const hasUser = usersStorage?.filter((user) => user.nickname === nickname);

        if (hasUser?.length) {
        return "Já tem uma conta com esse Nome de Usuário";
        }

        let newUser;

        if (usersStorage) {
        newUser = [...usersStorage, { nickname, password }];
        } else {
        newUser = [{ nickname, password }];
        }

        localStorage.setItem("users_bd", JSON.stringify(newUser));

        return;
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };


    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signup, signout }}
        >
            {children}
        </AuthContext.Provider>
    )
};