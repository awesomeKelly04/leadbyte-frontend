export default [
    {
        path: "/",
        name: "Onboarding",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/onboarding/Onboarding.vue")
    },
    {
        path: "/listAllRecord",
        name: "List All Record",
        meta: { layout: 'ListAllRecord' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/onboarding/ListAllRecord")
    },
    {
        path: "/searchNin",
        name: "Search Nin",
        meta: { layout: 'SearchNin' },
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/onboarding/SearchNin")
    },
    {
        path: "/viewNinData",
        name: "View Nin Data",
        meta: { layout: 'ViewNinData' },
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/onboarding/ViewNinData")
    },
    
    {
        path: "/success",
        name: "registration_successful",
        meta: { layout: 'Login' },
        component: () => import("../components/splashPages/Sent")
    },
];
