const Category = require("../../models/category");
const Product = require("../../models/product");

function createCategories(categories, parentId = null) {
  const categoyList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoyList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
      type: cate.type,
    });
  }
  return categoyList;
}
exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id name quantity slug description price productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();
  res.status(200).json({
    categories: createCategories(categories),
    products,
  });
};
