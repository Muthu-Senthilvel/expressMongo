const express = require ('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose'); 
const {stringify} = require('uuid');
const methodOverride = require('method-override')

const allProducts = require('./model/kindOfProducts');
mongoose.connect('mongodb://127.0.0.1:27017/storeStatics',{useNewUrlParser:true,useUnifiedTopology:true})
 .then(() =>{
    console.log('Mongo connection open!!!')
})
 .catch(err =>{
    console.log('Oh No Mongo connection error')
    console.log(err)
});

app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/products',async(req,res)=>{
    const findProducts = await allProducts.find({})
    res.render('Products.ejs',{findProducts})
})

app.get('/products/insert',(req,res)=>{
    res.render('New.ejs')
})
app.post('/products',async(req,res)=>{
    const addedProduct =new allProducts(req.body);
    await addedProduct.save();
    res.redirect(`/products/${addedProduct._id}`)
})

app.get('/products/:id',async(req,res)=>{
    const{id} = req.params;
    const foundProduct = await allProducts.findById(id)
    res.render('selectedProduct',{foundProduct})
})

app.get('/products/:id/edit',async(req,res)=>{
    const{id} = req.params;
    const foundProduct = await allProducts.findById(id);
    res.render('edit.ejs',{foundProduct})
})
app.put('/products/:id',async(req,res)=>{
    const{id}=req.params;
    const foundProduct=await allProducts.findByIdAndUpdate(id, req.body,{runValidators:true,new:true});
    res.redirect(`/products/${foundProduct._id}`);
})

app.delete('/products/:id',async(req,res)=>{
    const{id}=req.params;
    const deleteProduct= await allProducts.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000,()=>{
    console.log('App is listening on port 3000')
})
