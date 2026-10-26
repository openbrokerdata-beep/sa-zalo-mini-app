/**
 * NỘI DUNG DỰ ÁN — nguồn: Senturia-An-Phu_Tai-lieu-thong-nhat.md (single source of truth).
 * Giữ nguyên văn tiếng Việt. Ảnh tham chiếu theo quy ước của scripts/optimize-assets.mjs:
 *   images/<site>/<group>/<group>_<name>.<ext>  →  media "<group>/<name>.webp" (svg giữ nguyên .svg)
 * Chỉnh nội dung: sửa file này (task CT-01), KHÔNG hard-code text trong component.
 */
import type {
  Amenity,
  Fact,
  LegalItem,
  Partner,
  Product,
  ProgressMilestone,
  UnitType,
} from "./types";

export const project = {
  name: "Senturia An Phú",
  legalName: "Khu nhà ở thấp tầng OTM4 – thuộc KDC Nguyên Phương",
  developer: "Công ty TNHH Bất động sản Nguyên Phương",
  taxCode: "0314377920",
  taxCodeIssued: "Cấp lần đầu 27/04/2017, Sở tài chính TP. Hồ Chí Minh",
  address:
    "Khu đô thị Nam Rạch Chiếc, đường Song Hành, Cao tốc TP. HCM – Long Thành – Dầu Giây, Phường Bình Trưng, TP. Hồ Chí Minh",
  geo: { lat: 10.7945727, lng: 106.7679024 },
  disclaimer:
    "Chúng tôi đã nỗ lực & cam kết để hoàn thiện tài liệu này. Tuy nhiên, tài liệu và hình ảnh chỉ mang tính chất tham khảo. Thông tin chính thức sẽ căn cứ trên văn bản giao dịch trong tương lai.",
} as const;

export const hero = {
  eyebrow: "SENTURIA AN PHÚ · HOME RESORT",
  title: "Sống như nghỉ dưỡng",
  titleItalic: "mỗi ngày.",
  description:
    "Không gian sống xanh, kiến trúc đương đại và những khu vườn riêng giữa lòng khu Đông.",
  image: "hero/hero-ldp-mb.webp",
  fallbackImage: "thiet-ke/architecture.webp",
  ctaPrimary: "Đăng ký tư vấn",
  ctaSecondary: "Khám phá dự án",
} as const;

export const banners: string[] = [1, 2, 3, 4, 5].map((i) => `banner/banner${i}-mb.webp`);

export const overview = {
  eyebrow: "TỔNG QUAN",
  title: "Một miền xanh.",
  titleItalic: "Một chốn trở về.",
  lead: "Senturia An Phú là khu nhà ở thấp tầng tại khu đô thị Nam Rạch Chiếc, phường Bình Trưng, TP. Hồ Chí Minh.",
  description:
    "Dự án có quy mô 8,6 ha với 355 sản phẩm sở hữu lâu dài theo công bố của chủ đầu tư: nhà phố liên kế, nhà phố thương mại và biệt thự song lập. Thiết kế kết hợp kiến trúc đương đại, sân vườn trước và sau nhà, cùng cảnh quan cây xanh và mặt nước.",
  facts: [
    { value: "8,6 ha", label: "Quy mô dự án" },
    { value: "355", label: "Sản phẩm thấp tầng" },
    { value: "1,29 ha", label: "Công viên trung tâm" },
    { value: "3", label: "Dòng sản phẩm" },
  ] satisfies Fact[],
};

export const nature = {
  title: "THIÊN NHIÊN TRƯỚC THỀM NHÀ",
  subtitle: "Riêng tư trọn vẹn – An nhiên tròn đầy",
  description:
    "Phần lớn quy hoạch toàn dự án được dành cho cây xanh, mặt nước và cảnh quan, kiến tạo nên một không gian sống mang đậm chất nghỉ dưỡng như resort ngay giữa lòng đô thị: Công viên trung tâm rộng đến 1,29ha lấy cảm hứng từ Central Park (New York), hai khu vườn trước & sau nhà luôn tươi mát quanh năm, hương hoa cỏ cây chạy dọc theo lối đi chung… mở ra những khoảng xanh vô cùng khoáng đạt và riêng tư.",
  image: "thien-nhien/about-ldp-mb.webp",
};

export const legacy = {
  title: "GIA SẢN ĐỘC BẢN",
  subtitle: "Giữa giao lộ thịnh vượng",
  paragraphs: [
    "Giá trị của một bất động sản được quyết định bởi hai yếu tố không thể nhân bản: Vị trí và sự khan hiếm.",
    "Senturia An Phú tọa lạc tại tâm điểm khu Đông TP.HCM - nơi các công trình hạ tầng trọng điểm và dòng chảy kinh tế cùng hội tụ, định hình một lõi trung tâm mới. Trong bối cảnh quỹ đất thấp tầng ngày càng thu hẹp, một dự án vừa sở hữu vị trí chiến lược, vừa giữ được mật độ xây dựng thấp và không gian sống riêng tư trở thành một tài sản phiên bản hữu hạn.",
  ],
  features: [
    { label: "KIẾN TRÚC ĐƯƠNG ĐẠI", icon: "quy-hoach/legacy_1.svg", anchor: "design" },
    { label: "SẢN PHẨM GIỚI HẠN", icon: "quy-hoach/legacy_2.svg", anchor: "products" },
    { label: "TIỆN ÍCH XỨNG TẦM", icon: "quy-hoach/legacy_3.svg", anchor: "amenities" },
  ],
};

export const design = {
  title: "KIẾN TRÚC DUY MỸ",
  subtitle: "Nâng tầm dấu ấn cá nhân",
  description:
    "Vượt ra khỏi những khuôn mẫu quen thuộc, Senturia An Phú lựa chọn ngôn ngữ kiến trúc đương đại đề cao sự kết nối với thiên nhiên, đặc biệt là 2 khu vườn trước & sau nhà xanh mát hiếm có giữa trung tâm thành phố. Mỗi tầng của ngôi nhà như những khối hình học vuông vức được sắp đặt đầy tính sáng tạo, kết hợp cùng hệ kính lớn, mở rộng tầm nhìn và đưa ánh sáng tự nhiên vào ngôi nhà.",
  image: "thiet-ke/design-ldp-mb.webp",
};

export const productsSection = {
  title: "SẢN PHẨM GIỚI HẠN",
  subtitle: "Giá trị vượt thời gian",
  description:
    "Ba dòng sản phẩm ở Senturia An Phú được kiến tạo theo nhu cầu sở hữu & phong cách sống khác nhau, nhưng cùng hội tụ trong một hệ giá trị chung: Gia sản truyền đời & không ngừng gia tăng giá trị theo thời gian.",
};

export const products: Product[] = [
  {
    id: "biet-thu-song-lap",
    interest: "semi_detached_villa",
    name: "Biệt thự song lập",
    summary: "62 căn · 2 khu vườn trước & sau",
    description:
      "Senturia An Phú dành những vị trí đẹp nhất để phát triển giới hạn 62 căn biệt thự song lập với diện tích lớn, không gian sống rộng rãi và sang trọng như biệt thự nghỉ dưỡng. Mỗi căn biệt thự đều sở hữu hai khu vườn trước và sau nhà, gia chủ hoàn toàn tự do sáng tạo và bài trí sắp đặt tiểu cảnh theo sở thích.",
    cover: "san-pham/arena1.webp",
    gallery: [
      { src: "san-pham/arena1-1.webp", caption: "Biệt thự song lập" },
      { src: "san-pham/arena1-2.webp", caption: "Sân vườn trước & sau nhà" },
      { src: "san-pham/arena1-3-png.webp", caption: "Tiền sảnh" },
      { src: "san-pham/arena1-3.webp", caption: "Phòng khách sang trọng & phóng khoáng" },
      { src: "san-pham/arena1-4.webp", caption: "Phòng ăn & bếp ấm cúng" },
      { src: "san-pham/arena1-5.webp", caption: "Phòng làm việc thư thái" },
      { src: "san-pham/arena1-6.webp", caption: "Phòng ngủ hiện đại & tiện nghi" },
      { src: "san-pham/arena1-7.webp", caption: "Phòng học / đọc sách yên tĩnh & thoáng đạt" },
    ],
  },
  {
    id: "nha-pho-vuon",
    interest: "garden_townhouse",
    name: "Nhà phố vườn",
    summary: "Vườn trước & sau · không đối lưng",
    description:
      "Thừa hưởng tinh hoa của thiết kế “vườn trong nhà phố” đang trở thành xu hướng tất yếu của đô thị hiện đại. Mỗi căn đều sở hữu mặt tiền đường nội khu và khoảng sân vườn trước & sau nhà, cận kề các tiện ích. Đặc biệt, các căn nhà không đối lưng nhau, mà được ngăn cách bằng lối đi chung rợp bóng cỏ cây xanh mát.",
    cover: "san-pham/arena2.webp",
    gallery: [
      { src: "san-pham/arena2-0.webp", caption: "Nhà phố vườn" },
      { src: "san-pham/arena2-1.webp", caption: "Phòng khách trẻ trung & nhẹ nhàng" },
      { src: "san-pham/arena2-2.webp", caption: "Phòng ngủ ấm áp & tối giản" },
      { src: "san-pham/arena2-3.webp", caption: "Sảnh đón" },
    ],
  },
  {
    id: "nha-pho-thuong-mai",
    interest: "shophouse",
    name: "Nhà phố thương mại",
    summary: "Mặt tiền Song Hành cao tốc",
    description:
      "Nhà phố thương mại sở hữu vị trí mặt tiền chiến lược ngay trung tâm An Phú, kết nối trực tiếp với trục đường Song Hành cao tốc và các tuyến giao thông huyết mạch khu Đông, giúp tiếp cận cư dân và lưu lượng khách hàng lớn trong khu vực, hứa hẹn là điểm đến của các thương hiệu lớn, F&B, ngân hàng, showroom...",
    cover: "san-pham/arena3.webp",
    gallery: [
      { src: "san-pham/arena3-0.webp", caption: "Nhà phố thương mại" },
      { src: "san-pham/arena3-1.webp", caption: "Phòng khách 1" },
      { src: "san-pham/arena3-2.webp", caption: "Phòng khách 2" },
      { src: "san-pham/arena3-3.webp", caption: "Phòng khách 3" },
      { src: "san-pham/arena3-4.webp", caption: "Phòng khách 4" },
    ],
  },
];

export const floorPlan = {
  title: "MẶT BẰNG",
  masterPlan: "mat-bang/arena.webp",
  note: "Đây là diện tích tham khảo, vui lòng liên hệ hotline để biết thêm thông tin chi tiết.",
  units: [
    {
      code: "TH1",
      group: "Nhà phố liên kế",
      count: 41,
      area: "75 – 204,19",
      floors: "4 tầng (1 trệt, 2 lầu & sân thượng)",
      color: "#F3F2CB",
      plan: "mat-bang/TH1.webp",
    },
    {
      code: "TH2",
      group: "Nhà phố liên kế",
      count: 36,
      area: "75 – 204,19",
      floors: "4 tầng (1 trệt, 2 lầu & sân thượng)",
      color: "#FAF6AB",
      plan: "mat-bang/TH2.webp",
    },
    {
      code: "TH3",
      group: "Nhà phố liên kế",
      count: 62,
      area: "75 – 204,19",
      floors: "4 tầng (1 trệt, 2 lầu & sân thượng)",
      color: "#E9E44F",
      plan: "mat-bang/TH3.webp",
    },
    {
      code: "TH4",
      group: "Nhà phố liên kế",
      count: 46,
      area: "75 – 204,19",
      floors: "4 tầng (1 trệt, 2 lầu & sân thượng)",
      color: "#F5CF49",
      plan: "mat-bang/TH4.webp",
    },
    {
      code: "SH1",
      group: "Nhà phố thương mại",
      count: 41,
      area: "116,31 – 215,9",
      floors: "4 tầng (1 trệt, 3 lầu)",
      color: "#E4BCD3",
      plan: "mat-bang/SH1.webp",
    },
    {
      code: "SH2",
      group: "Nhà phố thương mại",
      count: 39,
      area: "116,31 – 215,9",
      floors: "4 tầng (1 trệt, 3 lầu)",
      color: "#D37CAC",
      plan: "mat-bang/SH2.webp",
    },
    {
      code: "SH3",
      group: "Nhà phố thương mại",
      count: 8,
      area: "116,31 – 215,9",
      floors: "4 tầng (1 trệt, 3 lầu)",
      color: "#BB6180",
      plan: "mat-bang/SH3.webp",
    },
    {
      code: "SD1",
      group: "Biệt thự song lập",
      count: 59,
      area: "189,45 – 338,23",
      floors: "4 tầng (1 trệt, 2 lầu & sân thượng)",
      color: "#6DBFC6",
      plan: "mat-bang/SD1.webp",
    },
  ] satisfies UnitType[],
};

export const amenitiesSection = {
  title: "HỆ TIỆN ÍCH XỨNG TẦM",
  subtitle: "An nhiên tận hưởng",
  description:
    "Hơn 1,29 ha diện tích được dành trọn cho cảnh quan, mảng xanh, mặt nước và hệ tiện ích đẳng cấp - nơi từng khoảnh khắc trôi qua đều được bao bọc bởi sự an yên, thư thái và cảm giác tận hưởng trọn vẹn từng nhịp sống.",
};

/** Thứ tự & nhãn theo nguồn B (chính thức). ⚠️ CT-01: đối chiếu lại nhãn bf-1/bf-2 với ảnh thực tế. */
export const amenities: Amenity[] = [
  { order: 1, name: "Công viên trung tâm", image: "tien-ich/bf-1.webp" },
  { order: 2, name: "Câu lạc bộ cộng đồng", image: "tien-ich/bf-2.webp" },
  { order: 3, name: "Công viên nội khu", image: "tien-ich/bf-3.webp" },
  { order: 4, name: "Sân đa năng ngoài trời", image: "tien-ich/sandanang.webp" },
  { order: 5, name: "Hồ bơi trong nhà", image: "tien-ich/bf-5.webp" },
  { order: 6, name: "Hồ cảnh quan", image: "tien-ich/bf-6.webp" },
  { order: 7, name: "Phòng gym", image: "tien-ich/phonggym.webp" },
  { order: 8, name: "Phòng xông hơi", image: "tien-ich/bf-8.webp" },
  { order: 9, name: "Phòng đa năng", image: "tien-ich/bf-9.webp" },
  { order: 10, name: "Khu BBQ", image: "tien-ich/bf-10.webp" },
  { order: 11, name: "Khu tập thể dục ngoài trời", image: "tien-ich/bf-11.webp" },
  { order: 12, name: "Khu vui chơi trẻ em", image: "tien-ich/bf-12.webp" },
];

export const location = {
  title: "SÔI ĐỘNG",
  subtitle: "KẾT NỐI",
  description:
    "Khu đô thị Nam Rạch Chiếc, đường Song Hành, cao tốc TP. HCM – Long Thành – Dầu Giây, phường Bình Trưng, TP. Hồ Chí Minh.",
  mapLayers: [
    "vi-tri/map_water.svg",
    "vi-tri/map_road.svg",
    "vi-tri/map_text.svg",
    "vi-tri/map_icons.svg",
  ],
  milestones: [
    { time: "15 Phút", place: "Chợ Bến Thành", icon: "vi-tri/market.svg" },
    { time: "30 Phút", place: "Sân bay Long Thành & Đồng Nai", icon: "vi-tri/plane_o.svg" },
    { time: "60 Phút", place: "Vũng Tàu", icon: "vi-tri/beach.svg" },
  ],
  caption:
    "Sơ đồ vị trí mang tính minh họa. Khoảng cách và thời gian di chuyển phụ thuộc lộ trình, giao thông thực tế.",
};

export const progress: ProgressMilestone[] = [
  {
    label: "Tháng 6 - 2026",
    description:
      "Tính đến cuối tháng 6/2026, dự án đã hoàn thành hơn 90% khối lượng xây thô. Các dãy nhà phố vườn, nhà phố thương mại và biệt thự song lập đang được đẩy nhanh xây tô hoàn thiện mặt ngoài, lắp đặt hệ cửa kính và từng bước hoàn chỉnh diện mạo kiến trúc. Trong Quý 3/2026, các tuyến đường nội khu sẽ được trải nhựa và bó vỉa hè, đồng thời triển khai đồng bộ các tiện ích cảnh quan trước khi chính thức bàn giao nhà từ Quý 4/2026.",
    images: [1, 2, 3, 4].map((i) => `tien-do/process_T6.2026_${i}.webp`),
  },
  {
    label: "Tháng 12 - 2025",
    description:
      "Senturia An Phú đã hoàn thành lễ cất nóc vào ngày 29/12/2025, đánh dấu cột mốc quan trọng trong quá trình thi công dự án. Các hạng mục tiếp tục được triển khai đồng bộ.",
    images: [6, 7, 8].map((i) => `tien-do/process${i}.webp`),
  },
  {
    label: "Tháng 6 - 2025",
    description:
      "Hoàn thành phần thô tầng trệt và tầng lửng cho các block đầu tiên. Hệ thống kết cấu thép và bê-tông cốt thép đạt tiến độ 60%.",
    images: [4, 5, 6].map((i) => `tien-do/process${i}.webp`),
  },
  {
    label: "Tháng 12 - 2024",
    description:
      "Khởi công đào móng và ép cọc toàn bộ khu vực dự án. Hệ tầng kỹ thuật bắt đầu được triển khai đồng bộ với hệ thống cấp thoát nước và điện ngầm.",
    images: [1, 2, 3].map((i) => `tien-do/process${i}.webp`),
  },
];

export const legal: LegalItem[] = [
  {
    title: "Chấp thuận chủ trương đầu tư",
    content: "Quyết định số 7348/QĐ-UBND, ngày 27/05/2025.",
  },
  {
    title: "Giao đất và quy hoạch chi tiết 1/500",
    content:
      "Giao đất: 5452/QĐ-UBND, ngày 13/10/2017. Quy hoạch chi tiết 1/500: 895/QĐ-UBND, ngày 17/04/2018.",
  },
  {
    title: "Thẩm định thiết kế và báo cáo khả thi",
    content:
      "Thiết kế cơ sở hạ tầng kỹ thuật: 324/HĐXD-QLDA, ngày 15/06/2018. Thiết kế cơ sở dự án: 487/HĐXD-QLDA, ngày 28/08/2018. Thẩm định báo cáo nghiên cứu khả thi điều chỉnh: 16157/SXD-QL-XDCT, ngày 17/11/2025.",
  },
  { title: "Giấy phép xây dựng", content: "Số 05/GPXD, ngày 08/08/2025." },
  {
    title: "Nghiệm thu giai đoạn xây dựng",
    content: "Biên bản số SAP.502_HDC_HTKT GĐ1_RI 001, ngày 06/11/2025.",
  },
  { title: "Thông báo đủ điều kiện mua bán", content: "Số 13775/SXD-PTĐT, ngày 23/04/2026." },
  {
    title: "Bảo lãnh và thông tin bảo đảm",
    content:
      "Cam kết cấp bảo lãnh của OCB số 1519/2025/TB-OCB, ngày 06/11/2025. Trang nguồn công bố quyền tài sản phát sinh từ dự án đang được bảo đảm tại OCB; ngân hàng đồng ý giải chấp từng sản phẩm khi ký hợp đồng mua bán.",
  },
];

export const partnersSection = {
  title: "ĐỒNG HÀNH KIẾN TẠO",
  description:
    "Senturia An Phú được phát triển bởi Công ty BĐS Nguyên Phương - thành viên Công ty CP BĐS Tiến Phước với gần 35 năm kinh nghiệm trong ngành bất động sản.",
};

export const partners: Partner[] = [
  { role: "Chủ đầu tư", name: "Nguyên Phương", logo: "ve-chung-toi/NP.svg" },
  { role: "Nhà phát triển", name: "Tiến Phước", logo: "ve-chung-toi/TP.svg" },
  { role: "Thiết kế kiến trúc", name: "FDAT", logo: "ve-chung-toi/FD.svg" },
  { role: "Thiết kế cảnh quan", name: "ONG & ONG", logo: "ve-chung-toi/OO.svg" },
  { role: "Quản lý vận hành", name: "Savills", logo: "ve-chung-toi/SV.svg" },
  // ⚠️ CT-01: chỉ hiển thị PCA nếu khách hàng xác nhận vai trò "Đơn vị phân phối chính thức".
  { role: "Đơn vị phân phối chính thức", name: "PCA By Open Broker", logo: "doi-tac/pca.webp" },
];

export const leadForm = {
  title: "Đăng ký tư vấn",
  subtitle: "Nhận bảng giá, chính sách bán hàng và lịch tham quan nhà mẫu.",
  submit: "GỬI THÔNG TIN",
  zaloPhoneButton: "Dùng số điện thoại Zalo",
  consentText:
    "Tôi đồng ý để chủ đầu tư/đơn vị phân phối liên hệ tư vấn và xử lý dữ liệu cá nhân theo",
  consentLink: "Chính sách bảo mật",
  successTitle: "Cảm ơn quý khách!",
  successMessage: "Chuyên viên tư vấn sẽ liên hệ với quý khách trong thời gian sớm nhất.",
  errorFallback: "Chưa gửi được thông tin. Quý khách vui lòng thử lại hoặc gọi hotline.",
};
