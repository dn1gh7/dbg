interface ContentContainerProps {
  children: React.ReactNode;
  title?: string;
}

export default function ContentContainer({
  children,
  title,
}: ContentContainerProps) {
  return (
    <div className="flex-8 min-w-0">
      <div className="w-full h-45 bg-[url(/AlexanderNevskyCathedral-Sofia.jpg)] bg-no-repeat bg-cover bg-center content-center text-3xl font-medium text-white ">
        <p className="pl-10">{title}</p>
      </div>
      <section className="p-10">{children}</section>
    </div>
  );
}
