var isopen = false;

var x;
var y;
function success(position) {
    x = position.coords.latitude;
    y = position.coords.longitude;
    var marker = L.marker([x, y]).addTo(map);
    console.log(x,y);
}
function error(){
    console.log("error");
}
navigator.geolocation.getCurrentPosition(success, error);

function popup(){
  let span= document.getElementById('span');
  let pop= '<div id="popup-Container"><form><label>Nome da Obra</label></br>'+
  '<input type="text" class="input" id="obra" name="obra"></br><label>Descrição</label>'+
  '</br><input class="input" type="text" id="descricao">'+
  '</br><div id="buttons"><button OnClick="submite()">adicionar obra</button><button OnClick="popup()">sair</button></div></form></div>';
  if(isopen == false){
    span.innerHTML += pop;
    isopen = true;
  }else{
    span.innerHTML = '';
    isopen = false;
  }
}

async function submite() {
  const name = document.getElementById("obra").value;
  const authorname = document.getElementById("descricao").value;

   const data = {
       name: name,
       authorname: authorname,
       logi: x,
       lati: y
   };

   console.log(JSON.stringify(data));
   try{
       fetch("/api/obra",{
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
         },
       body: JSON.stringify(data)
       }).then(res=>{console.log(res.status)})
   }catch(err){
       console.log(err);
   
 }
}