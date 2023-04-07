// DEFAULT
export const HOME = { to: "", text: "Home" };
export const CV = { to: "/cv", text: "CV" }
export const PROJECTS = { to: "/projects", text: "Projects" };
export const PROJECT = { to: "/projects/:id/*", text: "Project" };
export const ABOUT = { to: "/about", text: "About" };
export const ERROR = { to: '*', text: "Error" };

// Legacy Routes
export const LEGACY_POLUS = { to: '/polus', redirect: "/projects/polus-site" }
export const LEGACY_POLUS_TERMS = { to: '/polus/terms', redirect: "/projects/polus-site/terms" }
export const LEGACY_POLUS_PRIVACY = { to: '/polus/privacy', redirect: "/projects/polus-site/privacy" }