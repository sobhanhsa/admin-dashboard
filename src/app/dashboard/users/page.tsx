import styles from "@/app/ui/dashboard/users/userPage.module.css"
import Search from "../../ui/dashboard/search/Search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/Pagination";
import { getUsers } from "@/app/lib/db/user/data";
import { UserModel, UserType } from "@/app/lib/models";
import { deleteUser } from "@/app/lib/actions/user/actions";

const  UserPage = async({searchParams}:{searchParams:{q?:string,page:string}}) => {
    
    const ITEM_PER_PAGE = 1;

    const usernameByQuery = searchParams.q || "";

    const page = Number(searchParams.page) || 1;

    const users = await getUsers(usernameByQuery,page);

    const hasPrev = page === 1 ? false : true

    const hasNext = page * ITEM_PER_PAGE <= users.length && users.length !== 1;

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="seach for users" />
                <Link href={"/dashboard/users/add"}>
                    <button className={`${styles.button} ${styles.addButton}`}>
                        Add a new user
                    </button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>CreatedAt</td>
                        <td>Role</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {users.slice(0,ITEM_PER_PAGE).map((user : UserType )=> (
                        <tr key={user._id}>
                            <td>
                                <div className={styles.user}>    
                                    <Image className={styles.userImage}
                                        src={user.img || "/noavatar.png"}
                                        alt=""
                                        width={40} height={40}
                                    />
                                    {user.username}
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>
                                {user.createdAt.toString().slice(4,15)}
                            </td>
                            <td>{user.isAdmin ? "admin" : "client"}</td>
                            <td>{user.isActive ? "active" : "passive"}</td>
                            <td>
                                <div className={styles.actionButtons}>
                                    <Link href={"/dashboard/users/"+user._id}>
                                        <button className={`${styles.view} ${styles.button}`}>
                                            View
                                        </button>
                                    </Link>
                                    <form action={deleteUser}>
                                        <input type="hidden" name="id" 
                                            value={user._id.toString()}/>
                                        <button type="submit"
                                            className={`${styles.delete} ${styles.button}`}>
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    ))}
                        
                </tbody>
            </table>
            <Pagination hasPrev={hasPrev} hasNext={hasNext} />
        </div>
    )
};

export default UserPage;