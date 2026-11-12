const bikeData = {
  "Honda": ["CD 70","Dio","Activa","CB Hornet 160R","XR 150L","CBR 150R"],
  "Yamaha": ["FZ-S","FZ 150","Ray ZR","Saluto","R15","MT-15"],
  "Bajaj": ["Pulsar 135","Pulsar 150","Pulsar NS 160","Discover 125","CT 100","Platina"],
  "TVS": ["Apache RTR 160","Apache RTR 200","NTORQ 125","Wego","Scooty Pep+","HLX 125"],
  "Suzuki": ["GN 125","Gixxer 150","Access 125","Lets","Burgman Street"],
  "Hero": ["Splendor Plus","HF Deluxe","Hunk 150","Pleasure+","Xtreme 160R"],
  "KTM": ["Duke 125","Duke 200","Duke 250","RC 200"]
};
const products = [
 {id:1,name:"Front Brake Pad Set",category:"Brake Parts",symbol:"◉",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki","Hero"],models:["CD 70","Dio","FZ-S","Pulsar 150","Apache RTR 160","GN 125"],desc:"Brake pad options for selected models.",tag:"POPULAR"},
 {id:2,name:"Air Filter Element",category:"Filters",symbol:"▤",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki","Hero","KTM"],models:["CD 70","FZ-S","Pulsar 150","Apache RTR 160","GN 125","Duke 200"],desc:"Replacement air filter options.",tag:"ESSENTIAL"},
 {id:3,name:"Engine Oil Filter",category:"Engine Parts",symbol:"▥",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki","KTM"],models:["CB Hornet 160R","FZ-S","Pulsar NS 160","Apache RTR 200","Gixxer 150","Duke 200"],desc:"Oil filter options for selected bikes.",tag:""},
 {id:4,name:"LED Headlight Assembly",category:"Electrical",symbol:"☼",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki","Hero"],models:["Dio","Ray ZR","Pulsar 150","NTORQ 125","Access 125","Pleasure+"],desc:"Headlight assembly options.",tag:""},
 {id:5,name:"Clutch Plate Set",category:"Engine Parts",symbol:"⚙",brands:["Honda","Yamaha","Bajaj","TVS","KTM"],models:["CD 70","FZ 150","Pulsar 150","Apache RTR 160","Duke 125"],desc:"Clutch component options.",tag:""},
 {id:6,name:"Rear Brake Shoe",category:"Brake Parts",symbol:"◉",brands:["Honda","Bajaj","TVS","Hero"],models:["CD 70","Discover 125","HLX 125","Splendor Plus"],desc:"Rear brake shoe options.",tag:""},
 {id:7,name:"Side Mirror Pair",category:"Body Parts",symbol:"◇",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki","Hero","KTM"],models:["Dio","FZ-S","Pulsar 150","Apache RTR 160","GN 125","Splendor Plus","Duke 200"],desc:"Mirror styles for selected models.",tag:""},
 {id:8,name:"Drive Chain & Sprocket Kit",category:"Engine Parts",symbol:"⛓",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki","KTM"],models:["CB Hornet 160R","FZ-S","Pulsar NS 160","Apache RTR 200","Gixxer 150","Duke 200"],desc:"Chain kit options by bike model.",tag:""},
 {id:9,name:"Indicator Light Set",category:"Electrical",symbol:"ϟ",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki","Hero"],models:["CD 70","FZ-S","Pulsar 150","NTORQ 125","GN 125","Splendor Plus"],desc:"Indicator options for selected models.",tag:""},
 {id:10,name:"Front Fender",category:"Body Parts",symbol:"⬡",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki"],models:["Dio","FZ-S","Pulsar 150","Apache RTR 160","Gixxer 150"],desc:"Body panel options. Confirm colour and year.",tag:""},
 {id:11,name:"Spark Plug",category:"Electrical",symbol:"ϟ",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki","Hero","KTM"],models:["CD 70","FZ-S","Pulsar 150","Apache RTR 160","GN 125","Splendor Plus","Duke 200"],desc:"Spark plug options by engine model.",tag:""},
 {id:12,name:"Rider Handle Grip Pair",category:"Accessories",symbol:"✦",brands:["Honda","Yamaha","Bajaj","TVS","Suzuki","Hero","KTM"],models:["CD 70","FZ-S","Pulsar 150","Apache RTR 160","GN 125","Duke 200"],desc:"Comfort grip options for your ride.",tag:""}
];
const brandSelect=document.getElementById("brandSelect");
const modelSelect=document.getElementById("modelSelect");
const categorySelect=document.getElementById("categorySelect");
const productGrid=document.getElementById("productGrid");
const resultTitle=document.getElementById("resultTitle");
const resultCount=document.getElementById("resultCount");
const categories=[...new Set(products.map(p=>p.category))];
Object.keys(bikeData).forEach(b=>brandSelect.add(new Option(b,b)));
categories.forEach(c=>categorySelect.add(new Option(c,c)));
document.getElementById("year").textContent=new Date().getFullYear();

function populateModels(){
  const brand=brandSelect.value;
  modelSelect.innerHTML="";
  modelSelect.add(new Option(brand?"Select model":"Select brand first",""));
  modelSelect.disabled=!brand;
  if(brand) bikeData[brand].forEach(m=>modelSelect.add(new Option(m,m)));
}
brandSelect.addEventListener("change",populateModels);

function renderProducts(){
  const brand=brandSelect.value, model=modelSelect.value, category=categorySelect.value;
  let list=products.filter(p=>{
    const bikeMatch=!brand || p.brands.includes(brand);
    const modelMatch=!model || p.models.includes(model);
    const categoryMatch=category==="all" || p.category===category;
    return bikeMatch && modelMatch && categoryMatch;
  });
  resultTitle.textContent=model ? `${brand.toUpperCase()} ${model.toUpperCase()} PARTS` : brand ? `${brand.toUpperCase()} SPARE PARTS` : category!=="all" ? category.toUpperCase() : "POPULAR SPARE PARTS";
  resultCount.textContent=`${list.length} ITEMS`;
  if(!list.length){
    productGrid.innerHTML='<div class="empty-state">No sample products match this exact selection yet.<br>Send us your bike details on WhatsApp and we’ll help you find the right part.</div>';
    return;
  }
  productGrid.innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-art"><span class="part-symbol">${p.symbol}</span>${p.tag?`<span class="part-tag">${p.tag}</span>`:""}</div>
      <div class="product-info"><small>${p.category.toUpperCase()}</small><h4>${p.name}</h4><p>${p.desc}</p>
      <div class="product-foot"><span class="price">PRICE ON REQUEST</span><button class="order-btn" data-order="${p.id}">INQUIRE ↗</button></div></div>
    </article>`).join("");
  productGrid.querySelectorAll("[data-order]").forEach(btn=>btn.addEventListener("click",()=>orderProduct(Number(btn.dataset.order))));
}
function orderProduct(id){
  const p=products.find(x=>x.id===id);
  const brand=brandSelect.value||"Not selected";
  const model=modelSelect.value||"Not selected";
  const message=`Hello Yugaashvi Motors! I would like to inquire/order this spare part:\n\nPart: ${p.name}\nCategory: ${p.category}\nBike brand: ${brand}\nBike model: ${model}\nYear: Please confirm with me\n\nPlease let me know the price and availability. Thank you!`;
  window.open("https://wa.me/94702613475?text="+encodeURIComponent(message),"_blank","noopener");
}
document.getElementById("findButton").addEventListener("click",renderProducts);
categorySelect.addEventListener("change",renderProducts);
document.querySelectorAll(".category-card").forEach(card=>card.addEventListener("click",()=>{
  categorySelect.value=card.dataset.category;
  document.getElementById("find-bike").scrollIntoView({behavior:"smooth"});
  renderProducts();
}));
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
renderProducts();
