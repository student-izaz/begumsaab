const User = require('../models/User')
const Products = require('../models/Product');

const adminLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userExist = await User.findOne({email});
        if (!userExist) return res.status(401).json({msg: "Invalid Credentials !"});

        if(userExist.isAdmin){
            res.status(200).json({msg: 'Admin Login Successfully !'})
        }else{
            res.status(500).json({msg: 'Unauthorized Error !'})
        }
    } catch (error) {
        res.status(400).json({msg: 'Admin Login Error', error})
        console.log(error);
    }
}

const addCategory = async (req, res) => {
    try {
        const { name,category } = req.body;
        console.log(name,category);
    } catch (error) {
        console.log(error)
    }
}

const allProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({msg: "Product not fetch..."})
    }
}

module.exports = { adminLogin, addCategory, allProducts }