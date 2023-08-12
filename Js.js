const express = require("express");
const fs= require("fs");
const app= express();


/** pug templates.......
const path= require("path");
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

app.get("/demo",function(req,res){
   res.render('rat', { title:'Hey', message: 'Hello there! i am Hardik' })
})

app.get("/emo",function(req,res){
   res.render('rat', { title:'row', message: 'Hello, i am Hardik' })
})
**/

app.use(express.static("public"));
app.use('/images', express.static('images'));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.get("/index.html",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.get("/gallery.html",function(req,res){
  res.sendFile(__dirname+"/gallery.html");
})

app.get("/aa.html",function(req,res) {
  res.sendFile(__dirname+"/aa.html");
})
app.get("/try.html",function(req,res) {
 res.sendFile(__dirname+"/try.html");
})
// json to js to html......
const menuhtml =fs.readFileSync(__dirname+'/review.html','utf-8');
const menu_json =fs.readFileSync(__dirname+'/menu.json','utf-8');
const menu_obj=JSON.parse(menu_json);
const striphtml =fs.readFileSync(__dirname+'/strip.html','utf-8');


app.get("/review.html",function(req,res){
      const replaceItem=(strep,items)=>{
        let nwhtml = strep.replace(/{%foodname%}/g,items.foodname);
        nwhtml = nwhtml.replace(/{%from%}/g,items.from);
        nwhtml = nwhtml.replace(/{%Quantity%}/g,items.quantity);
        nwhtml = nwhtml.replace(/{%Price%}/g,items.price);
        return nwhtml;

      }

      const update = menu_obj.map(element=>replaceItem(striphtml,element));
      const final = menuhtml.replace(/{%food-item%}/g,update);
      //console.log(updat);
      res.send(final);



  {res.sendFile(__dirname+"review.html")};
})


 const menhtml =fs.readFileSync(__dirname+'/contact.html','utf-8');
  const men2_html =fs.readFileSync(__dirname+'/menu.html','utf-8');
 const men_json= fs.readFileSync(__dirname+'/menu1.json','utf-8');
  const men2_obj=JSON.parse(men_json);


app.get("/contact.html",function(req,res){
  const replaceItems=(strp,item)=>{
    let newhtml = strp.replace(/{%naam%}/g,item.naam);
    newhtml = newhtml.replace(/{%kha%}/g,item.kha);
    newhtml = newhtml.replace(/{%kab%}/g,item.kab);
    newhtml = newhtml.replace(/{%kitna%}/g,item.kitna);
    return newhtml;
  }  
  const update = men2_obj.map(element=>replaceItems(men2_html,element));
  const final = menhtml.replace(/{%food-item%}/g,update);
console.log(update);
  res.send(final);

  res.sendFile(__dirname+"/contact.html");
})

console.log("hello");



app.listen(3000);
