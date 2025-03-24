

export default function({
  children
}: {
  children: React.ReactNode;
}) {
    return (
      <div>
        <div className="p-4 block bg-amber-500">inside (goo) another layout component above child
          <p> in this you see we have saved these goo1 and goo2 inside (goo) folder but in router we can access by only writing goo1 instead of (goo)/goo1 as () ke andar nam matlab route me use ignore karna h seedha inside folders me chle jao</p>
              </div>
        
              {children}
            <div className="p-4 block bg-amber-500"> inside (goo) another layout component below child</div>
            </div>
  );
}
