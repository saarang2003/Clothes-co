import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card"

function AdminProductTile({
    product,
    setFormData,
    setOpenCreateProductsDialog,
    setCurrentEditedId,
    handleDelete,
}) {
  const handleEdit = () => {
    const formattedProduct = {
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand,
      price: product.price.toString(),
      salePrice: product.salePrice ? product.salePrice.toString() : "",
      totalStock: product.totalStock.toString(),
      image: product.image,
      // Add any other fields that are in your form
    };

    setOpenCreateProductsDialog(true);
    setCurrentEditedId(product._id);
    setFormData(formattedProduct);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img 
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          /> 
        </div>
        <CardContent>
          <h2 className="text-xl font-semibold mt-2 mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={handleEdit}>
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  )
}

export default AdminProductTile