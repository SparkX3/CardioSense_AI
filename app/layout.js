import './globals.css';

export const metadata = {
  title: 'CardioSense AI | Predicting Risk Before It Matters',
  description: 'Leveraging artificial intelligence and machine learning to predict cardiovascular risk, facilitate early intervention, and advance preventive healthcare.',
  keywords: 'CardioSense AI, Cardiovascular Risk, Preventative Cardiology, Machine Learning Medicine, Sanchit Shingole, Lokmanya Tilak College of Engineering',
  authors: [{ name: 'Sanchit Shingole' }],
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
