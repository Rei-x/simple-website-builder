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
      <hr className="mx-auto w-11/12" />

      <section className="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 md:grid-cols-4 xl:grid-cols-6">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="flex text-xl font-bold"
          >
            {title}
          </a>
        </div>
        {groups.map(({ name, links }, i) => (
          <div key={name + links.toString()} className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{name}</h3>
            {links.map(({ name, url }) => (
              <div key={url}>
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
