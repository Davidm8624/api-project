const express = require("express");
const app = express();
const {menu} = require("./menu-data")

//default page with items catorgaized
app.get('/', (req,res)=>{
  const breakfast = menu.filter((item) => {
    return item.category === 'breakfast';
  })
  const lunch = menu.filter((item) => {
    return item.category === 'lunch';
  })
  const shakes = menu.filter((item) => {
    return item.category === 'shakes';
  })
  res.json({result: {breakfast: breakfast, lunch: lunch, shakes: shakes}})
})

//params search sections
.get('/menu/:id', (req,res) => {
  const {id} = req.params
  const singleMeal = menu.find((meal) => {
    return meal.id === Number(id)
  })
  if(!singleMeal){
    res.json({results: [], msg: "product not found"})
  }
  res.json({results: [singleMeal], msg:"found"})
})
  
//price low-high/high-low


//query section, only filters by the food category
//to get to this page you: http://localhost:5000/category?category=lunch&price=asc
.get('/category', (req,res) => {
  const {category, price} = req.query
  let newMenu = [...menu]
  if(category){
    newMenu = menu.filter((item) => {
      return item.category.includes(category)
    })
  }
  if(price){
    if(price === "asc"){
      newMenu = newMenu.sort((a,b) => a.price - b.price)
    }
    if(price === "dec"){
      newMenu = newMenu.sort((a,b) => b.price - a.price)
    }
  }
  res.json({results: newMenu, msg:"found"})
})


.listen(5000, () => {
  console.log("listening on port 5000");
})