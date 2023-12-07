// Funcion
fetch("http://localhost:3000/burgers").then(async(res)=>{
    const data = await res.json()
    console.log(data[0].name);
    document.getElementById("Lugar1").innerHTML = data[0].name;
    document.getElementById("Lugar2").innerHTML = data[1].name;
    document.getElementById("Lugar3").innerHTML = data[2].name;
    document.getElementById("Lugar4").innerHTML = data[3].name;
    document.getElementById("Lugar5").innerHTML = data[4].name;
    document.getElementById("Lugar6").innerHTML = data[5].name;
    
    for(let i=0; i<data.length; i++){
        document.getElementById("lugares").innerHTML += '<div class="panelComponent pCom">'
         + data[i].name + '</div>';
    }
})
