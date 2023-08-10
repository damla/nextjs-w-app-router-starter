export const metadata = {
  title: 'Swagger UI',
  description: 'Swagger UI'
};

export default function SwaggerUILayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
