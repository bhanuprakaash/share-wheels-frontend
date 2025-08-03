import navItems from "./NavItems.ts";
import Logo from "../basic/Logo.tsx";
import NavItem from "./NavItem.tsx";

const Sidebar = () => {
    return (
        <div className="w-72 border-r-1 border-r-[#E8F2E8] p-2 h-screen flex flex-col fixed top-0 left-0">
            <Logo customClasses={"m-auto mt-2"}/>

            <nav className="flex-1 py-4">
                <ul className="space-y-2 px-4">
                    {navItems.map((item) => (
                        <NavItem navItem={item} key={item.path}/>
                    ))}
                </ul>
            </nav>

        </div>
    )
};

export default Sidebar;