import { MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdAttachMoney, MdWork, MdAnalytics, MdPeople, MdOutlineSettings, MdHelpCenter, MdLogout } from "react-icons/md";
import styles from "./sidebar.module.css"
import Image from "next/image";
import MenuLink from "./menuLink/MenuLink";
import { logOut } from "@/utils/actions/auth/actions";
import { auth } from "@/app/auth";
import { NextAuthResult, Session } from "next-auth";
const menuItems = [
{
    title: "Pages",
    list: [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
    },
    {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
    },
    {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
    },
    {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
    },
    ],
},
{
    title: "Analytics",
    list: [
    {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
    },
    {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
    },
    {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
    },
    ],
},
{
    title: "User",
    list: [
    {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
    },
    {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
    },
    ],
},
];

const Sidebar  = async() => {
    
    const session : Session | null  = await auth();
    console.log(session);
    
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src={(session?.user as any).img || "/noavatar.png"} 
                    alt="" height={50} width={50}
                />
                <div className={styles.userDetail}>
                    <span className={styles.username}>
                        {(session?.user as any).username}
                    </span>
                    <span className={styles.userTitle}>
                        Administrator
                    </span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map(cat=>
                    <li key={cat.title}>
                        <span className={styles.cat}>
                            {cat.title}
                        </span>
                        
                        {
                            cat.list.map(link => (
                                <MenuLink 
                                    key={link.title}
                                    item={link}
                                />
                            ))
                        }
                        
                    </li>   
                )}
            </ul>
            <form action={logOut}>
                <button className={styles.logout}>
                    <MdLogout/>
                        
                    Logout
                        
                </button>
            </form>
        </div>
    )
};

export default Sidebar;