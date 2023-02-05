const mongoose = require('mongoose'); 
const { stringify } = require('uuid');

const allProducts = require('./model/kindOfProducts');
mongoose.connect('mongodb://127.0.0.1:27017/storeStatics',{useNewUrlParser:true,useUnifiedTopology:true})

 .then(() =>{
    console.log('Mongo connection open!!!')
})
 .catch(err =>{
    console.log('Oh No Mongo connection error')
    console.log(err)
});

const newProducts = [
    {
        name:'Apple',
        price:100,
        category:'fruit'
    },
    {
        name:'Carrot',
        price:50,
        category:'vegetable'
    },
    {
        name:'Dairymilk',
        price:250,
        category:'dairy'
    },
    {
        name:'fogg',
        price:125,
        category:'perfume'
    }
]
allProducts.insertMany(newProducts)
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})