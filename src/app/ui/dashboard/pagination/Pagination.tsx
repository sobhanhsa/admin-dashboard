"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./pagination.module.css"

const  Pagination = ({hasNext,hasPrev}:{hasNext:boolean,hasPrev:boolean}) => {
    const searchParams = useSearchParams();
    
    const {replace} = useRouter();
    
    const path = usePathname();
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() =>{
                const params = new URLSearchParams(searchParams);
                const currnetPage = Number(params.get("page"));
                params.set("page",(currnetPage - 1).toString())
                replace(`${path}?${params}`);

            }} disabled={!hasPrev}>Previous</button>
            <button className={styles.button} onClick={() =>{
                const params = new URLSearchParams(searchParams);
                const currnetPage = Number(params.get("page"));
                params.set("page",(currnetPage + 1).toString())
                replace(`${path}?${params}`);

            }} disabled={!hasNext}>Next</button>
        </div>
    )
};

export default Pagination;