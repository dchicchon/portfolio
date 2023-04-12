export const projectMap = {
"colaCo": {
title: "ColaCo",
description: "Best soda machine on the web",
export: () => import("../../../../colaCo/client/src/App.jsx"),
},
"polus-site": {
title: "Polus",
description: "A planner application",
export: () => import("../../../../polus-site/src/App.jsx"),
icon: () => import("/Users/danielchicchon/Code/reactProjects/polus-site/src/assets/images/polus_icon_64x64.png"),
},
"react-wordymap": {
title: "Wordymap",
description: "A bananagram emulator",
export: () => import("../../../../react-wordymap/src/index.jsx"),
},
"topo-art": {
title: "Topo",
description: "A mapbox app to find cool contour lines from the planet",
export: () => import("../../../../topo-art/src/App.jsx"),
},
};