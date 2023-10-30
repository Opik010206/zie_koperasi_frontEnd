import AddProduk from "./addProduk";
import DeleteProduct from "./deleteProduk";
import UpdateProduct from "./updateProduct";

type Product = {
    id: number;
    title: string;
}

async function getProducts() {
    const res = await fetch("http://localhost:3001/products", {
        cache: "no-store"
    });
    return res.json();
}

export default async function ProductList() {
    const products: Product[] = await getProducts();
  return (
    <div className="p-10">
        <div className="py-2">
            <AddProduk />
        </div>
        <table className="table w-full">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Produk</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.title}</td>
                        <td className="flex gap-2">
                            <UpdateProduct {...product} />
                            <DeleteProduct {...product} />
                        </td>
                    </tr>
                ))} 
            </tbody>
        </table>

        
    </div>
  )
}
