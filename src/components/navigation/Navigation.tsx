"use client";
interface NavigationProps {}

export default function Navigation({}: NavigationProps): React.JSX.Element {
  function onClick(section: string) {
    window.location.hash = section;
  }
  return (
    <nav className="w-200 min-h-screen bg-neutral-900 p-4">
      <div className="fixed left-0 top-0 flex h-full w-[200px] flex-col gap-8 p-4">
        <h1>
          Eugen <br /> Moser
        </h1>
        <ul>
          <li className="cursor-pointer" onClick={() => onClick("#about-me")}>
            Über mich
          </li>
          <li className="cursor-pointer" onClick={() => onClick("#skills")}>
            Skills
          </li>
          <li className="cursor-pointer" onClick={() => onClick("#experience")}>
            Erfahrung
          </li>
          <li className="cursor-pointer" onClick={() => onClick("#projects")}>
            Projekte
          </li>
          <li className="cursor-pointer" onClick={() => onClick("#education")}>
            Bildung
          </li>
        </ul>
      </div>
    </nav>
  );
}
