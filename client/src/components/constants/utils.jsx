const NavigationConfig = {
    0: [ // Guest / not logged in
        { name: "Home", to: "/", submenus: null },
        { name: "About", to: "/about", submenus: null },
        { name: "Login", to: "/login", submenus: null },
        { name: "Register", to: "/register", submenus: null },
    ],
    1: [ // Admin
        { name: "Logout", to: "/viewer/viewerdashboard", submenus: null },
    ],
    2: [ // User
        { name: "Logout", to: "/viewer/viewerdashboard", submenus: null },
    ],
}

export const getNavigationConfig = (userType) => {
    return NavigationConfig[userType] || NavigationConfig[0];
};