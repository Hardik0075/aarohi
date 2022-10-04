const express = require("express");
const fs= require("fs");
const app= express();

 const menuhtml =fs.readFileSync(__dirname+'/review.html','utf-8');

  const menhtml =fs.readFileSync(__dirname+'/contact.html','utf-8');
  const striphtml =fs.readFileSync(__dirname+'/strip.html','utf-8');

  const strphtml =fs.readFileSync(__dirname+'/menu.html','utf-8');
 const menu_json =fs.readFileSync(__dirname+'/menu.json','utf-8');
const men_json= fs.readFileSync(__dirname+'/menu1.json','utf-8');
 const menu_obj=JSON.parse(menu_json);

  const menu1_obj=JSON.parse(men_json);
app.use(express.static("public"));

app.use('/images', express.static('images'));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.get("/in",function(req,res){
  res.sendFile(__dirname+"/aa.html");
})
app.get("/review",function(req,res){
  res.sendFile(__dirname+"/review.html");

  const replaceItems=(strp,item)=>{
    let newhtml = strp.replace(/{%foodname%}/g,item.foodname);
    newhtml = newhtml.replace(/{%from%}/g,item.from);
    newhtml = newhtml.replace(/{%Quantity%}/g,item.quantity);
    newhtml = newhtml.replace(/{%Price%}/g,item.price);
    return newhtml;

  }

  app.get("/review/home",function(req,res){
    res.sendFile(__dirname+"/index.html");
  })

  const update = menu_obj.map(element=>replaceItems(striphtml,element));
  const final = menuhtml.replace(/{%food-item%}/g,update);
  res.send(final);

})
app.get("/gallery",function(req,res){
  res.sendFile(__dirname+"/gallery.html");
})
app.get("/try",function(req,res){
  res.sendFile(__dirname+"/try.html");
})
app.get("/contact",function(req,res){


      const replaceItem=(strep,items)=>{
        let nwhtml = strep.replace(/{%naam%}/g,items.naam);
        nwhtml = nwhtml.replace(/{%kha%}/g,items.kha);
        nwhtml = nwhtml.replace(/{%kab%}/g,items.kab);
        nwhtml = nwhtml.replace(/{%kitna%}/g,items.kitna);
        return nwhtml;

      }

      const update = menu1_obj.map(element=>replaceItem(strphtml,element));
      const final = menhtml.replace(/{%food-item%}/g,update);
      console.log(update);
      res.send(final);

        res.sendFile(__dirname+"/contact.html");
})
app.get("/review/gallery",function(req,res){
  res.sendFile(__dirname+"/gallery.html");
})

console.log("hello");



app.listen(3000);
