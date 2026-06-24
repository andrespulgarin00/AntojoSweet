import { supabase } from '../config/supabase.js';


/*  funcion para regitrar */
export async function crearUsuarios(datos){
    const {data, error} = await supabase
    .from("usuarios")
    .insert([datos]);
         
    if (error) {
        console.log(error);
        return null;
    }

    return data;
    
}

/* funcion para login */

export async function verUsuarios() {
    const {data, error} = await supabase
    .from("usuarios")
    .select("*");
     if (error) {
        console.log(error);
        console.log("ERROR SUPABASE:", error);
        return [];
    }

    return data;
}