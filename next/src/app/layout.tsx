import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import BottomNavigation from '~/components/layouts/BottomNavigation';
import TopBar from '~/components/layouts/TopBar';
import { withAssets } from '~/utils/helper';
import './index.css';

const poppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Dodo',
  description: 'Todo List | Front-end UI Libraries',
  icons: { shortcut: withAssets('logo.png') }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Get default theme without flicker */}
        <script async src={withAssets('scripts/theme.js')}></script>
      </head>

      <body className={poppinsFont.className}>
        <div className="max-w-[375px] mx-auto my-8 overflow-hidden shadow-lg rounded-2xl bg-base-300">
          <TopBar />

          <div className="flex-grow h-[500px] my-4 overflow-auto">{children}</div>

          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
