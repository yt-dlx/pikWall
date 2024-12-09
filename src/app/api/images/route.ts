// src/app/api/images/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(imagesData);
}

export async function POST(req: NextRequest) {
  const newImage = await req.json();
  imagesData.push(newImage);
  return NextResponse.json({ message: "Image added successfully", data: newImage }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageName = searchParams.get("imageName");
  if (!imageName) return NextResponse.json({ error: "imageName is required" }, { status: 400 });
  imagesData = imagesData.filter((image) => image.imageName !== imageName);
  return NextResponse.json({ message: "Image deleted successfully" });
}

export async function PUT(req: NextRequest) {
  const updatedImage = await req.json();
  const imageName = updatedImage.imageName;
  let imageIndex = imagesData.findIndex((image) => image.imageName === imageName);
  if (imageIndex === -1) return NextResponse.json({ error: "Image not found" }, { status: 404 });
  imagesData[imageIndex] = updatedImage;
  return NextResponse.json({ message: "Image updated successfully", data: updatedImage });
}

let imagesData = [
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Broken Symmetry",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_10.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_11.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_12.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_13.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_14.jpg",
      },
    ],
    timestamp: "2024-09-01T06:12:55.286Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Broken Symmetry",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_15.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_16.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_17.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_18.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_19.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:01.933Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Broken Symmetry",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_20.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_21.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_22.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_23.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_24.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:07.094Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Broken Symmetry",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_0.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_2.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_3.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_4.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:11.846Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Broken Symmetry",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_25.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_26.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_27.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_28.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_29.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:16.359Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Broken Symmetry",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_30.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_31.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_32.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_33.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_34.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:21.628Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Broken Symmetry",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_35.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_36.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_37.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_38.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_39.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:26.706Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Broken Symmetry",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_5.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_6.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_7.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_8.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_9.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:32.336Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Colorful Chaos",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_40.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_41.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_42.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_43.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_44.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:37.863Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Colorful Chaos",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_45.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_46.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_47.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_48.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_49.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:42.687Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Colorful Chaos",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_50.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_51.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_52.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_53.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_54.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:50.557Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Colorful Chaos",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_55.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_56.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_57.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_58.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_59.jpg",
      },
    ],
    timestamp: "2024-09-01T06:13:55.018Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Colorful Chaos",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_60.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_61.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_62.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_63.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_64.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:00.035Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Colorful Chaos",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_65.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_66.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_67.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_68.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_69.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:04.843Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Colorful Chaos",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_70.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_71.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_72.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_73.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_74.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:09.656Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Colorful Chaos",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_75.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_76.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_77.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_78.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_79.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:13.958Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Cubist Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_80.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_81.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_82.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_83.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_84.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:18.737Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Cubist Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_85.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_86.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_87.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_88.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_89.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:23.588Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Cubist Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_90.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_91.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_92.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_93.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_94.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:28.330Z",
  },
  {
    artStyle: "🎨🖌️ Abstract And Geometric",
    scenario: "🧩🔍 Cubist Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_95.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_96.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_97.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_98.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_99.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:33.173Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Abstract Odyssey",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_120.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_121.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_122.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_123.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_124.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:54.414Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Abstract Odyssey",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_125.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_126.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_127.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_128.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_129.jpg",
      },
    ],
    timestamp: "2024-09-01T06:14:58.967Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Abstract Odyssey",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_130.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_131.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_132.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_133.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_134.jpg",
      },
    ],
    timestamp: "2024-09-01T06:15:03.801Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Abstract Odyssey",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_135.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_136.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_137.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_138.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_139.jpg",
      },
    ],
    timestamp: "2024-09-01T06:15:08.385Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Abstract Odyssey",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_140.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_141.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_142.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_143.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_144.jpg",
      },
    ],
    timestamp: "2024-09-01T06:15:14.135Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Abstract Odyssey",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_145.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_146.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_147.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_148.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_149.jpg",
      },
    ],
    timestamp: "2024-09-01T06:15:18.949Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Abstract Odyssey",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_150.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_151.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_152.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_153.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_154.jpg",
      },
    ],
    timestamp: "2024-09-01T06:15:22.965Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Abstract Odyssey",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_155.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_156.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_157.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_158.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_159.jpg",
      },
    ],
    timestamp: "2024-09-01T06:15:26.739Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Art Deco Revival",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_160.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_161.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_162.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_163.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_164.jpg",
      },
    ],
    timestamp: "2024-09-01T06:15:32.467Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Art Deco Revival",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_185.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_186.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_187.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_188.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_189.jpg",
      },
    ],
    timestamp: "2024-09-01T06:15:52.382Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Art Deco Revival",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_190.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_191.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_192.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_193.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_194.jpg",
      },
    ],
    timestamp: "2024-09-01T06:15:58.313Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Art Deco Revival",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_195.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_196.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_197.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_198.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_199.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:03.376Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Brushstrokes Of Time",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_200.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_201.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_202.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_203.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_204.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:09.425Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Brushstrokes Of Time",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_205.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_206.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_207.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_208.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_209.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:14.947Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Brushstrokes Of Time",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_210.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_211.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_212.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_213.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_214.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:20.004Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Brushstrokes Of Time",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_215.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_216.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_217.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_218.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_219.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:25.056Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Brushstrokes Of Time",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_220.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_221.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_222.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_223.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_224.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:30.586Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Brushstrokes Of Time",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_225.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_226.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_227.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_228.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_229.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:34.377Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Brushstrokes Of Time",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_230.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_231.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_232.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_233.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_234.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:39.205Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Brushstrokes Of Time",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_235.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_236.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_237.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_238.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_239.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:51.646Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Fluid Fantasy",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_240.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_241.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_242.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_243.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_244.jpg",
      },
    ],
    timestamp: "2024-09-01T06:16:56.166Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Fluid Fantasy",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_245.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_246.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_247.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_248.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_249.jpg",
      },
    ],
    timestamp: "2024-09-01T06:17:00.962Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Fluid Fantasy",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_250.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_251.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_252.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_253.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_254.jpg",
      },
    ],
    timestamp: "2024-09-01T06:17:05.010Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Fluid Fantasy",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_255.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_256.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_257.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_258.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_259.jpg",
      },
    ],
    timestamp: "2024-09-01T06:17:10.776Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Fluid Fantasy",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_260.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_261.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_262.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_263.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_264.jpg",
      },
    ],
    timestamp: "2024-09-01T06:17:15.030Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Fluid Fantasy",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_265.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_266.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_267.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_268.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_269.jpg",
      },
    ],
    timestamp: "2024-09-01T06:17:19.158Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Fluid Fantasy",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_270.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_271.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_272.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_273.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_274.jpg",
      },
    ],
    timestamp: "2024-09-01T06:17:25.633Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Fluid Fantasy",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_275.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_276.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_277.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_278.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_279.jpg",
      },
    ],
    timestamp: "2024-09-01T06:17:33.081Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Impressionist's Garden",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_280.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_281.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_282.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_283.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_284.jpg",
      },
    ],
    timestamp: "2024-09-01T06:17:44.672Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Impressionist's Garden",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_285.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_286.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_287.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_288.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_289.jpg",
      },
    ],
    timestamp: "2024-09-01T06:17:57.830Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Impressionist's Garden",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_290.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_291.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_292.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_293.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_294.jpg",
      },
    ],
    timestamp: "2024-09-01T06:18:07.627Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Impressionist's Garden",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_295.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_296.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_297.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_298.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_299.jpg",
      },
    ],
    timestamp: "2024-09-01T06:18:15.208Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Impressionist's Garden",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_300.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_301.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_302.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_303.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_304.jpg",
      },
    ],
    timestamp: "2024-09-01T06:18:25.311Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Impressionist's Garden",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_305.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_306.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_307.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_308.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_309.jpg",
      },
    ],
    timestamp: "2024-09-01T06:18:34.323Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Impressionist's Garden",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_310.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_311.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_312.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_313.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_314.jpg",
      },
    ],
    timestamp: "2024-09-01T06:18:42.620Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Impressionist's Garden",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_315.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_316.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_317.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_318.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_319.jpg",
      },
    ],
    timestamp: "2024-09-01T06:18:52.472Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Inkblot Universe",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_320.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_321.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_322.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_323.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_324.jpg",
      },
    ],
    timestamp: "2024-09-01T06:18:59.766Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Inkblot Universe",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_325.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_326.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_327.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_328.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_329.jpg",
      },
    ],
    timestamp: "2024-09-01T06:19:09.801Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Inkblot Universe",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_330.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_331.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_332.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_333.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_334.jpg",
      },
    ],
    timestamp: "2024-09-01T06:19:21.929Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Inkblot Universe",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_335.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_336.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_337.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_338.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_339.jpg",
      },
    ],
    timestamp: "2024-09-01T06:19:36.848Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Inkblot Universe",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_340.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_341.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_342.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_343.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_344.jpg",
      },
    ],
    timestamp: "2024-09-01T06:19:46.612Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Inkblot Universe",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_345.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_346.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_347.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_348.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_349.jpg",
      },
    ],
    timestamp: "2024-09-01T06:19:57.154Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Inkblot Universe",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_350.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_351.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_352.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_353.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_354.jpg",
      },
    ],
    timestamp: "2024-09-01T06:20:06.215Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Inkblot Universe",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_355.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_356.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_357.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_358.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_359.jpg",
      },
    ],
    timestamp: "2024-09-01T06:20:14.293Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Monochrome Muse",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_360.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_361.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_362.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_363.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_364.jpg",
      },
    ],
    timestamp: "2024-09-01T06:20:23.934Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Monochrome Muse",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_365.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_366.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_367.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_368.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_369.jpg",
      },
    ],
    timestamp: "2024-09-01T06:20:38.036Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Monochrome Muse",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_370.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_371.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_372.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_373.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_374.jpg",
      },
    ],
    timestamp: "2024-09-01T06:20:56.038Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Monochrome Muse",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_375.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_376.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_377.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_378.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_379.jpg",
      },
    ],
    timestamp: "2024-09-01T06:21:07.750Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Monochrome Muse",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_380.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_381.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_382.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_383.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_384.jpg",
      },
    ],
    timestamp: "2024-09-01T06:21:15.817Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Monochrome Muse",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_385.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_386.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_387.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_388.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_389.jpg",
      },
    ],
    timestamp: "2024-09-01T06:21:22.754Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Monochrome Muse",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_390.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_391.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_392.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_393.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_394.jpg",
      },
    ],
    timestamp: "2024-09-01T06:21:30.749Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Monochrome Muse",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_395.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_396.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_397.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_398.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_399.jpg",
      },
    ],
    timestamp: "2024-09-01T06:21:49.804Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Neon Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_400.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_401.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_402.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_403.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_404.jpg",
      },
    ],
    timestamp: "2024-09-01T06:22:04.353Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Neon Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_405.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_406.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_407.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_408.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_409.jpg",
      },
    ],
    timestamp: "2024-09-01T06:22:30.835Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Neon Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_410.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_411.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_412.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_413.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_414.jpg",
      },
    ],
    timestamp: "2024-09-01T06:22:46.441Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Neon Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_415.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_416.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_417.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_418.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_419.jpg",
      },
    ],
    timestamp: "2024-09-01T06:23:00.020Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Neon Dreams",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_420.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_421.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_422.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_423.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_424.jpg",
      },
    ],
    timestamp: "2024-09-01T06:23:11.656Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Neon Dreams",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_425.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_426.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_427.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_428.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_429.jpg",
      },
    ],
    timestamp: "2024-09-01T06:23:23.113Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Neon Dreams",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_430.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_431.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_432.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_433.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_434.jpg",
      },
    ],
    timestamp: "2024-09-01T06:23:33.925Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Neon Dreams",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_435.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_436.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_437.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_438.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_439.jpg",
      },
    ],
    timestamp: "2024-09-01T06:23:42.481Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Pixelated Paradise",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_440.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_441.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_442.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_443.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_444.jpg",
      },
    ],
    timestamp: "2024-09-01T06:23:51.063Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Pixelated Paradise",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_445.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_446.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_447.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_448.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_449.jpg",
      },
    ],
    timestamp: "2024-09-01T06:24:04.377Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Pixelated Paradise",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_450.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_451.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_452.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_453.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_454.jpg",
      },
    ],
    timestamp: "2024-09-01T06:24:16.683Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Pixelated Paradise",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_455.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_456.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_457.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_458.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_459.jpg",
      },
    ],
    timestamp: "2024-09-01T06:24:34.807Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Stained Glass Reflections",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_460.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_461.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_462.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_463.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_464.jpg",
      },
    ],
    timestamp: "2024-09-01T06:24:47.618Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Stained Glass Reflections",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_465.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_466.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_467.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_468.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_469.jpg",
      },
    ],
    timestamp: "2024-09-01T06:24:58.515Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Stained Glass Reflections",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_470.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_471.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_472.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_473.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_474.jpg",
      },
    ],
    timestamp: "2024-09-01T06:25:12.539Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Stained Glass Reflections",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_475.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_476.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_477.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_478.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_479.jpg",
      },
    ],
    timestamp: "2024-09-01T06:25:28.857Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Stained Glass Reflections",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_480.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_481.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_482.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_483.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_484.jpg",
      },
    ],
    timestamp: "2024-09-01T06:25:51.573Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Stained Glass Reflections",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_485.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_486.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_487.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_488.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_489.jpg",
      },
    ],
    timestamp: "2024-09-01T06:26:08.038Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Stained Glass Reflections",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_490.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_491.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_492.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_493.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_494.jpg",
      },
    ],
    timestamp: "2024-09-01T06:26:24.679Z",
  },
  {
    artStyle: "🎨🖌️ Artistic And Abstract",
    scenario: "🧩🔍 Stained Glass Reflections",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_495.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_496.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_497.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_498.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_499.jpg",
      },
    ],
    timestamp: "2024-09-01T06:26:42.476Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Minimalist Moon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_500.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_501.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_502.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_503.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_504.jpg",
      },
    ],
    timestamp: "2024-09-01T06:26:51.530Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Minimalist Moon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_505.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_506.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_507.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_508.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_509.jpg",
      },
    ],
    timestamp: "2024-09-01T06:26:58.558Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Minimalist Moon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_510.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_511.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_512.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_513.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_514.jpg",
      },
    ],
    timestamp: "2024-09-01T06:27:08.374Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Minimalist Moon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_515.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_516.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_517.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_518.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_519.jpg",
      },
    ],
    timestamp: "2024-09-01T06:27:15.689Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Minimalist Moon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_520.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_521.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_522.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_523.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_524.jpg",
      },
    ],
    timestamp: "2024-09-01T06:27:24.501Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Minimalist Moon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_525.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_526.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_527.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_528.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_529.jpg",
      },
    ],
    timestamp: "2024-09-01T06:27:33.863Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Minimalist Moon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_530.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_531.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_532.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_533.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_534.jpg",
      },
    ],
    timestamp: "2024-09-01T06:27:44.384Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Minimalist Moon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_535.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_536.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_537.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_538.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_539.jpg",
      },
    ],
    timestamp: "2024-09-01T06:27:50.433Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Silent Horizon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_540.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_541.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_542.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_543.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_544.jpg",
      },
    ],
    timestamp: "2024-09-01T06:27:59.481Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Silent Horizon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_545.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_546.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_547.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_548.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_549.jpg",
      },
    ],
    timestamp: "2024-09-01T06:28:08.054Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Silent Horizon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_550.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_551.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_552.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_553.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_554.jpg",
      },
    ],
    timestamp: "2024-09-01T06:28:15.859Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Silent Horizon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_555.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_556.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_557.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_558.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_559.jpg",
      },
    ],
    timestamp: "2024-09-01T06:28:24.507Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Silent Horizon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_560.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_561.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_562.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_563.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_564.jpg",
      },
    ],
    timestamp: "2024-09-01T06:28:33.071Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Silent Horizon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_565.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_566.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_567.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_568.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_569.jpg",
      },
    ],
    timestamp: "2024-09-01T06:28:42.296Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Silent Horizon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_570.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_571.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_572.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_573.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_574.jpg",
      },
    ],
    timestamp: "2024-09-01T06:28:48.843Z",
  },
  {
    artStyle: "🎨🖌️ Calming And Minimalistic",
    scenario: "🧩🔍 Silent Horizon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_575.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_576.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_577.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_578.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_579.jpg",
      },
    ],
    timestamp: "2024-09-01T06:28:55.148Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Castle In The Clouds",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_580.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_581.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_582.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_583.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_584.jpg",
      },
    ],
    timestamp: "2024-09-01T06:29:05.269Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Castle In The Clouds",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_585.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_586.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_587.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_588.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_589.jpg",
      },
    ],
    timestamp: "2024-09-01T06:29:15.808Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Castle In The Clouds",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_590.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_591.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_592.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_593.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_594.jpg",
      },
    ],
    timestamp: "2024-09-01T06:29:26.390Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Castle In The Clouds",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_595.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_596.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_597.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_598.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_599.jpg",
      },
    ],
    timestamp: "2024-09-01T06:29:37.453Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Castle In The Clouds",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_600.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_601.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_602.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_603.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_604.jpg",
      },
    ],
    timestamp: "2024-09-01T06:29:46.238Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Castle In The Clouds",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_605.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_606.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_607.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_608.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_609.jpg",
      },
    ],
    timestamp: "2024-09-01T06:29:59.155Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Castle In The Clouds",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_610.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_611.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_612.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_613.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_614.jpg",
      },
    ],
    timestamp: "2024-09-01T06:30:11.915Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Castle In The Clouds",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_615.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_616.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_617.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_618.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_619.jpg",
      },
    ],
    timestamp: "2024-09-01T06:30:22.562Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Dragon’S Keep",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_620.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_621.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_622.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_623.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_624.jpg",
      },
    ],
    timestamp: "2024-09-01T06:30:35.633Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Dragon’S Keep",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_625.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_626.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_627.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_628.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_629.jpg",
      },
    ],
    timestamp: "2024-09-01T06:30:47.502Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Dragon’S Keep",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_630.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_631.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_632.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_633.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_634.jpg",
      },
    ],
    timestamp: "2024-09-01T06:30:59.575Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Dragon’S Keep",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_635.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_636.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_637.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_638.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_639.jpg",
      },
    ],
    timestamp: "2024-09-01T06:31:12.579Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Dragon’S Keep",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_640.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_641.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_642.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_643.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_644.jpg",
      },
    ],
    timestamp: "2024-09-01T06:31:29.217Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Dragon’S Keep",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_645.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_646.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_647.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_648.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_649.jpg",
      },
    ],
    timestamp: "2024-09-01T06:31:41.571Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Dragon’S Keep",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_650.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_651.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_652.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_653.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_654.jpg",
      },
    ],
    timestamp: "2024-09-01T06:31:56.194Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Dragon’S Keep",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_655.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_656.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_657.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_658.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_659.jpg",
      },
    ],
    timestamp: "2024-09-01T06:32:08.748Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Fairy Grove",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_660.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_661.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_662.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_663.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_664.jpg",
      },
    ],
    timestamp: "2024-09-01T06:32:22.449Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Fairy Grove",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_665.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_666.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_667.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_668.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_669.jpg",
      },
    ],
    timestamp: "2024-09-01T06:32:42.594Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Fairy Grove",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_670.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_671.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_672.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_673.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_674.jpg",
      },
    ],
    timestamp: "2024-09-01T06:33:03.367Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Fairy Grove",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_675.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_676.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_677.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_678.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_679.jpg",
      },
    ],
    timestamp: "2024-09-01T06:33:34.324Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Fairy Grove",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_680.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_681.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_682.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_683.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_684.jpg",
      },
    ],
    timestamp: "2024-09-01T06:34:03.621Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Fairy Grove",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_685.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_686.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_687.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_688.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_689.jpg",
      },
    ],
    timestamp: "2024-09-01T06:34:38.170Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Fairy Grove",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_690.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_691.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_692.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_693.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_694.jpg",
      },
    ],
    timestamp: "2024-09-01T06:34:53.273Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Fairy Grove",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_695.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_696.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_697.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_698.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_699.jpg",
      },
    ],
    timestamp: "2024-09-01T06:35:09.042Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Sorcerer’S Mist",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_700.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_701.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_702.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_703.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_704.jpg",
      },
    ],
    timestamp: "2024-09-01T06:35:24.324Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Sorcerer’S Mist",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_705.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_706.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_707.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_708.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_709.jpg",
      },
    ],
    timestamp: "2024-09-01T06:35:34.794Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Sorcerer’S Mist",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_710.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_711.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_712.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_713.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_714.jpg",
      },
    ],
    timestamp: "2024-09-01T06:35:46.090Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Sorcerer’S Mist",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_715.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_716.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_717.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_718.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_719.jpg",
      },
    ],
    timestamp: "2024-09-01T06:35:55.380Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Titan’S Gate",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_720.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_721.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_722.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_723.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_724.jpg",
      },
    ],
    timestamp: "2024-09-01T06:36:04.252Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Titan’S Gate",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_725.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_726.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_727.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_728.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_729.jpg",
      },
    ],
    timestamp: "2024-09-01T06:36:15.773Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Titan’S Gate",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_730.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_731.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_732.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_733.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_734.jpg",
      },
    ],
    timestamp: "2024-09-01T06:36:25.812Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Titan’S Gate",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_735.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_736.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_737.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_738.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_739.jpg",
      },
    ],
    timestamp: "2024-09-01T06:36:39.028Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Titan’S Gate",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_740.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_741.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_742.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_743.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_744.jpg",
      },
    ],
    timestamp: "2024-09-01T06:36:48.773Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Titan’S Gate",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_745.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_746.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_747.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_748.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_749.jpg",
      },
    ],
    timestamp: "2024-09-01T06:37:00.005Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Titan’S Gate",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_750.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_751.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_752.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_753.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_754.jpg",
      },
    ],
    timestamp: "2024-09-01T06:37:09.492Z",
  },
  {
    artStyle: "🎨🖌️ Fantasy And Mythology",
    scenario: "🧩🔍 Titan’S Gate",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_755.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_756.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_757.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_758.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_759.jpg",
      },
    ],
    timestamp: "2024-09-01T06:37:19.635Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Desert Dunes",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_760.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_761.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_762.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_763.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_764.jpg",
      },
    ],
    timestamp: "2024-09-01T06:37:28.389Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Desert Dunes",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_765.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_766.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_767.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_768.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_769.jpg",
      },
    ],
    timestamp: "2024-09-01T06:37:39.886Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Desert Dunes",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_770.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_771.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_772.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_773.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_774.jpg",
      },
    ],
    timestamp: "2024-09-01T06:37:47.936Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Desert Dunes",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_775.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_776.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_777.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_778.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_779.jpg",
      },
    ],
    timestamp: "2024-09-01T06:37:55.441Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Desert Dunes",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_780.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_781.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_782.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_783.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_784.jpg",
      },
    ],
    timestamp: "2024-09-01T06:38:03.709Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Desert Dunes",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_785.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_786.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_787.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_788.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_789.jpg",
      },
    ],
    timestamp: "2024-09-01T06:38:11.291Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Desert Dunes",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_790.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_791.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_792.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_793.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_794.jpg",
      },
    ],
    timestamp: "2024-09-01T06:38:20.866Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Desert Dunes",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_795.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_796.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_797.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_798.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_799.jpg",
      },
    ],
    timestamp: "2024-09-01T06:38:27.909Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Emerald Jungle",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_800.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_801.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_802.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_803.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_804.jpg",
      },
    ],
    timestamp: "2024-09-01T06:38:37.445Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Emerald Jungle",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_805.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_806.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_807.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_808.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_809.jpg",
      },
    ],
    timestamp: "2024-09-01T06:38:45.241Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Emerald Jungle",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_810.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_811.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_812.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_813.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_814.jpg",
      },
    ],
    timestamp: "2024-09-01T06:38:55.798Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Emerald Jungle",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_815.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_816.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_817.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_818.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_819.jpg",
      },
    ],
    timestamp: "2024-09-01T06:39:04.896Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Emerald Jungle",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_820.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_821.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_822.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_823.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_824.jpg",
      },
    ],
    timestamp: "2024-09-01T06:39:16.717Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Emerald Jungle",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_825.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_826.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_827.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_828.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_829.jpg",
      },
    ],
    timestamp: "2024-09-01T06:39:28.743Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Emerald Jungle",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_830.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_831.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_832.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_833.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_834.jpg",
      },
    ],
    timestamp: "2024-09-01T06:39:39.346Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Emerald Jungle",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_835.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_836.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_837.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_838.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_839.jpg",
      },
    ],
    timestamp: "2024-09-01T06:39:51.287Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Eternal Sunrise",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_840.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_841.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_842.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_843.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_844.jpg",
      },
    ],
    timestamp: "2024-09-01T06:40:00.142Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Eternal Sunrise",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_845.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_846.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_847.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_848.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_849.jpg",
      },
    ],
    timestamp: "2024-09-01T06:40:08.154Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Eternal Sunrise",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_850.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_851.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_852.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_853.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_854.jpg",
      },
    ],
    timestamp: "2024-09-01T06:40:16.179Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Eternal Sunrise",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_855.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_856.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_857.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_858.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_859.jpg",
      },
    ],
    timestamp: "2024-09-01T06:40:25.198Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Eternal Sunrise",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_860.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_861.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_862.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_863.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_864.jpg",
      },
    ],
    timestamp: "2024-09-01T06:40:38.068Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Eternal Sunrise",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_865.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_866.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_867.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_868.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_869.jpg",
      },
    ],
    timestamp: "2024-09-01T06:40:48.254Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Eternal Sunrise",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_870.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_871.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_872.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_873.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_874.jpg",
      },
    ],
    timestamp: "2024-09-01T06:40:57.057Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Eternal Sunrise",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_875.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_876.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_877.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_878.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_879.jpg",
      },
    ],
    timestamp: "2024-09-01T06:41:06.319Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Golden Autumn",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_880.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_881.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_882.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_883.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_884.jpg",
      },
    ],
    timestamp: "2024-09-01T06:41:16.610Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Golden Autumn",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_885.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_886.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_887.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_888.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_889.jpg",
      },
    ],
    timestamp: "2024-09-01T06:41:27.937Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Golden Autumn",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_890.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_891.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_892.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_893.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_894.jpg",
      },
    ],
    timestamp: "2024-09-01T06:41:38.747Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Golden Autumn",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_895.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_896.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_897.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_898.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_899.jpg",
      },
    ],
    timestamp: "2024-09-01T06:41:48.041Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Golden Autumn",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_900.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_901.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_902.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_903.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_904.jpg",
      },
    ],
    timestamp: "2024-09-01T06:42:00.712Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Golden Autumn",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_905.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_906.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_907.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_908.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_909.jpg",
      },
    ],
    timestamp: "2024-09-01T06:42:12.901Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Golden Autumn",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_910.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_911.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_912.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_913.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_914.jpg",
      },
    ],
    timestamp: "2024-09-01T06:42:23.183Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Golden Autumn",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_915.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_916.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_917.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_918.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_919.jpg",
      },
    ],
    timestamp: "2024-09-01T06:42:33.583Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Misty Mountain Peaks",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_920.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_921.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_922.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_923.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_924.jpg",
      },
    ],
    timestamp: "2024-09-01T06:42:40.860Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Misty Mountain Peaks",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_925.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_926.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_927.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_928.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_929.jpg",
      },
    ],
    timestamp: "2024-09-01T06:42:49.381Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Misty Mountain Peaks",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_930.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_931.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_932.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_933.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_934.jpg",
      },
    ],
    timestamp: "2024-09-01T06:42:57.153Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Misty Mountain Peaks",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_935.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_936.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_937.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_938.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_939.jpg",
      },
    ],
    timestamp: "2024-09-01T06:43:05.161Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Misty Mountain Peaks",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_940.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_941.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_942.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_943.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_944.jpg",
      },
    ],
    timestamp: "2024-09-01T06:43:12.473Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Misty Mountain Peaks",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_945.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_946.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_947.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_948.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_949.jpg",
      },
    ],
    timestamp: "2024-09-01T06:43:20.078Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Misty Mountain Peaks",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_950.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_951.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_952.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_953.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_954.jpg",
      },
    ],
    timestamp: "2024-09-01T06:43:27.805Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Misty Mountain Peaks",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_955.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_956.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_957.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_958.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_959.jpg",
      },
    ],
    timestamp: "2024-09-01T06:43:35.075Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Moonlit Lake",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_960.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_961.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_962.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_963.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_964.jpg",
      },
    ],
    timestamp: "2024-09-01T06:43:43.110Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Moonlit Lake",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_965.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_966.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_967.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_968.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_969.jpg",
      },
    ],
    timestamp: "2024-09-01T06:43:54.616Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Moonlit Lake",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_970.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_971.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_972.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_973.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_974.jpg",
      },
    ],
    timestamp: "2024-09-01T06:44:04.872Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Moonlit Lake",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_975.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_976.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_977.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_978.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_979.jpg",
      },
    ],
    timestamp: "2024-09-01T06:44:13.602Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Moonlit Lake",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_980.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_981.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_982.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_983.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_984.jpg",
      },
    ],
    timestamp: "2024-09-01T06:44:25.327Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Moonlit Lake",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_985.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_986.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_987.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_988.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_989.jpg",
      },
    ],
    timestamp: "2024-09-01T06:44:34.062Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Moonlit Lake",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_990.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_991.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_992.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_993.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_994.jpg",
      },
    ],
    timestamp: "2024-09-01T06:44:43.940Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Moonlit Lake",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_995.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_996.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_997.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_998.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_999.jpg",
      },
    ],
    timestamp: "2024-09-01T06:44:53.352Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Serenity In Snow",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1000.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1001.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1002.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1003.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1004.jpg",
      },
    ],
    timestamp: "2024-09-01T06:45:04.115Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Serenity In Snow",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1005.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1006.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1007.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1008.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1009.jpg",
      },
    ],
    timestamp: "2024-09-01T06:45:14.398Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Serenity In Snow",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1010.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1011.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1012.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1013.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1014.jpg",
      },
    ],
    timestamp: "2024-09-01T06:45:24.320Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Serenity In Snow",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1015.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1016.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1017.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1018.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1019.jpg",
      },
    ],
    timestamp: "2024-09-01T06:45:33.407Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Sunset By The Sea",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1020.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1021.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1022.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1023.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1024.jpg",
      },
    ],
    timestamp: "2024-09-01T06:45:42.072Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Sunset By The Sea",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1025.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1026.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1027.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1028.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1029.jpg",
      },
    ],
    timestamp: "2024-09-01T06:45:51.561Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Sunset By The Sea",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1030.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1031.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1032.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1033.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1034.jpg",
      },
    ],
    timestamp: "2024-09-01T06:46:02.823Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Sunset By The Sea",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1035.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1036.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1037.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1038.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1039.jpg",
      },
    ],
    timestamp: "2024-09-01T06:46:12.065Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Sunset By The Sea",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1040.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1041.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1042.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1043.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1044.jpg",
      },
    ],
    timestamp: "2024-09-01T06:46:22.392Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Sunset By The Sea",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1045.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1046.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1047.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1048.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1049.jpg",
      },
    ],
    timestamp: "2024-09-01T06:46:32.833Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Sunset By The Sea",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1050.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1051.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1052.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1053.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1054.jpg",
      },
    ],
    timestamp: "2024-09-01T06:46:41.554Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Sunset By The Sea",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1055.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1056.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1057.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1058.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1059.jpg",
      },
    ],
    timestamp: "2024-09-01T06:46:52.053Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Tropical Twilight",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1060.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1061.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1062.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1063.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1064.jpg",
      },
    ],
    timestamp: "2024-09-01T06:47:00.842Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Tropical Twilight",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1065.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1066.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1067.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1068.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1069.jpg",
      },
    ],
    timestamp: "2024-09-01T06:47:11.052Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Tropical Twilight",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1070.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1071.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1072.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1073.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1074.jpg",
      },
    ],
    timestamp: "2024-09-01T06:47:19.591Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Tropical Twilight",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1075.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1076.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1077.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1078.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1079.jpg",
      },
    ],
    timestamp: "2024-09-01T06:47:27.512Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Tropical Twilight",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1080.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1081.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1082.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1083.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1084.jpg",
      },
    ],
    timestamp: "2024-09-01T06:47:37.544Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Tropical Twilight",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1085.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1086.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1087.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1088.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1089.jpg",
      },
    ],
    timestamp: "2024-09-01T06:47:49.255Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Tropical Twilight",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1090.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1091.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1092.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1093.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1094.jpg",
      },
    ],
    timestamp: "2024-09-01T06:48:01.245Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Tropical Twilight",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1095.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1096.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1097.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1098.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1099.jpg",
      },
    ],
    timestamp: "2024-09-01T06:48:12.569Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Whispers Of The Forest",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1100.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1101.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1102.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1103.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1104.jpg",
      },
    ],
    timestamp: "2024-09-01T06:48:20.755Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Whispers Of The Forest",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1105.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1106.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1107.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1108.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1109.jpg",
      },
    ],
    timestamp: "2024-09-01T06:48:30.288Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Whispers Of The Forest",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1110.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1111.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1112.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1113.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1114.jpg",
      },
    ],
    timestamp: "2024-09-01T06:48:38.578Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Whispers Of The Forest",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1115.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1116.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1117.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1118.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1119.jpg",
      },
    ],
    timestamp: "2024-09-01T06:48:47.371Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Whispers Of The Forest",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1120.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1121.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1122.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1123.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1124.jpg",
      },
    ],
    timestamp: "2024-09-01T06:48:57.180Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Whispers Of The Forest",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1125.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1126.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1127.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1128.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1129.jpg",
      },
    ],
    timestamp: "2024-09-01T06:49:07.460Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Whispers Of The Forest",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1130.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1131.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1132.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1133.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1134.jpg",
      },
    ],
    timestamp: "2024-09-01T06:49:20.759Z",
  },
  {
    artStyle: "🎨🖌️ Nature And Landscapes",
    scenario: "🧩🔍 Whispers Of The Forest",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1135.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1136.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1137.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1138.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1139.jpg",
      },
    ],
    timestamp: "2024-09-01T06:49:37.567Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Alien Horizon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1140.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1141.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1142.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1143.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1144.jpg",
      },
    ],
    timestamp: "2024-09-01T06:49:55.307Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Alien Horizon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1145.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1146.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1147.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1148.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1149.jpg",
      },
    ],
    timestamp: "2024-09-01T06:50:06.431Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Alien Horizon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1150.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1151.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1152.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1153.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1154.jpg",
      },
    ],
    timestamp: "2024-09-01T06:50:17.014Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Alien Horizon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1155.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1156.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1157.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1158.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1159.jpg",
      },
    ],
    timestamp: "2024-09-01T06:50:27.630Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Alien Horizon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1160.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1161.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1162.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1163.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1164.jpg",
      },
    ],
    timestamp: "2024-09-01T06:50:34.910Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Alien Horizon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1165.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1166.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1167.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1168.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1169.jpg",
      },
    ],
    timestamp: "2024-09-01T06:50:43.225Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Alien Horizon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1170.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1171.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1172.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1173.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1174.jpg",
      },
    ],
    timestamp: "2024-09-01T06:50:50.286Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Alien Horizon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1175.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1176.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1177.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1178.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1179.jpg",
      },
    ],
    timestamp: "2024-09-01T06:51:00.682Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Black Hole Mysteries",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1180.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1181.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1182.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1183.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1184.jpg",
      },
    ],
    timestamp: "2024-09-01T06:51:11.418Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Black Hole Mysteries",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1185.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1186.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1187.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1188.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1189.jpg",
      },
    ],
    timestamp: "2024-09-01T06:51:20.452Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Black Hole Mysteries",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1190.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1191.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1192.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1193.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1194.jpg",
      },
    ],
    timestamp: "2024-09-01T06:51:29.620Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Black Hole Mysteries",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1195.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1196.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1197.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1198.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1199.jpg",
      },
    ],
    timestamp: "2024-09-01T06:51:38.685Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Black Hole Mysteries",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1200.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1201.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1202.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1203.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1204.jpg",
      },
    ],
    timestamp: "2024-09-01T06:51:47.870Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Black Hole Mysteries",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1205.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1206.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1207.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1208.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1209.jpg",
      },
    ],
    timestamp: "2024-09-01T06:51:53.834Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Black Hole Mysteries",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1210.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1211.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1212.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1213.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1214.jpg",
      },
    ],
    timestamp: "2024-09-01T06:52:02.397Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Black Hole Mysteries",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1215.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1216.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1217.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1218.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1219.jpg",
      },
    ],
    timestamp: "2024-09-01T06:52:12.768Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Cosmic Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1220.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1221.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1222.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1223.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1224.jpg",
      },
    ],
    timestamp: "2024-09-01T06:52:21.143Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Cosmic Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1225.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1226.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1227.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1228.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1229.jpg",
      },
    ],
    timestamp: "2024-09-01T06:52:31.107Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Cosmic Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1230.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1231.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1232.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1233.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1234.jpg",
      },
    ],
    timestamp: "2024-09-01T06:52:38.880Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Cosmic Dreams",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1235.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1236.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1237.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1238.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1239.jpg",
      },
    ],
    timestamp: "2024-09-01T06:52:46.456Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Cosmic Dreams",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1240.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1241.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1242.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1243.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1244.jpg",
      },
    ],
    timestamp: "2024-09-01T06:52:54.201Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Cosmic Dreams",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1245.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1246.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1247.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1248.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1249.jpg",
      },
    ],
    timestamp: "2024-09-01T06:53:02.034Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Cosmic Dreams",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1250.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1251.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1252.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1253.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1254.jpg",
      },
    ],
    timestamp: "2024-09-01T06:53:11.083Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Cosmic Dreams",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1255.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1256.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1257.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1258.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1259.jpg",
      },
    ],
    timestamp: "2024-09-01T06:53:20.935Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Galactic Voyage",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1260.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1261.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1262.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1263.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1264.jpg",
      },
    ],
    timestamp: "2024-09-01T06:53:31.395Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Galactic Voyage",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1265.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1266.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1267.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1268.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1269.jpg",
      },
    ],
    timestamp: "2024-09-01T06:53:39.955Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Galactic Voyage",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1270.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1271.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1272.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1273.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1274.jpg",
      },
    ],
    timestamp: "2024-09-01T06:53:49.818Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Galactic Voyage",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1275.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1276.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1277.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1278.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1279.jpg",
      },
    ],
    timestamp: "2024-09-01T06:54:00.049Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Galactic Voyage",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1280.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1281.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1282.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1283.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1284.jpg",
      },
    ],
    timestamp: "2024-09-01T06:54:08.808Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Galactic Voyage",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1285.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1286.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1287.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1288.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1289.jpg",
      },
    ],
    timestamp: "2024-09-01T06:54:16.967Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Galactic Voyage",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1290.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1291.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1292.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1293.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1294.jpg",
      },
    ],
    timestamp: "2024-09-01T06:54:24.106Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Galactic Voyage",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1295.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1296.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1297.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1298.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1299.jpg",
      },
    ],
    timestamp: "2024-09-01T06:54:31.928Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Nebula Dawn",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1300.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1301.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1302.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1303.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1304.jpg",
      },
    ],
    timestamp: "2024-09-01T06:54:41.132Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Nebula Dawn",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1305.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1306.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1307.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1308.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1309.jpg",
      },
    ],
    timestamp: "2024-09-01T06:54:50.515Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Nebula Dawn",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1310.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1311.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1312.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1313.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1314.jpg",
      },
    ],
    timestamp: "2024-09-01T06:54:58.765Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Nebula Dawn",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1315.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1316.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1317.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1318.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1319.jpg",
      },
    ],
    timestamp: "2024-09-01T06:55:07.618Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Nebula Dawn",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1320.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1321.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1322.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1323.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1324.jpg",
      },
    ],
    timestamp: "2024-09-01T06:55:17.570Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Nebula Dawn",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1325.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1326.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1327.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1328.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1329.jpg",
      },
    ],
    timestamp: "2024-09-01T06:55:26.448Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Nebula Dawn",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1330.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1331.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1332.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1333.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1334.jpg",
      },
    ],
    timestamp: "2024-09-01T06:55:33.551Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Nebula Dawn",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1335.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1336.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1337.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1338.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1339.jpg",
      },
    ],
    timestamp: "2024-09-01T06:55:40.829Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Planet X",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1340.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1341.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1342.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1343.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1344.jpg",
      },
    ],
    timestamp: "2024-09-01T06:55:50.779Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Planet X",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1345.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1346.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1347.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1348.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1349.jpg",
      },
    ],
    timestamp: "2024-09-01T06:56:02.720Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Planet X",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1350.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1351.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1352.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1353.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1354.jpg",
      },
    ],
    timestamp: "2024-09-01T06:56:11.596Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Planet X",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1355.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1356.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1357.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1358.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1359.jpg",
      },
    ],
    timestamp: "2024-09-01T06:56:20.216Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Planet X",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1360.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1361.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1362.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1363.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1364.jpg",
      },
    ],
    timestamp: "2024-09-01T06:56:27.530Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Planet X",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1365.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1366.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1367.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1368.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1369.jpg",
      },
    ],
    timestamp: "2024-09-01T06:56:35.649Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Planet X",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1370.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1371.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1372.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1373.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1374.jpg",
      },
    ],
    timestamp: "2024-09-01T06:56:43.704Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Planet X",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1375.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1376.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1377.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1378.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1379.jpg",
      },
    ],
    timestamp: "2024-09-01T06:56:51.786Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Quantum Leap",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1380.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1381.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1382.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1383.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1384.jpg",
      },
    ],
    timestamp: "2024-09-01T06:57:01.904Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Quantum Leap",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1385.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1386.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1387.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1388.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1389.jpg",
      },
    ],
    timestamp: "2024-09-01T06:57:10.819Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Quantum Leap",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1390.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1391.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1392.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1393.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1394.jpg",
      },
    ],
    timestamp: "2024-09-01T06:57:19.697Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Quantum Leap",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1395.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1396.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1397.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1398.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1399.jpg",
      },
    ],
    timestamp: "2024-09-01T06:57:28.281Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Quantum Leap",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1400.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1401.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1402.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1403.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1404.jpg",
      },
    ],
    timestamp: "2024-09-01T06:57:35.813Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Quantum Leap",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1405.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1406.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1407.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1408.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1409.jpg",
      },
    ],
    timestamp: "2024-09-01T06:57:45.383Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Quantum Leap",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1410.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1411.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1412.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1413.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1414.jpg",
      },
    ],
    timestamp: "2024-09-01T06:57:53.721Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Quantum Leap",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1415.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1416.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1417.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1418.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1419.jpg",
      },
    ],
    timestamp: "2024-09-01T06:58:02.396Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Space-Time Rift",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1420.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1421.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1422.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1423.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1424.jpg",
      },
    ],
    timestamp: "2024-09-01T06:58:12.173Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Space-Time Rift",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1425.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1426.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1427.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1428.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1429.jpg",
      },
    ],
    timestamp: "2024-09-01T06:58:22.296Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Space-Time Rift",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1430.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1431.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1432.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1433.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1434.jpg",
      },
    ],
    timestamp: "2024-09-01T06:58:32.744Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Space-Time Rift",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1435.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1436.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1437.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1438.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1439.jpg",
      },
    ],
    timestamp: "2024-09-01T06:58:43.107Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Space-Time Rift",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1440.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1441.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1442.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1443.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1444.jpg",
      },
    ],
    timestamp: "2024-09-01T06:58:53.566Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Space-Time Rift",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1445.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1446.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1447.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1448.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1449.jpg",
      },
    ],
    timestamp: "2024-09-01T06:59:03.617Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Space-Time Rift",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1450.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1451.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1452.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1453.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1454.jpg",
      },
    ],
    timestamp: "2024-09-01T06:59:13.771Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Space-Time Rift",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1455.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1456.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1457.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1458.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1459.jpg",
      },
    ],
    timestamp: "2024-09-01T06:59:24.241Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Stardust Odyssey",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1460.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1461.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1462.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1463.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1464.jpg",
      },
    ],
    timestamp: "2024-09-01T06:59:34.089Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Stardust Odyssey",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1465.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1466.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1467.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1468.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1469.jpg",
      },
    ],
    timestamp: "2024-09-01T06:59:46.250Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Stardust Odyssey",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1470.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1471.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1472.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1473.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1474.jpg",
      },
    ],
    timestamp: "2024-09-01T06:59:55.579Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Stardust Odyssey",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1475.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1476.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1477.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1478.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1479.jpg",
      },
    ],
    timestamp: "2024-09-01T07:00:05.447Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Stardust Odyssey",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1480.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1481.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1482.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1483.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1484.jpg",
      },
    ],
    timestamp: "2024-09-01T07:00:14.886Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Stardust Odyssey",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1485.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1486.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1487.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1488.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1489.jpg",
      },
    ],
    timestamp: "2024-09-01T07:00:24.257Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Stardust Odyssey",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1490.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1491.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1492.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1493.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1494.jpg",
      },
    ],
    timestamp: "2024-09-01T07:00:33.933Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 Stardust Odyssey",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1495.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1496.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1497.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1498.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1499.jpg",
      },
    ],
    timestamp: "2024-09-01T07:00:42.556Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 The Last Frontier",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1500.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1501.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1502.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1503.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1504.jpg",
      },
    ],
    timestamp: "2024-09-01T07:00:49.920Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 The Last Frontier",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1505.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1506.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1507.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1508.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1509.jpg",
      },
    ],
    timestamp: "2024-09-01T07:00:58.263Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 The Last Frontier",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1510.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1511.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1512.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1513.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1514.jpg",
      },
    ],
    timestamp: "2024-09-01T07:01:06.036Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 The Last Frontier",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1515.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1516.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1517.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1518.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1519.jpg",
      },
    ],
    timestamp: "2024-09-01T07:01:16.008Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 The Last Frontier",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1520.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1521.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1522.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1523.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1524.jpg",
      },
    ],
    timestamp: "2024-09-01T07:01:24.823Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 The Last Frontier",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1525.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1526.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1527.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1528.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1529.jpg",
      },
    ],
    timestamp: "2024-09-01T07:01:35.178Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 The Last Frontier",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1530.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1531.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1532.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1533.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1534.jpg",
      },
    ],
    timestamp: "2024-09-01T07:01:49.227Z",
  },
  {
    artStyle: "🎨🖌️ Sci-Fi And Space",
    scenario: "🧩🔍 The Last Frontier",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1535.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1536.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1537.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1538.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1539.jpg",
      },
    ],
    timestamp: "2024-09-01T07:02:01.102Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Autumn Hues",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1540.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1541.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1542.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1543.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1544.jpg",
      },
    ],
    timestamp: "2024-09-01T07:02:17.910Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Autumn Hues",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1545.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1546.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1547.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1548.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1549.jpg",
      },
    ],
    timestamp: "2024-09-01T07:02:34.710Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Autumn Hues",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1550.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1551.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1552.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1553.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1554.jpg",
      },
    ],
    timestamp: "2024-09-01T07:02:49.128Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Autumn Hues",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1555.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1556.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1557.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1558.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1559.jpg",
      },
    ],
    timestamp: "2024-09-01T07:03:03.124Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Autumn Hues",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1560.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1561.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1562.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1563.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1564.jpg",
      },
    ],
    timestamp: "2024-09-01T07:03:18.056Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Autumn Hues",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1565.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1566.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1567.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1568.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1569.jpg",
      },
    ],
    timestamp: "2024-09-01T07:03:32.742Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Autumn Hues",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1570.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1571.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1572.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1573.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1574.jpg",
      },
    ],
    timestamp: "2024-09-01T07:03:45.886Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Autumn Hues",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1575.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1576.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1577.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1578.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1579.jpg",
      },
    ],
    timestamp: "2024-09-01T07:03:58.363Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Harvest Moon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1580.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1581.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1582.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1583.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1584.jpg",
      },
    ],
    timestamp: "2024-09-01T07:04:09.562Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Harvest Moon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1585.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1586.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1587.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1588.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1589.jpg",
      },
    ],
    timestamp: "2024-09-01T07:04:21.668Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Harvest Moon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1590.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1591.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1592.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1593.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1594.jpg",
      },
    ],
    timestamp: "2024-09-01T07:04:33.342Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Harvest Moon",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1595.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1596.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1597.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1598.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1599.jpg",
      },
    ],
    timestamp: "2024-09-01T07:04:42.688Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Harvest Moon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1600.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1601.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1602.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1603.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1604.jpg",
      },
    ],
    timestamp: "2024-09-01T07:04:53.777Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Harvest Moon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1605.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1606.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1607.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1608.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1609.jpg",
      },
    ],
    timestamp: "2024-09-01T07:05:04.389Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Harvest Moon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1610.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1611.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1612.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1613.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1614.jpg",
      },
    ],
    timestamp: "2024-09-01T07:05:13.677Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Harvest Moon",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1615.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1616.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1617.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1618.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1619.jpg",
      },
    ],
    timestamp: "2024-09-01T07:05:23.780Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Holiday Glow",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1620.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1621.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1622.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1623.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1624.jpg",
      },
    ],
    timestamp: "2024-09-01T07:05:33.856Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Holiday Glow",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1625.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1626.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1627.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1628.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1629.jpg",
      },
    ],
    timestamp: "2024-09-01T07:05:44.132Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Holiday Glow",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1630.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1631.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1632.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1633.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1634.jpg",
      },
    ],
    timestamp: "2024-09-01T07:05:54.746Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Holiday Glow",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1635.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1636.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1637.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1638.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1639.jpg",
      },
    ],
    timestamp: "2024-09-01T07:06:04.643Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Holiday Glow",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1640.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1641.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1642.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1643.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1644.jpg",
      },
    ],
    timestamp: "2024-09-01T07:06:14.728Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Holiday Glow",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1645.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1646.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1647.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1648.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1649.jpg",
      },
    ],
    timestamp: "2024-09-01T07:06:25.302Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Holiday Glow",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1650.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1651.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1652.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1653.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1654.jpg",
      },
    ],
    timestamp: "2024-09-01T07:06:36.939Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Holiday Glow",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1655.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1656.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1657.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1658.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1659.jpg",
      },
    ],
    timestamp: "2024-09-01T07:06:55.150Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Spring Awakening",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1660.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1661.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1662.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1663.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1664.jpg",
      },
    ],
    timestamp: "2024-09-01T07:07:05.527Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Spring Awakening",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1665.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1666.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1667.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1668.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1669.jpg",
      },
    ],
    timestamp: "2024-09-01T07:07:16.862Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Spring Awakening",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1670.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1671.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1672.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1673.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1674.jpg",
      },
    ],
    timestamp: "2024-09-01T07:07:28.144Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Spring Awakening",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1675.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1676.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1677.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1678.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1679.jpg",
      },
    ],
    timestamp: "2024-09-01T07:07:38.192Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Spring Awakening",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1680.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1681.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1682.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1683.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1684.jpg",
      },
    ],
    timestamp: "2024-09-01T07:07:49.332Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Spring Awakening",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1685.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1686.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1687.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1688.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1689.jpg",
      },
    ],
    timestamp: "2024-09-01T07:07:59.982Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Spring Awakening",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1690.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1691.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1692.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1693.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1694.jpg",
      },
    ],
    timestamp: "2024-09-01T07:08:10.870Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Spring Awakening",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1695.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1696.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1697.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1698.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1699.jpg",
      },
    ],
    timestamp: "2024-09-01T07:08:25.581Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Summer Breeze",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1700.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1701.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1702.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1703.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1704.jpg",
      },
    ],
    timestamp: "2024-09-01T07:08:35.063Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Summer Breeze",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1705.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1706.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1707.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1708.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1709.jpg",
      },
    ],
    timestamp: "2024-09-01T07:08:45.298Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Summer Breeze",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1710.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1711.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1712.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1713.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1714.jpg",
      },
    ],
    timestamp: "2024-09-01T07:08:55.693Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Summer Breeze",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1715.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1716.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1717.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1718.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1719.jpg",
      },
    ],
    timestamp: "2024-09-01T07:09:05.837Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Summer Breeze",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1720.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1721.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1722.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1723.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1724.jpg",
      },
    ],
    timestamp: "2024-09-01T07:09:18.638Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Summer Breeze",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1725.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1726.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1727.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1728.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1729.jpg",
      },
    ],
    timestamp: "2024-09-01T07:09:29.337Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Summer Breeze",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1730.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1731.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1732.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1733.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1734.jpg",
      },
    ],
    timestamp: "2024-09-01T07:09:42.272Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Winter Wonderland",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1735.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1736.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1737.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1738.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1739.jpg",
      },
    ],
    timestamp: "2024-09-01T07:09:55.181Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Winter Wonderland",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1740.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1741.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1742.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1743.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1744.jpg",
      },
    ],
    timestamp: "2024-09-01T07:10:07.675Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Winter Wonderland",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1745.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1746.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1747.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1748.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1749.jpg",
      },
    ],
    timestamp: "2024-09-01T07:10:17.696Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Winter Wonderland",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1750.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1751.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1752.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1753.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1754.jpg",
      },
    ],
    timestamp: "2024-09-01T07:10:28.056Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Winter Wonderland",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1755.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1756.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1757.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1758.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1759.jpg",
      },
    ],
    timestamp: "2024-09-01T07:10:37.826Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Winter Wonderland",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1760.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1761.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1762.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1763.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1764.jpg",
      },
    ],
    timestamp: "2024-09-01T07:10:46.655Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Winter Wonderland",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1765.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1766.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1767.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1768.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1769.jpg",
      },
    ],
    timestamp: "2024-09-01T07:10:57.796Z",
  },
  {
    artStyle: "🎨🖌️ Seasonal And Holiday",
    scenario: "🧩🔍 Winter Wonderland",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1770.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1771.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1772.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1773.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1774.jpg",
      },
    ],
    timestamp: "2024-09-01T07:11:07.872Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Cyber City",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1775.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1776.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1777.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1778.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1779.jpg",
      },
    ],
    timestamp: "2024-09-01T07:11:17.718Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Cyber City",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1780.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1781.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1782.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1783.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1784.jpg",
      },
    ],
    timestamp: "2024-09-01T07:11:28.781Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Cyber City",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1785.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1786.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1787.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1788.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1789.jpg",
      },
    ],
    timestamp: "2024-09-01T07:11:40.097Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Cyber City",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1790.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1791.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1792.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1793.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1794.jpg",
      },
    ],
    timestamp: "2024-09-01T07:11:49.456Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Cyber City",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1795.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1796.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1797.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1798.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1799.jpg",
      },
    ],
    timestamp: "2024-09-01T07:11:59.543Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Cyber City",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1800.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1801.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1802.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1803.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1804.jpg",
      },
    ],
    timestamp: "2024-09-01T07:12:09.082Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Cyber City",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1805.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1806.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1807.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1808.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1809.jpg",
      },
    ],
    timestamp: "2024-09-01T07:12:18.662Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Cyber City",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1810.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1811.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1812.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1813.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1814.jpg",
      },
    ],
    timestamp: "2024-09-01T07:12:29.799Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Digital Desert",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1815.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1816.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1817.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1818.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1819.jpg",
      },
    ],
    timestamp: "2024-09-01T07:12:38.713Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Digital Desert",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1820.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1821.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1822.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1823.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1824.jpg",
      },
    ],
    timestamp: "2024-09-01T07:12:47.535Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Digital Desert",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1825.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1826.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1827.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1828.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1829.jpg",
      },
    ],
    timestamp: "2024-09-01T07:12:55.842Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Digital Desert",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1830.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1831.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1832.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1833.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1834.jpg",
      },
    ],
    timestamp: "2024-09-01T07:13:05.045Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Digital Desert",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1835.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1836.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1837.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1838.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1839.jpg",
      },
    ],
    timestamp: "2024-09-01T07:13:14.669Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Digital Desert",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1840.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1841.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1842.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1843.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1844.jpg",
      },
    ],
    timestamp: "2024-09-01T07:13:27.764Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Digital Desert",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1845.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1846.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1847.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1848.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1849.jpg",
      },
    ],
    timestamp: "2024-09-01T07:13:35.951Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Digital Desert",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1850.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1851.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1852.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1853.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1854.jpg",
      },
    ],
    timestamp: "2024-09-01T07:13:46.274Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Futuristic Highway",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1855.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1856.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1857.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1858.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1859.jpg",
      },
    ],
    timestamp: "2024-09-01T07:13:54.349Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Futuristic Highway",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1860.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1861.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1862.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1863.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1864.jpg",
      },
    ],
    timestamp: "2024-09-01T07:14:01.910Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Futuristic Highway",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1865.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1866.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1867.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1868.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1869.jpg",
      },
    ],
    timestamp: "2024-09-01T07:14:10.012Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Futuristic Highway",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1870.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1871.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1872.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1873.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1874.jpg",
      },
    ],
    timestamp: "2024-09-01T07:14:18.448Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Futuristic Highway",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1875.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1876.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1877.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1878.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1879.jpg",
      },
    ],
    timestamp: "2024-09-01T07:14:29.711Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Futuristic Highway",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1880.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1881.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1882.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1883.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1884.jpg",
      },
    ],
    timestamp: "2024-09-01T07:14:42.351Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Futuristic Highway",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1885.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1886.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1887.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1888.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1889.jpg",
      },
    ],
    timestamp: "2024-09-01T07:14:51.738Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Futuristic Highway",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1890.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1891.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1892.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1893.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1894.jpg",
      },
    ],
    timestamp: "2024-09-01T07:15:00.056Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Mecha World",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1895.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1896.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1897.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1898.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1899.jpg",
      },
    ],
    timestamp: "2024-09-01T07:15:09.871Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Mecha World",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1900.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1901.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1902.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1903.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1904.jpg",
      },
    ],
    timestamp: "2024-09-01T07:15:22.229Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Mecha World",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1905.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1906.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1907.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1908.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1909.jpg",
      },
    ],
    timestamp: "2024-09-01T07:15:35.245Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Mecha World",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1910.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1911.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1912.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1913.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1914.jpg",
      },
    ],
    timestamp: "2024-09-01T07:15:45.560Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Mecha World",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1915.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1916.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1917.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1918.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1919.jpg",
      },
    ],
    timestamp: "2024-09-01T07:15:54.764Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Mecha World",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1920.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1921.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1922.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1923.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1924.jpg",
      },
    ],
    timestamp: "2024-09-01T07:16:04.086Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Mecha World",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1925.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1926.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1927.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1928.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1929.jpg",
      },
    ],
    timestamp: "2024-09-01T07:16:13.464Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Mecha World",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1930.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1931.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1932.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1933.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1934.jpg",
      },
    ],
    timestamp: "2024-09-01T07:16:23.042Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Retro Racer",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1935.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1936.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1937.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1938.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1939.jpg",
      },
    ],
    timestamp: "2024-09-01T07:16:33.723Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Retro Racer",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1940.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1941.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1942.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1943.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1944.jpg",
      },
    ],
    timestamp: "2024-09-01T07:16:44.360Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Retro Racer",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1945.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1946.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1947.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1948.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1949.jpg",
      },
    ],
    timestamp: "2024-09-01T07:16:54.218Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Retro Racer",
    colorScheme: "🌑✨ Dark Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1950.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1951.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1952.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1953.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1954.jpg",
      },
    ],
    timestamp: "2024-09-01T07:17:02.052Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Retro Racer",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(1).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1955.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1956.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1957.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1958.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1959.jpg",
      },
    ],
    timestamp: "2024-09-01T07:17:10.621Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Retro Racer",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(2).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1960.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1961.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1962.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1963.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1964.jpg",
      },
    ],
    timestamp: "2024-09-01T07:17:20.105Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Retro Racer",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer(3).jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1965.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1966.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1967.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1968.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1969.jpg",
      },
    ],
    timestamp: "2024-09-01T07:17:31.974Z",
  },
  {
    artStyle: "🎨🖌️ Vehicles And Technology",
    scenario: "🧩🔍 Retro Racer",
    colorScheme: "🌕🌟 Light Mode",
    imageName: "🖼️🎨 Designer.jpeg",
    urls: [
      {
        resolution: "90x51",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1970.jpg",
      },
      {
        resolution: "320x183",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1971.jpg",
      },
      {
        resolution: "800x457",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1972.jpg",
      },
      {
        resolution: "1280x731",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1973.jpg",
      },
      {
        resolution: "1792x1024",
        url: "https://api.telegram.org/file/bot6367546441:AAFqO5B5JMhjVTpyI9FHAkThKipAWI5CjU0/photos/file_1974.jpg",
      },
    ],
    timestamp: "2024-09-01T07:17:41.335Z",
  },
];
