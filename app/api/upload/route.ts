import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase Storage
// Adicione no arquivo .env:
// NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
// SUPABASE_SERVICE_KEY=sua-chave-de-servico

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

export async function POST(req: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Configuração do Supabase incompleta. Adicione as variáveis de ambiente." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    // Validação de tipo
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de arquivo não permitido. Use JPEG, PNG, GIF ou WebP." },
        { status: 400 }
      );
    }

    // Validação de tamanho (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Máximo 5MB." },
        { status: 400 }
      );
    }

    // Gera nome único para o arquivo
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Converte File para ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload para o Supabase Storage
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Erro no upload:", error);
      return NextResponse.json(
        { error: "Erro ao fazer upload da imagem" },
        { status: 500 }
      );
    }

    // Obtém URL pública
    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return NextResponse.json({
      url: urlData.publicUrl,
      message: "Upload realizado com sucesso",
    });
  } catch (error) {
    console.error("Erro na rota de upload:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}