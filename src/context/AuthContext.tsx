import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as loginApi } from "@/services/pokemonApi";

type AuthContextData = {
    isAuthenticated: boolean;
    user: string | null;
    userId: string | null;
    isLoading: boolean;
    signIn: (username: string, password: string) => Promise<boolean>;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem("@Auth:user");
            const storageUserId = await AsyncStorage.getItem("@Auth:userId");
            if (storageUser && storageUserId) {
                setUser(storageUser);
                setUserId(storageUserId);
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(username: string, password: string): Promise<boolean> {
        try {
            const response = await loginApi(username, password);
            // Ajuste os campos abaixo conforme o retorno real da API
            const { userId: id, username: name } = response.data;

            setUser(name ?? username);
            setUserId(id);
            setIsAuthenticated(true);

            await AsyncStorage.setItem("@Auth:user", name ?? username);
            await AsyncStorage.setItem("@Auth:userId", id);
            return true;
        } catch (error) {
            return false;
        }
    }

    async function signOut() {
        setUser(null);
        setUserId(null);
        setIsAuthenticated(false);
        await AsyncStorage.multiRemove(["@Auth:user", "@Auth:userId"]);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, userId, signIn, signOut, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);