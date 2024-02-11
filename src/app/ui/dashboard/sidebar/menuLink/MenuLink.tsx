"use client"

import Link from "next/link";
import styles from "./menuLink.module.css"
import { usePathname } from "next/navigation";

const  MenuLink = (
        {item}
        :
        {
            item:   {
                path:string,
                title:string,
                icon:React.ReactNode,
            },
        }
    ) => {
        const path = usePathname()

        return (
            <Link 
                href={item.path} 
                className=
                {`
                    ${styles.container}
                    ${path === item.path && styles.active}
                `}
            >
                {item.icon}
                {item.title}  
            </Link>
        )
};

export default MenuLink;