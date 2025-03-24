

export default function({
  children
}: {
  children: React.ReactNode;
}) {
    return (
      <div>
              <div className=" block bg-amber-500 h-1.5 mb-1.5"></div>
        
              {children}
            <div className=" block bg-amber-500 h-1.5 mt-1.5"></div>
            </div>
  );
}
