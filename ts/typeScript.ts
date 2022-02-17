var array:any = creacionCartas();
console.log(array);
var seleccionados:number = 0;
var iguales:number = 0;
var correctas:number = 0;
var primerSeleccionado:number=0;
var segundoSeleccionado:number=0;
var claseUno:String = "";
var claseDos:String = "";
var imagenUno:any = "";
var imagenDos:any = "";

var tiempo:number = 31;




function jugar() {
    var div:any = document.getElementById("cartas");
    var btn:any = document.getElementById("btn");
    btn.style.display = "none";
    div.style.display = "block";
    mezclarArray(array); 
    localStorage.setItem("cartas",JSON.stringify(array)); 
    generarTablero();
    var contador:any = document.getElementById("time");
    let timer = setInterval(() => {
        tiempo--;
         
        if (tiempo == 0) {
            clearInterval(timer);
            alert("Game over!");
            location.reload();
        }
        else {
            contador.innerHTML = tiempo.toString();
            if (correctas == 3 && tiempo > 0) {
                clearInterval(timer);
                alert("Has ganado!");
                location.reload();
            }
        }  
    },1000);
    
    
}

function generarTablero () {
    if (localStorage.getItem("cartas")) {
        var arrayLocal:any = localStorage.getItem("cartas");
        arrayLocal = JSON.parse(arrayLocal);
        var divCartas:any = document.getElementById("cartas");
        var content:any = "";

        content += "<div><div>Tiempo: </div><div id='time'></div></div>";
        content += "<div class='flex-row'>";
        content += "<div class='img-default' id='img1' onclick='elegir("+array[0].id+",1)'></div>";
        content += "<div class='img-default' id='img2' onclick='elegir("+array[1].id+",2)'></div>";
        content += "<div class='img-default' id='img3' onclick='elegir("+array[2].id+",3)'></div>";
        content += "</div>";
        content += "<div class='flex-row'>";
        content += "<div class='img-default' id='img4' onclick='elegir("+array[3].id+",4)'></div>";
        content += "<div class='img-default' id='img5' onclick='elegir("+array[4].id+",5)'></div>";
        content += "<div class='img-default' id='img6' onclick='elegir("+array[5].id+",6)'></div>";
        content += "</div>";

        divCartas.innerHTML = content;
    }
}

function creacionCartas() {
    var array:any[]=[];
    for (let i = 1; i <= 2; i++) {
        array.push(
            {
                id : 1,
                clase : "img1",

            }
        ); 
    }

    for (let i = 3; i <= 4; i++) {
        array.push(
            {
                id : 2,
                clase : "img2",
                
            }
        ); 
    }

    for (let i = 5; i <= 6; i++) {
        array.push(
            {
                id : 3,
                clase : "img3",
                
            }
        ); 
    }

    return array;
}

function mezclarArray(inputArray:any){
    for (let i = inputArray.length - 1; i > 0; i--) {
		let indiceAleatorio = Math.floor(Math.random() * (i + 1));
		let temporal = inputArray[i];
		inputArray[i] = inputArray[indiceAleatorio];
		inputArray[indiceAleatorio] = temporal;
	}
}

function elegir (numero:any, id:any) {
    seleccionados++;
    var img:any = document.getElementById("img"+id);
    if (numero == 1){
        img.classList.remove("img-default");
        img.classList.add("img1");
        var clase:String = "img1";
        parejas(numero,img,clase);        
    } 
    else if (numero == 2){
        img.classList.remove("img-default");
        img.classList.add("img2");
        var clase:String = "img2";
        parejas(numero,img,clase);
    }
    else {
        img.classList.remove("img-default");
        img.classList.add("img3"); 
        var clase:String = "img3";
        parejas(numero,img,clase);
    }
}

function parejas(n:any, idDiv:any,clase:String) {
    if (primerSeleccionado == 0){
        primerSeleccionado = n;
        imagenUno = idDiv;
        claseUno = clase;
    }
    else {
        segundoSeleccionado = n;
        imagenDos = idDiv;
        claseDos = clase;
    }

    if (seleccionados == 2) {
        if (primerSeleccionado == segundoSeleccionado) {
            correctas++;
            seleccionados=0;
            primerSeleccionado=0;
        }
        else {
            setTimeout (() => {
            imagenUno.classList.remove(claseUno);
            imagenDos.classList.remove(claseDos);
            
            }, 1000 );
            imagenUno.classList.add("img-default");
            imagenDos.classList.add("img-default");
            primerSeleccionado = 0;
            seleccionados = 0;

            
        }
    }
}
