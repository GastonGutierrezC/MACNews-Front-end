import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Configuración basada en el ejemplo oficial
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file !== "object" || !("arrayBuffer" in file)) {
      return NextResponse.json(
        { error: "Archivo no válido o no enviado correctamente." },
        { status: 400 }
      );
    }

    const mimeType = (file as any).type;
    if (!["image/jpeg", "image/png"].includes(mimeType)) {
      return NextResponse.json(
        { error: "Solo se permiten imágenes JPG o PNG." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await (file as any).arrayBuffer());
    const tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const fileName = `${Date.now()}_${(file as any).name}`;
    const tempFilePath = path.join(tempDir, fileName);
    fs.writeFileSync(tempFilePath, buffer);

    const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
      folder: "certificados",
      public_id: fileName.split(".")[0],
      resource_type: "image",
    });

    fs.unlinkSync(tempFilePath);

    // Optimizar URL (como en el ejemplo oficial)
    const optimizedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    return NextResponse.json({
      message: "Archivo subido correctamente",
      secure_url: uploadResult.secure_url,
      optimized_url: optimizedUrl,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error al subir el archivo",
        details: error.message || error.toString(),
      },
      { status: 500 }
    );
  }
}
