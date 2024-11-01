import { LogoIcon } from "./Icons";

export interface FooterProps {
  title: string;
  groups: Array<{
    name: string;
    links: Array<{
      name: string;
      url: string;
    }>;
  }>;
}

export const Footer = ({ title, groups }: FooterProps) => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            {title}
          </a>
        </div>
        {groups.map(({ name, links }) => (
          <div key={name} className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">{name}</h3>
            {links.map(({ name, url }) => (
              <div key={name}>
                <a
                  rel="noreferrer noopener"
                  href={url}
                  className="opacity-60 hover:opacity-100"
                >
                  {name}
                </a>
              </div>
            ))}
          </div>
        ))}
      </section>
    </footer>
  );
};
