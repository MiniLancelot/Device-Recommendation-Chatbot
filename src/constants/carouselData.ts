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
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=100&fit=crop",
      buttonLink: "",
    },
    {
      id: 2,
      title: "Tư vấn thiết bị phù hợp với nhu cầu của bạn",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
      buttonLink: "",
    },
    {
      id: 3,
      title: "Giá tốt nhất thị trường - Chất lượng đảm bảo",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=100&fit=crop",
      buttonLink: "",
    },
  ],

  // Phone carousel
  "dien-thoai": [
    {
      id: 1,
      title: "iPhone 16 Pro Max - Đỉnh cao công nghệ Apple",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=100&fit=crop",
      buttonLink: "iphone-16-pro-max",
    },
    {
      id: 2,
      title: "Samsung Galaxy S25 Ultra - Sức mạnh AI tương lai",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=100&fit=crop",
      buttonLink: "dien-thoai-samsung-galaxy-s25-ultra",
    },
    {
      id: 3,
      title: "Xiaomi 14 Ultra - Nhiếp ảnh chuyên nghiệp",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=100&fit=crop",
      buttonLink: "xiaomi-14-ultra-12gb-512gb",
    },
  ],

  // Laptop carousel
  laptop: [
    {
      id: 1,
      title: "MacBook Pro M4 - Hiệu năng vượt trội cho chuyên gia",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=100&fit=crop",
      buttonLink: "macbook-pro-14-inch-m4-24gb-1tb",
    },
    {
      id: 2,
      title: "Dell XPS 13 - Thiết kế tinh tế, hiệu năng mạnh mẽ",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=100&fit=crop",
      buttonLink: "laptop-dell-xps-13-9350-xps9350-u5ia165w11gr-fp",
    },
    {
      id: 3,
      title: "ASUS ROG Strix - Gaming laptop đỉnh cao",
      image:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=200&h=100&fit=crop",
      buttonLink: "laptop-asus-rog-strix-g16-g614jv-n4369w",
    },
  ],

  // Monitor carousel
  "man-hinh": [
    {
      id: 1,
      title: "AOC CQ27G2 - Mang đến trải nghiệm chiến game đỉnh cao",
      image:
        "https://www.wepc.com/wp-content/uploads/2021/02/aoccq27g2u-13.jpg",
      thumbnail:
        "https://www.wepc.com/wp-content/uploads/2021/02/aoccq27g2u-13.jpg",
      buttonLink: "man-hinh-cong-gaming-aoc-cq27g2-27-inch",
    },
    {
      id: 2,
      title: "Samsung Odyssey G9 - Gaming monitor cong 49 inch",
      image:
        "https://genk.mediacdn.vn/139269124445442048/2023/7/10/samsung-odyssey-oled-g9-6-1688981404927780457242-1688983719252-16889837193841389400688.jpg",
      thumbnail:
        "https://genk.mediacdn.vn/139269124445442048/2023/7/10/samsung-odyssey-oled-g9-6-1688981404927780457242-1688983719252-16889837193841389400688.jpg",
      buttonLink:
        "man-hinh-gaming-samsung-odyssey-oled-g9-g93sd-ls49dg930sexxv-49-inch",
    },
    {
      id: 3,
      title: "Dell UltraSharp - Màn hình chuyên nghiệp cho thiết kế",
      image:
        "https://cohotech.vn/wp-content/uploads/2024/01/Dell-Ultrasharp-U2724D-01.jpg",
      thumbnail:
        "https://cohotech.vn/wp-content/uploads/2024/01/Dell-Ultrasharp-U2724D-01.jpg",
      buttonLink: "man-hinh-cong-dell-ultrasharp-u3425we-120hz-34-inch",
    },
  ],

  // Tablet carousel
  "may-tinh-bang": [
    {
      id: 1,
      title: "iPad Pro M4 - Sức mạnh máy tính trong tầm tay",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=100&fit=crop",
      buttonLink: "ipad-pro-m4-13-inch-2tb-5g",
    },
    {
      id: 2,
      title: "Samsung Galaxy Tab S10 Ultra - Tablet Android cao cấp",
      image:
        "https://www.digitaltrends.com/wp-content/uploads/2024/09/Galaxy-Tab-S10-Ultra-hands-on-Digital-Trends-1.jpg?resize=1200%2C630&p=1",
      thumbnail:
        "https://www.digitaltrends.com/wp-content/uploads/2024/09/Galaxy-Tab-S10-Ultra-hands-on-Digital-Trends-1.jpg?resize=1200%2C630&p=1",
      buttonLink: "may-tinh-bang-samsung-galaxy-tab-s10-ultra-5g",
    },
    {
      id: 3,
      title: "Xiaomi Pad 7 - Laptop và tablet trong một",
      image:
        "https://fdn.gsmarena.com/imgroot/news/23/04/xiaomi-pad-6-series-announced/inline/-1200/gsmarena_010.jpg",
      thumbnail:
        "https://fdn.gsmarena.com/imgroot/news/23/04/xiaomi-pad-6-series-announced/inline/-1200/gsmarena_010.jpg",
      buttonLink: "may-tinh-bang-xiaomi-pad-7",
    },
  ],

  // Desktop PC carousel
  pc: [
    {
      id: 1,
      title: "Gaming PC RTX 5090 - Sức mạnh gaming tối thượng",
      image:
        "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=200&h=100&fit=crop",
      buttonLink: "pc-cps-quantum-blaze-5090",
    },
    {
      id: 2,
      title: "CPS Đồ Hoạ i7 14700KF - Hiệu năng cho chuyên gia",
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200&h=100&fit=crop",
      buttonLink: "may-tinh-pc-cps-do-hoa-d08",
    },
    {
      id: 3,
      title: "Mini PC Asus NUC - Nhỏ gọn, hiệu năng cao",
      image:
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&h=100&fit=crop",
      buttonLink: "pc-mini-asus-nuc-14-essential-intel-core-n97",
    },
  ],
};

export const getCarouselData = (category?: string | null): CarouselItem[] => {
  if (!category || !carouselData[category]) {
    return carouselData.default;
  }
  return carouselData[category];
};
