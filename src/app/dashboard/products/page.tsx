import { deleteProduct } from "@/app/lib/actions/product/actions";
import { createProd, getProducts } from "@/app/lib/db/product/data";
import { ProductType } from "@/app/lib/models";
import Pagination from "@/app/ui/dashboard/pagination/Pagination";
import styles from "@/app/ui/dashboard/products/productsPage.module.css"
import Search from "@/app/ui/dashboard/search/Search";
import Image from "next/image";
import Link from "next/link";

const  ProductPage = async({searchParams}:{searchParams:{q?:string,page:string}}) => {
    const ITEM_PER_PAGE = 1;

    const prodcutTitleByQuery = searchParams.q || "";

    const page = Number(searchParams.page) || 1;

    const products = await getProducts(prodcutTitleByQuery,page);

    const hasPrev = page === 1 ? false : true

    const hasNext = page * ITEM_PER_PAGE <= products.length && products.length !== 1;
    
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="seach for products" />
                <Link href={"/dashboard/products/add"}>
                    <button className={`${styles.button} ${styles.addButton}`}>
                        Add a new product
                    </button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Price</td>
                        <td>CreatedAt</td>
                        <td>Stock</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.slice(0,ITEM_PER_PAGE).map(
                            (product:ProductType) => {
                                return (
                                    <tr key={product._id}>
                                        <td>
                                            <div className={styles.product}>    
                                                <Image className={styles.productImage}
                                                    src={product.img || "/noproduct.jpg"}
                                                    alt=""
                                                    width={40} height={40}
                                                />
                                                {product.title}
                                            </div>
                                        </td>
                                        <td>{product.desc}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            {product.createdAt.toString().slice(4,15)}
                                        </td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <div className={styles.actionButtons}>
                                                <Link href={"/dashboard/products/"+product._id}>
                                                    <button className={`${styles.view} ${styles.button}`}>
                                                        View
                                                    </button>
                                                </Link>
                                                <form action={deleteProduct}>
                                                    <input type="hidden" name="id"
                                                        value={product._id.toString()} 
                                                    />
                                                    <button
                                                        type="submit"
                                                        className={`${styles.delete}
                                                            ${styles.button}`}
                                                    >
                                                        Delete
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
            <Pagination hasNext={hasNext} hasPrev={hasPrev}/> 
        </div>
    )
};


export default ProductPage;