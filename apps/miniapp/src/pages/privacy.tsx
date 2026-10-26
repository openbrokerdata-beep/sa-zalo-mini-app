import { Header, Page } from "zmp-ui";

/**
 * Chính sách bảo mật & đồng ý xử lý dữ liệu cá nhân.
 * TODO(LG-01): khách hàng/pháp chế cung cấp nội dung chính thức (Luật BVDLCN 2025 / NĐ 13/2023).
 * Khi đổi nội dung → tăng CONSENT_VERSION trong packages/shared/src/lead.ts.
 */
export function PrivacyPage() {
  return (
    <Page className="bg-white">
      <Header title="Chính sách bảo mật" />
      <article className="px-4 pb-10 pt-4 text-sm leading-relaxed text-ink">
        <p>
          <strong>Dữ liệu thu thập:</strong> họ tên, số điện thoại, email (nếu có), sản phẩm quan
          tâm, lời nhắn và nguồn truy cập (chiến dịch quảng cáo, mã giới thiệu).
        </p>
        <p>
          <strong>Mục đích:</strong> liên hệ tư vấn, gửi thông tin dự án Senturia An Phú, chính sách
          bán hàng và lịch tham quan.
        </p>
        <p>
          <strong>Quyền của bạn:</strong> yêu cầu xem, chỉnh sửa, rút lại sự đồng ý hoặc xoá dữ liệu
          bằng cách liên hệ hotline/email của dự án.
        </p>
        <p className="italic text-ink-muted">
          Nội dung tạm thời — chờ bản chính thức từ chủ đầu tư/đơn vị phân phối.
        </p>
      </article>
    </Page>
  );
}
