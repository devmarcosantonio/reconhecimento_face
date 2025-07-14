import React, { useState, ReactNode } from "react";
import { PhotoContext } from "../context/photoContext";

type PhotoProviderProps = {
    children: ReactNode;
};

export const PhotoProvider: React.FC<PhotoProviderProps> = ({ children }) => {
    const [photo, setPhoto] = useState<any>(null);

    return (
        <PhotoContext.Provider value={{ photo, setPhoto }}>
            {children}
        </PhotoContext.Provider>
    );
};
