import { updateProduct } from "@/utils/actions/product/actions";
import { getProductById } from "@/utils/db/product/data";
import { ProductType } from "@/utils/db/models";
import styles from "@/app/ui/dashboard/products/single/productSinglePage.module.css";
import Image from "next/image";

const  ProductSinglePage = async ({params}:{
    params:{
        id:string
    }
}) => {
    const {id} = params;

    const product : ProductType = await getProductById(id);

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.product}>
                    <div className={styles.productImageWrapper}>
                        <Image 
                            className={styles.productImage} 
                            src={product.img || "/noproduct.jpg"} alt="" 
                            fill
                        />
                    </div>
                    <p className={styles.productname}>
                        {product.title}
                    </p>
                </div>
            </div>
            <form className={styles.form} action={updateProduct}>
                <label className={styles.label} htmlFor="title">title</label>
                <input type="text" placeholder={product.title}
                    name="title" id="title"  />
                <label htmlFor="price">Price</label>
                <input type="price" name="price" id="price"
                    placeholder={product.price.toString()}  />
                <label htmlFor="stock">Stock</label>
                <input type="number" placeholder={product.stock.toString()}
                    name="stock" id="stock" defaultValue={product.stock}/>
                <label htmlFor="size">Size</label>
                <input type="number" placeholder={product.size?.toString()} name="size" id="size"/>
                <label htmlFor="cat">Category</label>
                <select name="cat" id="cat">
                    <option value="general">Choose a Category</option>
                    <option value="genetal">unset(general)</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="phone">Phone</option>
                    <option value="computer">Computer</option>
                </select>
                <label htmlFor="desc">Description</label>
                <textarea name="desc" id="desc" rows={10} defaultValue={product.desc}></textarea>
                <input type="hidden" name="id" value={product._id.toString()} />
                <button type="submit">Update</button>
            </form>  
        </div>
    )
};

export default ProductSinglePage;