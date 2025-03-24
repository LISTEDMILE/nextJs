

export default function({
  children
}: {
  children: React.ReactNode;
}) {
    return (
      <div>
              <div className="p-4 block bg-amber-500">inside signup another layout component above child</div>
        
              {children}
            <div className="p-4 block bg-amber-500"> inside signup another layout component below child</div>
            </div>
  );
}
