"use client";
interface NavigationProps {}

export default function Navigation({}: NavigationProps): React.JSX.Element {
  const onClickAboutMe = () => {
    window.location.hash = "#about-me";
  };
  return (
    <nav className="w-200 min-h-screen bg-neutral-900 p-4">
      <div className="fixed left-0 top-0 flex h-full w-[200px] flex-col gap-8 p-4">
        <h1>
          Eugen <br /> Moser
        </h1>
        <ul>
          <li className="cursor-pointer" onClick={onClickAboutMe}>
            Über mich
          </li>
          <li>Bildung</li>
          <li>Zertifikate</li>
          <li>Projekte</li>
        </ul>
      </div>
    </nav>
  );
}
