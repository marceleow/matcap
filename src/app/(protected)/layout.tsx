import Header from "#/components/header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-dvh w-full">
      <Header />
      {children}
    </div>
  );
}
