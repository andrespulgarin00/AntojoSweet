const SUPABASE_URL = "TU_URL_AQUI";


const SUPABASE_KEY = "TU_KEY_AQUI";



const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);





async function mostrarUsuarios(){


    let {data,error} = await supabase
    .from("usuarios")
    .select("*");



    if(error){

        console.log(error);

        return;

    }



    let contenido="";



    data.forEach(usuario=>{


        contenido += `

        <p>
        ${usuario.nombre}
        -
        ${usuario.correo}
        </p>

        `;


    });



    document.getElementById("lista").innerHTML = contenido;


}