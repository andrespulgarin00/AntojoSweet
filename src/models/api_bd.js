async function guardar(){


let nombre =
document.getElementById("nombre").value;


let correo =
document.getElementById("correo").value;



const {data,error}= await supabase
.from("usuarios")
.insert([

{
nombre:nombre,
correo:correo
}

]);



if(error){

alert("Error");

}else{

alert("Guardado");

}


}