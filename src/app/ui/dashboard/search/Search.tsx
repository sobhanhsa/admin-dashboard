"use client"

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, EventHandler } from "react";
import { useDebouncedCallback } from "use-debounce";

const  Search = 
    ( 
        {placeholder}:
        {placeholder:string}
        ) => {
            
            const searchParams = useSearchParams();
    
            const {replace} = useRouter();
    
            const path = usePathname();
            
            const params = new URLSearchParams(searchParams);
            
            if (!(params.get("page"))){
                params.set("page","1");
                replace(`${path}?${params}`);
            }

            const handleSearch = useDebouncedCallback((e:any) => {
                
                    
                    if (!e.target.value) {
                        params.delete("q") 
                    }else {
                        params.set("page","1")
                        params.set("q",e.target.value);
                    };

            
                    
                    replace(`${path}?${params}`);
                    
                },500
            );
    
            return (
                <div className={styles.container}>
                <MdSearch />
                <input className={styles.input} onChange={handleSearch} type="text" placeholder={placeholder} />   
            </div>
        )
};

export default Search;