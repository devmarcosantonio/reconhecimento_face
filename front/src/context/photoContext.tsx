import { createContext } from 'react';

type PhotoContextType = {
    photo: any;
    setPhoto: React.Dispatch<React.SetStateAction<any>>;
};
export const PhotoContext = createContext<PhotoContextType | undefined>(undefined);
