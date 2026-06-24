import { supabase } from "../config/supabase.js";

export async function enviarContacto(datos) {
    const { data, error } = await supabase
        .from("contactos")
        .insert([datos]);

    if (error) {
        console.log(error);
        return null;
    }

    return data;
}
