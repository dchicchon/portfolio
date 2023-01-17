import { create } from 'zustand';

export const useStore = create((set) => ({
    projects: [],
    routes: {},
    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
    addRoute: (key, route) => set(state => {
        state.routes[key] = route;
        return {
            routes: state.routes,
        }
    })
}))


