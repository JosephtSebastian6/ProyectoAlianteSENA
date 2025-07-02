// src/components/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null); // Para almacenar el token JWT
  const navigate = useNavigate(); // Inicializa useNavigate aquí

  useEffect(() => {
    // Intentar obtener el token de localStorage al cargar la aplicación
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      // Opcional: Aquí podrías añadir lógica para validar el token (ej. expiración)
    }
  }, []);

  // Función para iniciar sesión (recibe el token del backend)
  const login = (token) => {
    localStorage.setItem('authToken', token); // Guarda el token en localStorage
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
    setAuthToken(null);
    setIsAuthenticated(false);
    navigate('/'); // Redirige a la página principal después de cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};