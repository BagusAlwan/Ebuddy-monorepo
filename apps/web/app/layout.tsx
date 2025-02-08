import { ReactNode } from 'react';
import AuthWrapper from '@/components/AuthWrapper';
import Providers from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthWrapper>
          <Providers>
            {children}
          </Providers>
        </AuthWrapper>
      </body>
    </html>
  );
}