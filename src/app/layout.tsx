import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { ViewModeProvider } from '@/context/ViewModeContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://modeltier.notlimitedteam.cloud'),
  title: 'ModelTier • Bảng Xếp Hạng & Theo Dõi AI Dễ Hiểu Cho Người Việt',
  description: 'Nền tảng theo dõi, so sánh và chọn mô hình AI trực quan nhất. Đơn giản hóa các chỉ số benchmark, quy đổi chi phí ra VNĐ và đánh giá độ nhuyễn tiếng Việt bản xứ.',
  keywords: [
    'AI Model Tier List',
    'Bảng xếp hạng AI',
    'So sánh ChatGPT Claude Gemini DeepSeek',
    'Giá API AI tính bằng VND',
    'Artificial Analysis tiếng Việt',
    'AI cho người Việt',
    'DeepSeek R1',
    'Claude 3.7 Sonnet',
    'GPT-4o'
  ],
  authors: [{ name: 'ModelTier Team' }],
  icons: {
    icon: '/favicon.ico',
  },
  alternates: {
    canonical: 'https://modeltier.notlimitedteam.cloud',
  },
  openGraph: {
    title: 'ModelTier • Bảng Xếp Hạng & Theo Dõi AI Dễ Hiểu',
    description: 'Đơn giản hóa benchmark AI thế giới: Xếp hạng Tier S/A/B/C, tính tiền bằng VNĐ, giải thích bằng tiếng người thường.',
    url: 'https://modeltier.notlimitedteam.cloud',
    siteName: 'ModelTier',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#170C07] text-[#FFF6EE] antialiased selection:bg-[#FF6B35] selection:text-white font-sans">
        <LanguageProvider>
          <CurrencyProvider>
            <ViewModeProvider>
              {children}
            </ViewModeProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
