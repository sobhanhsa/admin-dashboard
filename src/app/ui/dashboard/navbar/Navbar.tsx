"use client"

import { MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdAttachMoney, MdWork, MdAnalytics, MdPeople, MdOutlineSettings, MdHelpCenter, MdSearch, MdOutlineChat, MdNotificationImportant, MdNotifications, MdPublic } from "react-icons/md";

import { usePathname } from "next/navigation";
import styles from "./navbar.module.css"

const Navbar  = () => {

    const path = usePathname()
    
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {path.split("/").pop()}
            </div>
            <div className={styles.menu}>
                <div className={styles.search}>
                    <label htmlFor="seachInput">
                        <MdSearch />
                    </label>
                    <input 
                        className={styles.searchInput}
                        type="text" 
                        id="seachInput"
                        placeholder="Seach..."
                    />
                </div>
                <div className={styles.icons}>
                    <MdOutlineChat size={20}/>
                    <MdNotifications size={20}/>
                    <MdPublic size={20}/>
                </div>
            </div>
        </div>
    )
};

export default Navbar;