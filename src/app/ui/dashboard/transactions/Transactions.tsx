import Image from "next/image";
import styles from "./transactions.module.css"

const  Transactions = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Latest transactions
            </h2> 
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td className={styles.header}>Name</td>
                        <td className={styles.header}>Status</td>
                        <td className={styles.header}>Date</td>
                        <td className={styles.header}>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image className={styles.userImage}
                                    src="/noavatar.png"
                                    alt=""
                                    width={40} height={40}
                                />
                                pille ss
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>
                                pending
                            </span>
                        </td>
                        <td>
                            1.11.2024
                        </td>
                        <td>
                            $1000
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image className={styles.userImage}
                                    src="/noavatar.png"
                                    alt=""
                                    width={40} height={40}
                                />
                                sobhan ss
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>
                                Done
                            </span>
                        </td>
                        <td>
                            1.11.2024
                        </td>
                        <td>
                            $1000
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image className={styles.userImage}
                                    src="/noavatar.png"
                                    alt=""
                                    width={40} height={40}
                                />
                                qolam ss
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.cancelled}`}>
                                Cancelled
                            </span>
                        </td>
                        <td>
                            1.11.2024
                        </td>
                        <td>
                            $1000
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default Transactions;