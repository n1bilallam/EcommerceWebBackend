const slugify = require("slugify");
const Category = require("../models/category");
const shortid = require("shortid");

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

exports.addCategory = (req, res) => {
  const categoryObject = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };

  if (req.file) {
    categoryObject.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }

  if (req.body.parentId) {
    categoryObject.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObject);
  cat.save((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      return res.status(201).json({ categories });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoyList = createCategories(categories);
      return res.status(200).json({ categoyList });
    }
  });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updatedCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deleteCategories = [];

  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findByIdAndDelete({
      _id: ids[i]._id,
    });
    deleteCategories.push(deleteCategory);
  }
  if (deleteCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Somtheings went wrong, try again!" });
  }
};
