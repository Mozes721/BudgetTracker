import create, { createStore } from 'zustand'
import { persist } from 'zustand/middleware';

export const emailStore = createStore(
    persist(
        (set) => ({
            email: '',
            setEmail: (email) => set({ email }),
            }),
        {
            name: 'email-store',           
        }
    )
);


export const idStore = createStore(
    persist(
        (set) => ({
            id: '',
            setId: (id) => set({ id }),
            }),
        {
            name: 'id-store',
           
        }
    )
);

