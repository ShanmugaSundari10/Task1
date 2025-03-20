var addbtn=document.getElementById("addbtn"); // open the form window
var addcontainar=document.querySelector(".addcontai");
var addform=document.querySelector(".addform")
var gencode;
var funtable=document.querySelector(".funtable");
var currenteditItem = null;
var currendrillItem = null;
window.onload = detaload;
function detaload(){
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i); 
            const storedItem = localStorage.getItem(key); 
            const parsedItem = JSON.parse(storedItem);
            var div=document.createElement("div");
            div.setAttribute("class","fun1")
           var newrow=document.createElement("tr")
             newrow.innerHTML=`
            <td id='drilltd'><div id='drill'><button id='drillbtn' class='drillbtn1' onclick='drillfun(${key})'> > </button></div></td>
             <td>${parsedItem.no}</td>
              <td>${parsedItem.code}</td>
            <td>${parsedItem.title}</td>
           <td>${ parsedItem.category}</td>
           <td>${parsedItem.price}</td>
            <td><button id='editbtn' onclick='editfun(${key})'>Edit</button> 
            <button id='delbtn'onclick='deleterow(event,${key})'>Delete</button></td>`;
           funtable.append(newrow);
           var newrow2=document.createElement("tr")
           newrow2.setAttribute("id","hidenrow")
           newrow2.innerHTML=`
           <td id='newdes'>
            <div id='newdesdiv' class='newdesdiv1'>
             <div id='part1'> ${parsedItem.description}</div>
             <div id='part2'><img scr='https://www.w3schools.com/images/picture.jpg' width='130px' height='145px' id='imgborder2'></div>
            </div>
           </td>`
           funtable.append(newrow2);
        }  
    }
    function deleterow(key){
        localStorage.removeItem(key);
  }
// // counting value
var j=0;
function count(){
    j++;
    return j;
}
//drill down div
// function drillfun(event){
//     const newdesdiv = document.querySelector(`#newdesdiv-${key}`);
//     const drillBtn = document.querySelector(`#drillbtn-${key}`);
//     event.target.style.transfrom = "display : "
// }
function drillfun(key){
    currendrillItem = key
    const storedItem = localStorage.getItem(key); 
     const parsedItem = JSON.parse(storedItem);
    const rows = document.querySelectorAll("tr");
    for (let row of rows) {
        const rowData = row.querySelector('td:nth-child(2)');
        if (rowData && rowData.textContent == currendrillItem){
            var row2=row.nextElementSibling;
              const targetTd = row2.querySelector('#newdes');
               if (targetTd) {
                targetTd.setAttribute("colspan", "7"); // Set the colspan to 7 
               }
           if (row2.style.display === "none") {
            
                row2.style.display = "block";
            document.querySelector(`#drillbtn`).textContent = "^";
            } else {
                row2.style.display = "none";
                document.querySelector(`#drillbtn`).textContent = ">";
            }
        }
        
}
}
//  var newdec = row2.document.querySelector('#newdesdiv') ;
// document.querySelectorAll('tr#hidenrow > td#newdes')=>td.setAttribute('colspan', 7);

            //    row2.innerHTML=`
            //    <td id='newdes' colspan=7>
            //      <div id='newdesdiv' class='newdesdiv1'>
            //      <div id='part1'> ${parsedItem.description}</div>
            //      <div id='part2'></div>
            //      </div>
            //    </td>`
// function drillfun(key){
//     // document.querySelector(`#drill-${key}`).innerHTML=`
//     // <button id='drillbutton' class='drillbutton1' onclick='drillbtnfun(${key})'> ^ </button>`
//     // document.querySelector(`#newdesdiv-${key}`).style.display ="block";
//     
//     if (newdesdiv.style.display === "none") {
//         newdesdiv.style.display = "block";
//         drillBtn.textContent = "^";
//     } else {
//         newdesdiv.style.display = "none";
//         drillBtn.textContent = ">";
//     }
// }
// function drillbtnfun(key){
//     document.querySelector(`zdrill-${key}`).innerHTML=`
//     <button id='drillbtn' class='drillbtn1' onclick='drillfun(${key})'> > </button>`
//     document.querySelector(`#newdesdiv-${key}`).style.display ="none";
// }
// add table button funcion
addbtn.addEventListener("click",function(){
    addcontainar.style.display="block";
    addform.style.display="block";
    gencode=generateRandomString(10);
});
// cancel button
var cancelbtn=document.getElementById("cancelbtn");
cancelbtn.addEventListener("click",function(){
    addcontainar.style.display="none";
    addform.style.display="none";
});

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    document.getElementById("code").value = result;
}
// //submit form validate
var title=document.getElementById("title");
var category=document.getElementById("category");
 var price=document.getElementById("price");
 var des=document.getElementById("des");
 var camel=/^[a-zA-Z]*$/
function validatetitle(){
     var title1=title.value;
     var title2=title1.trim();
    if(title.value === ""){
    document.getElementById("error_title").textContent="please Enter the title";
    document.getElementById("error_title").style = "display : block ";
    addform.style.height=620;
    }
    else if(!title2.match(camel)){
        document.getElementById("error_title").textContent="please Enter Only aphabets";
         document.getElementById("error_title").style = "display : block ";
         addform.style.height=620;
    }
    else if(title.value.length < 10){
         document.getElementById("error_title").textContent="please Enter the title 10 to 30";
         document.getElementById("error_title").style = "display : block ";
         addform.style.height=620;
    }
    else{
        document.getElementById("error_title").style = " display : none ";
        addform.style.height=600;
    }
}
 document.getElementById("title").addEventListener("input",validatetitle);
function validatechoose(){
        if(category.value === ""){
            document.getElementById("errorchoose").textContent="Please Choose any option";
            document.getElementById("errorchoose").style="display:block";
            addform.style.height=640;
        }
        else{
            document.getElementById("errorchoose").style="display : none";
            addform.style.height=600;
        }
}
    document.getElementById("category").addEventListener("input",validatechoose);
function validateprice(){
        if(price.value <10 || price.value > 1000){
            document.getElementById("errorprice").textContent="Please enter an number 10 to 1000";
            document.getElementById("errorprice").style="display:block";
            addform.style.height=640;
        }
        else{
            document.getElementById("errorprice").style="display:none";
            addform.style.height=600;
        }
}
    document.getElementById("price").addEventListener("input",validateprice)

// // subimit form to add table
 var closebtn=document.getElementById("closebtn");
   var formdiv=document.getElementById("formdiv");
 var addingbtn=document.getElementById("addingbtn");
 formdiv.addEventListener('input',function(){
 if(title.value.length > 10 && category.value !="" && price.value > 10 ){
    addingbtn.removeAttribute('disabled') ;
    addingbtn.style="background-color : rgb(84, 137, 235)";
  }
  else{
    addingbtn.setAttribute('disabled','disabled');
  }
});
addingbtn.addEventListener("click",function(event){
       event.preventDefault();
       validatetitle()
       validatechoose()
       validateprice()
       count()
       addedtable()  
    addcontainar.style.display="none";
    addform.style.display="none";
    title.value=''
    category.value=''
    des.value=''
    price.value=''
});
// this is for close btn in form
closebtn.addEventListener("click",function(){
    addcontainar.style.display="none";
    addform.style.display="none";
})
// //localstorage and create table
function addedtable(){
    var titleval = title.value;
       var desval=des.value;
       var priceval=price.value;
       var catval=category.value;
    //    var img = document.createElement("img");
    // //    currentimg.src= "C:\Users\amind\Projects\MyDev\notloading.png";
    //    img.src = "C:\Users\amind\Projects\MyDev\product-pl.png";
    //    currentimg.style = "width:140px; height:130px"
       codeval=document.getElementById("code").value;
       const usefull={
        no : j,
        code: codeval,
        title: titleval,
        description:desval,
        category : catval,
        price : priceval,
        // image : img
       };
       localStorage.setItem(j,JSON.stringify(usefull));
       var storedItem = localStorage.getItem(j);
       var parsedItem = JSON.parse(storedItem); 
       var div=document.createElement("div");
   div.setAttribute("class","fun1")
   var newrow=document.createElement("tr")
   newrow.innerHTML=`
   <td id='drilltd'><div id='drill'><button id='drillbtn' class='drillbtn1' onclick='drillfun()'> > </button></div></td>
   <td>${parsedItem.no}</td>
   <td>${parsedItem.code}</td>
   <td>${parsedItem.title}</td>
   <td>${ parsedItem.category}</td>
   <td>${parsedItem.price}</td>
   <td><button id='editbtn'onclick='editfun(${j})'>Edit</button><button id='delbtn'onclick='deleterow(event,${j})'>Delete</button></td>`;
   funtable.append(newrow);
   var newrow2=document.createElement("tr")
   newrow2.setAttribute("id","hidenrow")
   newrow2.innerHTML=`
   <td id='newdes' colspan=7>
            <div id='newdesdiv' class='newdesdiv1'>
             <div id='part1'> ${parsedItem.description}</div>
             <div id='part2'><img scr='C:\Users\amind\Projects\MyDev\product-pl.png' width='130px' height='145px' id='imgborder2'></div>
            </div>
    </td>`
   funtable.append(newrow2);
}
function deleterow(event,key){
    var removerow=event.target.closest("tr");
    var removerow2=removerow.nextElementSibling;
      removerow.remove()  
    removerow2.remove()
    localStorage.removeItem(key);
}
//edit form
function editfun(key){
    currenteditItem = key
    var storedItem = localStorage.getItem(key);
    var parsedItem = JSON.parse(storedItem); 

    document.getElementById("title1").value = parsedItem.title;
    document.getElementById("category1").value = parsedItem.category;
    document.getElementById("price1").value = parsedItem.price;
    document.getElementById("des1").value = parsedItem.description;
    document.getElementById("code1").value = parsedItem.code;
    var file = document.getElementById("imgInput") ;
    var imgUrl =document.getElementById("imgboder")
    file.onchange = function(){
            imgUrl.src=URL.createObjectURL(file.files[0])   
    }
    var editcontainar=document.querySelector(".editcontai");
    var editform=document.querySelector(".editform")
    editcontainar.style.display="block";
    editform.style.display="block";
  }
function updatecont(){
    var editedTitle =  document.getElementById("title1").value;
    var editedCategory =  document.getElementById("category1").value;
    var editedPrice = document.getElementById("price1").value;
    var  editedDes = document.getElementById("des1").value;
    var editedcode =document.getElementById("code1").value;
    var editimg = document.getElementById("imgInput").value;
    const editedItem ={
        no: currenteditItem, 
        code : editedcode,
        title : editedTitle,
        description : editedDes,
        category : editedCategory,
        price : editedPrice,
        image : imgInput.src == undefined ? "C:/Users/amind/Projects/MyDev/product-pl.png" : imgInput.src 
   }
    localStorage.setItem(currenteditItem,JSON.stringify(editedItem));
    const rows = document.querySelectorAll("tr");
    for (let row of rows) {
        const rowData = row.querySelector('td:nth-child(2)');
        if (rowData && rowData.textContent == currenteditItem) {
            row.innerHTML = `
                <td id='drilltd'>
                    <div id='drill'>
                        <button class='drillbtn1' onclick='drillfun()'> > </button>
                    </div>
                </td>
                <td>${editedItem.no}</td>
                <td>${editedItem.code}</td>
                <td>${editedItem.title}</td>
                <td>${editedItem.category}</td>
                <td>${editedItem.price}</td>
                <td>
                    <button onclick='editfun(${currenteditItem})'>Edit</button>
                    <button onclick='deleterow(event, ${currenteditItem})'>Delete</button>
                </td> `;
            var row2=row.nextElementSibling;
            var imgborder2=document.getElementById("imgborer2");
            imgborder2.onchange = function(){
                imgborder2.src=URL.createObjectURL(editedItem.image.files[0]) 
            }
            row2.innerHTML=`
                <td id='newdes' colspan=7>
                         <div id='newdesdiv' class='newdesdiv1'>
                          <div id='part1'> ${editedItem.description}</div>
                          <div id='part2'>${editedItem.image}</div>
                         </div>
                 </td>`
        }
    }  
   var editcontainar=document.querySelector(".editcontai");
    var editform=document.querySelector(".editform")
    editcontainar.style.display="none";
    editform.style.display="none";
}
// if(file.files[0].size < 1000000){
//     var fileReader = new FileReader();

//   fileReader.onload = function(e){}
    //     fileReader.readAsDataURL(file.files[0])
    // }
    // else{
    //     alert("This file is too large");
    // }