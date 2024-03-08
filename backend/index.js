const express = require('express');
const cors = require('cors');
const multer = require('multer')
require('./db/config');
const User = require("./db/users");
const Products = require("./db/products");
const app = express();
app.use(cors());

app.use(express.json());



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix+file.originalname);
    }
})

const upload = multer({storage:storage})


app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        }
        else {
            res.send({ result: 'No user found' })
        }
    }
    else {
        res.send({ result: 'No user found' })
    }
})

app.post('/addproduct', upload.single("image"), async (req, res) => {

    try {
        // Extract form data from request body
        const { brand, name, price, desc , contact , email} = req.body;
        const image = req.file.filename; // Assuming 'image' is a file uploaded via FormData

        // Create a new product document
        const newProduct = new Products({
            image,
            brand,
            name,
            price,
            description: desc,
            contact,
            email
        });

        // Save the product to the database
        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }




});

app.get("/products" , async (req , res)=>{

    let products= await Products.find();
    if(products.length>0){
        res.send(products);
    }
    else{
        res.send({result:"No products found"});
    }

})

app.get('/products/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const products = await Products.find({ email: email });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

app.delete('/productdelete/:id' , async (req , res)=>{
    try {
        const id=req.params.id;
        const products=await Products.deleteOne({_id:id});
        res.send(products);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})



app.get('/', (req, res) => {
    res.send("server started");
})

app.listen(5000);