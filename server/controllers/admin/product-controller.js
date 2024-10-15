const {imageUploadUtil} = require('../../helpers/cloudinary')
const Product = require('../../models/Product')

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);
    
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while processing the image",
    });
  }
};


const addProduct = async(req,res) =>{
    try {

        const {image ,title , description , category , brand , price , salePrice, totalStock , averageReview} = req.body;
        
        console.log(averageReview, "averageReview");

        const newlyProduct = new Product({
          image ,
          title,
          description , 
          category,
          brand,
          price,
          salePrice,
          totalStock,
          averageReview
        })

        await newlyProduct.save();
        res.status(200).json({
          success: true,
          message: "Product saved successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
      success: false,
      message: "Error occurred",
        });     
    }
}


const fetchAllProduct = async (req, res) => {
  try {

    const products = await Product.find({});
    
   
    res.status(200).json({
      success: true,
      data: products, 
    });
  } catch (error) {
    console.error("Error during product fetch:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching products",
    });
  }
};


const editProduct = async(req,res) =>{
  try {

    const {id} = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });


      findProduct.title = title || findProduct.title;
      findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
    
  } catch (error) {
    console.log(error);
    res.json({
  success: false,
  message: "Error occurred",
    });     
  }
}

const deleteProduct = async(req,res) =>{
  try {

    const {id} = req.params;

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
    
  } catch (error) {
    console.log(error);
        res.json({
      success: false,
      message: "Error occurred",
        }); 
  }
}




module.exports = {handleImageUpload , addProduct , editProduct , deleteProduct , fetchAllProduct};