import { Route } from "react-router-dom";
import { AnimationRoutes, SnackbarProvider, App as ZApp, ZMPRouter } from "zmp-ui";
import { LeadSheetProvider } from "./components/lead-sheet";
import { HomePage } from "./pages/home";
import { PrivacyPage } from "./pages/privacy";
import { ProductPage } from "./pages/product";
import { RegisterPage } from "./pages/register";
import { SuccessPage } from "./pages/success";

/**
 * Bản đồ route — mọi màn hình phải khai báo ở đây.
 *  /                 Landing (các section)
 *  /register         Form đăng ký full-screen (deep link từ OA / QR: ?entry=qr_event)
 *  /success          Cảm ơn sau khi gửi lead
 *  /product/:id      Chi tiết + gallery 1 dòng sản phẩm
 *  /privacy          Chính sách bảo mật / điều khoản xử lý dữ liệu cá nhân
 */
export function App() {
  return (
    <ZApp theme="light">
      <SnackbarProvider>
        <ZMPRouter>
          <LeadSheetProvider>
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </AnimationRoutes>
          </LeadSheetProvider>
        </ZMPRouter>
      </SnackbarProvider>
    </ZApp>
  );
}
