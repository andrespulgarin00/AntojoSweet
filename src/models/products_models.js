import { supabase } from "../config/supabase.js";

export async function getProductos() {
    const { data, error } = await supabase
        .from("postres")
        .select("*");

    if (error) {
        console.log(error);
        console.log("ERROR SUPABASE:", error);
        return [];
    }

    return data;
}