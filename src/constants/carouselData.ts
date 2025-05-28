export interface CarouselItem {
    id: number;
    title: string;
    image: string;
    thumbnail: string;
    buttonLink?: string;
  }
  
  export const carouselData: Record<string, CarouselItem[]> = {
    // Default/Home page carousel
    default: [
      {
        id: 1,
        title: "Khám phá công nghệ mới nhất cùng chúng tôi",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=100&fit=crop",
        buttonLink: "",
      },
      {
        id: 2,
        title: "Tư vấn thiết bị phù hợp với nhu cầu của bạn",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
        buttonLink: "",
      },
      {
        id: 3,
        title: "Giá tốt nhất thị trường - Chất lượng đảm bảo",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=100&fit=crop",
        buttonLink: "",
      },
    ],
  
    // Phone carousel
    "dien-thoai": [
      {
        id: 1,
        title: "iPhone 16 Pro Max - Đỉnh cao công nghệ Apple",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=100&fit=crop",
        buttonLink: "iphone-16-pro-max",
      },
      {
        id: 2,
        title: "Samsung Galaxy S25 Ultra - Sức mạnh AI tương lai",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=100&fit=crop",
        buttonLink: "dien-thoai-samsung-galaxy-s25-ultra",
      },
      {
        id: 3,
        title: "Xiaomi 14 Ultra - Nhiếp ảnh chuyên nghiệp",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=100&fit=crop",
        buttonLink: "xiaomi-14-ultra",
      },
    ],
  
    // Laptop carousel
    "laptop": [
      {
        id: 1,
        title: "MacBook Pro M4 - Hiệu năng vượt trội cho chuyên gia",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=100&fit=crop",
        buttonLink: "macbook-pro-14-inch-m4-24gb-1tb",
      },
      {
        id: 2,
        title: "Dell XPS 13 - Thiết kế tinh tế, hiệu năng mạnh mẽ",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=100&fit=crop",
        buttonLink: "laptop-dell-xps-13-9350-xps9350-u5ia165w11gr-fp",
      },
      {
        id: 3,
        title: "ASUS ROG Strix - Gaming laptop đỉnh cao",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=200&h=100&fit=crop",
        buttonLink: "laptop-asus-rog-strix-g16-g614jv-n4369w",
      },
    ],
  
    // Monitor carousel
    "man-hinh": [
      {
        id: 1,
        title: "LG UltraWide 4K - Trải nghiệm màn hình siêu rộng",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=100&fit=crop",
        buttonLink: "",
      },
      {
        id: 2,
        title: "Samsung Odyssey G9 - Gaming monitor cong 49 inch",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=100&fit=crop",
        buttonLink: "",
      },
      {
        id: 3,
        title: "Dell UltraSharp - Màn hình chuyên nghiệp cho thiết kế",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=100&fit=crop",
        buttonLink: "",
      },
    ],
  
    // Tablet carousel
    "may-tinh-bang": [
      {
        id: 1,
        title: "iPad Pro M2 - Sức mạnh máy tính trong tầm tay",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=100&fit=crop",
        buttonLink: "",
      },
      {
        id: 2,
        title: "Samsung Galaxy Tab S9 Ultra - Tablet Android cao cấp",
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=200&h=100&fit=crop",
        buttonLink: "",
      },
      {
        id: 3,
        title: "Microsoft Surface Pro 9 - Laptop và tablet trong một",
        image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=200&h=100&fit=crop",
        buttonLink: "",
      },
    ],
  
    // Desktop PC carousel
    pc: [
      {
        id: 1,
        title: "Gaming PC RTX 4090 - Sức mạnh gaming tối thượng",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=200&h=100&fit=crop",
        buttonLink: "",
      },
      {
        id: 2,
        title: "Workstation Intel Xeon - Hiệu năng cho chuyên gia",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200&h=100&fit=crop",
        buttonLink: "",
      },
      {
        id: 3,
        title: "Mini PC Intel NUC - Nhỏ gọn, hiệu năng cao",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=100&fit=crop",
        buttonLink: "",
      },
    ],
  };
  
  export const getCarouselData = (category?: string | null): CarouselItem[] => {
    if (!category || !carouselData[category]) {
      return carouselData.default;
    }
    return carouselData[category];
  }; 