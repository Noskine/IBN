import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const article = await prisma.article.findUnique({ where: { id } });
  if (!article || article.authorId !== session.user.id) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
  }

  const formData = await req.formData();
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim() || "";
  const content = formData.get("content")?.toString().trim() || "";
  const tagsRaw = formData.get("tags")?.toString().trim() || "";
  const tags = tagsRaw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const file = formData.get("file") as File | null;
  const image = formData.get("image") as File | null;

  const updateData: any = {
    title,
    description,
    content,
    tags,
  };

  if (file) {
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Tipo de arquivo não permitido. Envie somente PDF." }, { status: 400 });
    }
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Arquivo muito grande. Máximo 20MB." }, { status: 400 });
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Configuração do Supabase incompleta. Adicione as variáveis de ambiente." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const fileExt = file.name.split(".").pop() ?? "pdf";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
    const filePath = `articles/${fileName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("articles")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Erro no upload do PDF:", uploadError);
      return NextResponse.json({ error: "Erro ao enviar o PDF." }, { status: 500 });
    }

    const urlResponse = supabase.storage.from("articles").getPublicUrl(filePath);
    const pdfUrl = urlResponse.data?.publicUrl;
    if (!pdfUrl) {
      console.error("Erro ao gerar URL pública:", urlResponse);
      return NextResponse.json({ error: "Erro ao gerar a URL do PDF." }, { status: 500 });
    }

    updateData.pdfUrl = pdfUrl;
    updateData.storagePath = filePath;
  }

  if (image) {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Configuração do Supabase incompleta. Adicione as variáveis de ambiente." },
        { status: 500 }
      );
    }

    const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedImageTypes.includes(image.type)) {
      return NextResponse.json({ error: "Tipo de imagem não permitido." }, { status: 400 });
    }
    const maxImageSize = 5 * 1024 * 1024;
    if (image.size > maxImageSize) {
      return NextResponse.json({ error: "Imagem muito grande. Máximo 5MB." }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const imgExt = image.name.split(".").pop() ?? "jpg";
    const imgName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${imgExt}`;
    const imagePath = `articles/images/${imgName}`;
    const imgBuffer = Buffer.from(await image.arrayBuffer());

    const { error: imgError } = await supabase.storage
      .from("articles")
      .upload(imagePath, imgBuffer, { contentType: image.type, upsert: false });

    if (imgError) {
      console.error("Erro no upload da imagem:", imgError);
      return NextResponse.json({ error: "Erro ao enviar a imagem." }, { status: 500 });
    }

    const imgUrlResp = supabase.storage.from("articles").getPublicUrl(imagePath);
    updateData.imageUrl = imgUrlResp.data?.publicUrl ?? null;
    updateData.imagePath = imagePath;
  }

  const updatedArticle = await prisma.article.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(updatedArticle);
}
