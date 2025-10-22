import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import path from "path";


// Helper: Save uploaded file and return path
const saveFile = (file) => {
  if (!file) return null;
  const uploadDir = path.join("uploads", "products");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // Use originalFilename or fallback to "file"
  const originalName = file.originalFilename || file.name || "file";
  const ext = path.extname(originalName) || ".jpg"; // fallback extension
  const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}${ext}`;
  const savePath = path.join(uploadDir, fileName);

  fs.copyFileSync(file.path, savePath);
  return `/uploads/products/${fileName}`;
};



// CREATE PRODUCT
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      discountPrice,
      category,
      packages,
      stockStatus,
      isActive,
    } = req.fields;
    const { photo, bgphoto } = req.files;

    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({ success: false, error: "All required fields must be filled" });
    }

    // 🧩 Handle photo upload

    const product = new productModel({
      name,
      slug: slugify(name),
      description,
      price,
      quantity,
      discountPrice,
      packages: packages ? JSON.parse(packages) : [],
      category,
      photo: saveFile(photo),
      bgphoto: saveFile(bgphoto),
      stockStatus: stockStatus || "In Stock",
      isActive: isActive === "true" || isActive === true,
    });

    await product.save();
    res.status(201).json({ success: true, message: "✅ Product created", product });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};



// GET ALL PRODUCTS
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo -bgphoto")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "✅ Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching products",
      error,
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, error: "Error fetching product" });
  }
};

// SERVE PRODUCT PHOTO
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);
    if (!product?.photo) return res.status(404).send({ message: "Photo not found" });
    res.sendFile(path.join(process.cwd(), product.photo));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching photo", error });
  }
};

// SERVE BACKGROUND PHOTO
export const productBgPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);
    if (!product?.bgphoto) return res.status(404).send({ message: "Background photo not found" });
    res.sendFile(path.join(process.cwd(), product.bgphoto));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching background photo", error });
  }
};

// DELETE PRODUCT
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).json({ success: true, message: "🗑️ Product deleted", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params; // match route parameter
    const {
      name,
      description,
      price,
      quantity,
      discountPrice,
      category,
      packages,
      stockStatus,
      isActive,
    } = req.fields;
    const { photo, bgphoto } = req.files;

    const product = await productModel.findById(pid); // use pid
    if (!product) return res.status(404).json({ success: false, error: "Product not found" });

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (discountPrice) product.discountPrice = discountPrice;
    if (quantity) product.quantity = quantity;
    if (category) product.category = category;
    if (packages) product.packages = JSON.parse(packages);
    if (stockStatus) product.stockStatus = stockStatus;
    if (isActive !== undefined) product.isActive = isActive === "true" || isActive === true;

    if (photo) product.photo = saveFile(photo);
    if (bgphoto) product.bgphoto = saveFile(bgphoto);

    await product.save();
    res.status(200).json({ success: true, message: "✅ Product updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};







//FILTER PRODUCTS
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio, packages } = req.body;
    let args = {};

    if (checked?.length) args.category = checked;
    if (radio?.length) args.price = { $gte: radio[0], $lte: radio[1] };
    if (packages) args.packages = packages;

    const products = await productModel.find(args).select("-photo");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error filtering products",
      error,
    });
  }
};

// PRODUCT COUNT
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error counting products",
      error,
    });
  }
};

// PRODUCT LIST (Pagination)
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error fetching product list",
      error,
    });
  }
};

// SEARCH PRODUCTS
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { packages: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");

    res.status(200).send({
      success: true,
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error searching products",
      error,
    });
  }
};




// GET PRODUCT STATS
export const productStatsController = async (req, res) => {
  try {
    const totalProducts = await productModel.countDocuments();
    const activeProducts = await productModel.countDocuments({ isActive: true });
    const totalStockAgg = await productModel.aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
    ]);
    const totalStock = totalStockAgg[0]?.totalQuantity || 0;

    // Count distinct categories
    const totalCategories = await productModel.distinct("category");

    res.status(200).json({
      success: true,
      totalProducts,
      activeProducts,
      totalStock,
      totalCategories: totalCategories.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch product stats" });
  }
};
