import { updateUser } from "@/app/lib/actions/user/actions";
import { getUserById } from "@/app/lib/db/user/data";
import { UserType } from "@/app/lib/models";
import styles from "@/app/ui/dashboard/users/single/userSinglePage.module.css";
import Image from "next/image";

const  UserSinglePage = async ({params}:{
    params:{
        id:string
    }
}) => {
    const {id} = params;

    const user : UserType = await getUserById(id);
    

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.user}>
                    <div className={styles.userImageWrapper}>
                        <Image className={styles.userImage} 
                            src={"/noavatar.png"} alt="" 
                            fill
                        />
                    </div>
                    <p className={styles.username}>
                        {user?.username ?? "user not found"}
                    </p>
                </div>
            </div>
            <form className={styles.form} action={updateUser}>
                <label className={styles.label} htmlFor="name">Username</label>
                <input type="text" placeholder={user.username} name="username" id="username"  />
                <label htmlFor="email">Email</label>
                <input type="email" placeholder={user.email} name="email" id="email"  />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="at leat 8 charc" name="password" id="password"  />
                <label htmlFor="phone">Phone Number</label>
                <input type="phone" placeholder={user.phone || "+11111111111"} name="phone" id="phone"/>
                <label htmlFor="isAdmin">Role</label>
                <select name="isAdmin" id="isAdmin" defaultValue={user.isAdmin ? "true" : "false"}>
                    <option value="true" selected={user.isAdmin} defaultValue={""}>admin</option>
                    <option value="false"selected={!(user.isAdmin)} defaultValue={""}>client</option>
                </select>
                <label htmlFor="isActive">Status</label>
                <select name="isActive" id="isActive" defaultValue={user.isActive ? "true" : "false"}>
                    <option value="true" selected={user.isActive} defaultValue={""}>active</option>
                    <option value="false" selected={!(user.isActive)} defaultValue={""}>passive</option>
                </select>
                
                <label htmlFor="address">Address</label>
                <textarea
                    
                    name="address"
                    id="address"
                    rows={2 }
                    placeholder={user.address?.toString()}
                />
                <input type="hidden" name="id" value={user._id.toString()} />
                <button type="submit">Update</button>
            </form>
        </div>
    )
};

export default UserSinglePage;