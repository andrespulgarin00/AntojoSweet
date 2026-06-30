import { supabase } from "../config/supabase.js";

const BUCKET_IMAGENES = "postres";

function crearNombreArchivo(file) {
    const nombreBase = file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "postre";
    const extension = file.name.split(".").pop() || "jpg";
    const identificador = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return `${nombreBase}-${identificador}.${extension}`;
}

export async function verProductos() {
    const { data, error } = await supabase
        .from("postres")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.log("ERROR SUPABASE:", error);
        return [];
    }

    return data ?? [];
}

export async function crearProducto(datos) {
    const { data, error } = await supabase
        .from("postres")
        .insert([datos])
        .select("*");

    if (error) {
        console.log("ERROR SUPABASE:", error);
        return null;
    }

    return data?.[0] ?? null;
}

export async function subirImagenProducto(archivo) {
    if (!archivo) {
        return { url: null, path: null };
    }

    const nombreArchivo = crearNombreArchivo(archivo);
    const path = `postres/${nombreArchivo}`;

    const { error: errorSubida } = await supabase.storage
        .from(BUCKET_IMAGENES)
        .upload(path, archivo, {
            cacheControl: "3600",
            upsert: false,
            contentType: archivo.type
        });

    if (errorSubida) {
        console.log("ERROR SUPABASE STORAGE:", errorSubida);
        return { url: null, path: null, error: errorSubida };
    }

    const { data } = supabase.storage
        .from(BUCKET_IMAGENES)
        .getPublicUrl(path);

    return {
        url: data?.publicUrl ?? null,
        path
    };
}

export async function crearProductoConImagen(datos, archivo) {
    const imagen = await subirImagenProducto(archivo);

    if (imagen.error) {
        return null;
    }

    const payload = {
        ...datos,
        imagen_url: imagen.url
    };

    return crearProducto(payload);
}
