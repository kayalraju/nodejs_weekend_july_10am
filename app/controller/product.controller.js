const { productModel, productSchemavalidation } = require('../model/product.model');

class productController {
    async createProduct(req, res) {
        try {
            // const {name, price, description} = req.body;
            const dataSchema = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description
            }
            const { error, value } = productSchemavalidation.validate(dataSchema);
            if (error) {
                return res.status(300).json({
                    message: error.details[0].message,
                })
            } else {
                const Adddata = new productModel(value);
                if(req.file){
                    Adddata.image = req.file.filename;
                }
                const resp = await Adddata.save();
                return res.status(200).json({
                    message: 'Product added successfully',
                    data: resp
                })

            }

        } catch (error) {
            console.log('Error while creating product: ', error);

        }
    }

    async fetchAllProduct(req, res) {
        try {
            const resp = await productModel.find();

            if (resp) {
                res.status(200).json({
                    message: `All products are fetched successfully!`,
                    total: resp.length,
                    data: resp
                })
            }
            else {
                res.status(400).json({
                    message: 'Something went wrong!',
                    data: resp
                })
            }
        } catch (error) {
            console.log('Error while fetching all products: ', error);

        }
    }

    async fetchProductById(req, res) {
        try {
            const id = req.params.id;

            const resp = await productModel.findById(id);

            if (resp) {
                res.status(200).json({
                    message: `Product fetched successfully!`,
                    total: resp.length,
                    data: resp
                })
            }
            else {
                res.status(400).json({
                    message: 'Something went wrong!',
                    data: resp
                })
            }
        } catch (error) {
            console.log('Error while fetching product: ', error);
        }
    }

    async editProduct(req, res) {
        try {
            const id = req.params.id;

            const resp = await productModel.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
            })

            if (resp) {
                res.status(200).json({
                    message: `Product updated successfully!`,
                    data: req.body
                })
            }
            else {
                res.status(400).json({
                    message: 'Something went wrong!',
                    data: resp
                })
            }
        } catch (error) {
            console.log('Error while updating product: ', error);
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.id;

            const resp = await productModel.findByIdAndDelete(id);

            if (resp) {
                res.status(200).json({
                    message: `Product deleted successfully!`,
                    data: req.body
                })
            }
            else {
                res.status(400).json({
                    message: 'Something went wrong!',
                    data: resp
                })
            }
        } catch (error) {
            console.log('Error while deleting product: ', error);
        }
    }
}

module.exports = new productController();