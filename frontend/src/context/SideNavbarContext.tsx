import { createContext, ReactNode, useContext, useState } from 'react';

const defaultValues = {
    isExpanded: true,
    toggleSidebar: () => { },
};

const SidebarContext = createContext(defaultValues);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('sidebarExpanded');
            return savedState !== null ? JSON.parse(savedState) : true;
        }
        return true;
    });

    const toggleSidebar = () => {
        setIsExpanded((prevState: any) => {
            const newState = !prevState;
            localStorage.setItem('sidebarExpanded', JSON.stringify(newState));
            return newState;
        });
    };

    return (
        <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
