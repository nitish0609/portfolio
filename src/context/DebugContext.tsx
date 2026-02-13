import React, { createContext, useContext, useState, useEffect } from 'react';

interface DebugContextType {
    isDebugMode: boolean;
    toggleDebugMode: () => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export const DebugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDebugMode, setIsDebugMode] = useState(false);

    const toggleDebugMode = () => setIsDebugMode(prev => !prev);

    useEffect(() => {
        if (isDebugMode) {
            document.body.classList.add('debug-active');
        } else {
            document.body.classList.remove('debug-active');
        }
    }, [isDebugMode]);

    return (
        <DebugContext.Provider value={{ isDebugMode, toggleDebugMode }}>
            {children}
        </DebugContext.Provider>
    );
};

export const useDebug = () => {
    const context = useContext(DebugContext);
    if (context === undefined) {
        throw new Error('useDebug must be used within a DebugProvider');
    }
    return context;
};
