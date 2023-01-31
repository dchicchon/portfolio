export const projectMap = {

    "polus-site": {
        title: "Polus",
        description: "A planner application",
        export: () => import("../../../../polus-site/src/App.jsx"),
        icon: import("../../../../polus-site/src/assets/images/polus_icon_64x64.png")
    },

    "react-wordymap": {
        title: "Wordymap",
        description: "A bananagram emulator",
        export: () => import("../../../../react-wordymap/src/index.jsx"),
        icon: ""
    },

    "topo-art": {
        title: "Topo",
        description: "A mapbox app to find cool contour lines from the planet",
        export: () => import("../../../../topo-art/src/App.jsx"),
        icon: ""
    },
};