"use client";
import { createContext, useState, ReactNode } from "react";

export const StateContext = createContext<StateContextType | undefined>(
  undefined
);

interface StateContextType {
  isModalOneOpen: boolean;
  setIsModalOneOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModalOne: () => void;
  logHelloWorld: () => void;
}

interface StateProviderProps {
  children: ReactNode;
}

export default function StateProvider({ children }: StateProviderProps) {
  const [isModalOneOpen, setIsModalOneOpen] = useState(true);

  const toggleModalOne = () => {
    setIsModalOneOpen((prev) => !prev);
  };

  const logHelloWorld = () => {
    console.log("Hello World");
  };

  return (
    <StateContext.Provider
      value={{
        isModalOneOpen,
        setIsModalOneOpen,
        toggleModalOne,
        logHelloWorld, 
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
