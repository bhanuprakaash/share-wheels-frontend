interface NavItem {
    path: string;
    name: string;
    icon: string;
}

const navItems: NavItem[] = [
    // {path: '/', name: 'Home', icon: 'home'},
    {path: '/search', name: 'Search', icon: 'search'},
    {path: '/trip', name: 'My Trips', icon: 'directions_car'},
    {path: '/rides', name: 'My Rides', icon: 'directions_car'},
    {path: '/notifications', name: 'Notifications', icon: 'notifications'},
    {path: '/profile', name: 'Profile', icon: 'person'},
];

export default navItems;