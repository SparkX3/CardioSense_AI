import './globals.css';

export const metadata = {
  title: 'CardioSense AI | Turning Science Into Medicine',
  description: 'Proactive and preventative cardiovascular clinical intelligence platform powered by machine learning and 13 biomarkers.',
  keywords: 'CardioSense AI, Cardiovascular Risk, Preventative Cardiology, Machine Learning Medicine',
  authors: [{ name: 'CardioSense AI' }],
};

export const viewport = {
  themeColor: '#ECE8E1',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#ECE8E1] text-[#1C3326] antialiased selection:bg-[#1C3326]/15 selection:text-[#1C3326]">
        {children}
      </body>
    </html>
  );
}
