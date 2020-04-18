let a = {};
$(document).ready(function(){
  if(JSON.parse(localStorage.getItem("item"))){
    a=JSON.parse(localStorage.getItem("item"));
  }
  
  const b=JSON.parse(localStorage.getItem("item"))
  let html = "";
    let total=0;
  for(c in b){
    
    
      html += `<tr>
          <td>${c}</td>
          <td><input type="number" disabled value="${b[c].quantity}"/></td>
          <td>${b[c].priceMoney}</td>
          <td>${b[c].currency}</td>
          <td><button onclick="deleteProduct('${c}',${b[c].pricePerUnit})">Delete</button></td>
          </tr>`;
          total+=b[c].price
    
    
  }
  if(html.trim()!=''&&total!==0){
    $("#added").html(html);
    $("#total").html(convertPrice(total));
  }
  
})
function convertPrice(price) {
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(price.toFixed(0)).replace(",00", "");
}


function add(name, price) {
  if (!a[name]) {
    a[name] = {};
    a[name].pricePerUnit = price;
    a[name].priceMoney = convertPrice(price);
    a[name].price = price;
    a[name].currency = convertPrice(price);
    a[name].quantity = 1;
  } else {
    a[name].pricePerUnit = price;
    a[name].priceMoney = convertPrice(price);
    a[name].price += price;
    a[name].currency = convertPrice(a[name].price);
    a[name].quantity += 1;
  }
  $("#added").html("");
  let html = "";
  let total=0;
  for (b in a) {
    html += `<tr>
        <td>${b}</td>
        <td><input type="number" disabled value="${a[b].quantity}"/></td>
        <td>${a[b].priceMoney}</td>
        <td>${a[b].currency}</td>
        <td><button onclick="deleteProduct('${b}',${a[b].pricePerUnit})">Delete</button></td>
        </tr>`;
        total+=a[b].price
  }
  $("#added").html(html);
  $("#total").html(convertPrice(total));
  localStorage.setItem('item', JSON.stringify(a));
}
function deleteProduct(name, pricePerUnit) {
  if (a[name].quantity > 1) {
    a[name].price -= pricePerUnit;
    a[name].currency = convertPrice(a[name].price);
    a[name].quantity -= 1;
  } else {
    delete a[name];
  }

  $("#added").html("");
  let html = "";
  let total=0;
  for (b in a) {
    html += `<tr>
    <td>${b}</td>
    <td><input type="number" disabled value="${a[b].quantity}"/></td>
    <td>${a[b].priceMoney}</td>
    <td>${a[b].currency}</td>
    <td><button onclick="deleteProduct('${b}',${a[b].pricePerUnit})">Delete</button></td>
    </tr>`;
total+=a[b].price
  }
  $("#added").html(html);
  $("#total").html(convertPrice(total));
  localStorage.setItem('item', JSON.stringify(a));  
  if(total===0){
    $("#total").html("")
    localStorage.removeItem('item');  
  }
  
}
function reset() {
  for(b in a){

    delete a[b]
  }
  $("#total").html("")
  $("#added").html("");
  localStorage.removeItem("item")
}
