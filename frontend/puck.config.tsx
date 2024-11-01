import { Statistics } from "@/components/Statistics";
import { type Config } from "@measured/puck";
import { Team, type TeamProps } from "@/components/Team";
import { FAQ, type FAQProps } from "@/components/FAQ";
import { Footer, type FooterProps } from "@/components/Footer";
import Image from "next/image";

type Props = {
  "Sekcja Hero": { title: string; description: string; imageUrl: string };
  "O nas": {
    title: string;
    description: string;
    stats: Array<{
      value: string;
      name: string;
    }>;
    image?: string;
  };
  Zespół: TeamProps;
  FAQ: FAQProps;
  Stopka: FooterProps;
};

export const config: Config<
  Props,
  {
    title: string;
  }
> = {
  root: {
    label: "Strona",
    fields: {
      title: {
        label: "Tytuł strony",
        type: "text",
      },
    },
    defaultProps: {
      title: "KN Solvro",
    },
    render: ({ children, title }) => (
      <div id="root">
        <title>{title}</title>

        {children}
      </div>
    ),
  },
  components: {
    "Sekcja Hero": {
      fields: {
        title: { type: "text", label: "Tytuł" },
        description: { type: "text", label: "Opis" },
        imageUrl: { type: "text", label: "Zdjęcie" },
      },
      defaultProps: {
        title: "KN Solvro",
        description:
          "W Solvro Funkcjonujemy jak dynamiczny software house, ale bez sztywnych garniturów i bez korpo logiki.",
        imageUrl:
          "https://cms.solvro.pl/assets/77c395b4-a97b-4c9b-8307-30a5f3105638?key=cover",
      },
      render: ({ title, description, imageUrl }) => (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
          <div className="text-center lg:text-start space-y-6">
            <main className="text-5xl md:text-6xl font-bold">
              <h1 className="inline">{title}</h1>
            </main>

            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
              {description}
            </p>
          </div>

          <div className="relative h-96 w-full">
            <Image
              fill
              src={imageUrl}
              alt=""
              className="w-full object-cover rounded-lg"
            />
          </div>
        </section>
      ),
    },
    "O nas": {
      fields: {
        title: { type: "text", label: "Tytuł" },
        description: { type: "textarea", label: "Opis" },
        stats: {
          label: "Statystyki",
          getItemSummary: (item) => item.name,
          type: "array",
          defaultItemProps: {
            name: "Członkowie",
            value: "30+",
          },
          arrayFields: {
            name: {
              type: "text",
              label: "Nazwa",
            },
            value: {
              type: "text",
              label: "Statystyka",
            },
          },
        },
      },
      defaultProps: {
        title: "O nas",
        description:
          "Od aplikacji mobilnych przez sztuczną inteligencję do web developmentu - każda dziedzina ma swoje miejsce w naszym programistycznym kole.\n\n Zoptymalizuj swoje umiejętności, ucząc się od najlepszych.",
        stats: [
          {
            name: "Członków",
            value: "50+",
          },
          {
            name: "Projektów",
            value: "5+",
          },
          {
            name: "Wizyt na naszych stronach",
            value: "10k+",
          },
          {
            name: "Satysfakcji",
            value: "100%",
          },
        ],
        image:
          "https://solvro.pwr.edu.pl/nextImageExportOptimizer/toPWr.0fcb6a10-opt-640.WEBP",
      },
      render: ({ title, description, stats, image }) => (
        <section id="about" className="container py-24 sm:py-32">
          <div className="bg-muted/50 border rounded-lg py-12">
            <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
              {image ? (
                <div className="w-[300px] h-full relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */},
                  <img
                    src={image}
                    alt=""
                    className="object-contain rounded-lg"
                  />
                </div>
              ) : null}

              <div className="bg-green-0 flex flex-col justify-between">
                <div className="pb-6">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                      {title}
                    </span>
                  </h2>
                  <p className="whitespace-pre-line text-muted-foreground mt-4">
                    {description}
                  </p>
                </div>

                <Statistics stats={stats} />
              </div>
            </div>
          </div>
        </section>
      ),
    },
    Zespół: {
      fields: {
        title: {
          type: "text",
          label: "Tytuł",
        },
        description: {
          type: "textarea",
          label: "Opis",
        },
        members: {
          label: "Członkowie",
          type: "array",
          getItemSummary: (item) => item.name,
          defaultItemProps: {
            name: "Bartosz Gotowski",
            role: "Frontend Developer",
            description: "Lubię pisać kodzik",
            imageUrl:
              "https://cms.solvro.pl/assets/9d659db2-a12d-400e-9b45-87a89065a415?key=member",
            links: [
              {
                type: "github",
                url: "https://github.com/rei-x",
              },
            ],
          },
          arrayFields: {
            name: {
              type: "text",
              label: "Imię i nazwisko",
            },
            role: {
              type: "text",
              label: "Rola",
            },
            description: {
              type: "textarea",
              label: "Opis",
            },
            imageUrl: {
              type: "text",
              label: "Zdjęcie",
            },
            links: {
              type: "array",
              getItemSummary: (item) =>
                item.type[0].toUpperCase() + item.type.slice(1),
              defaultItemProps: {
                type: "website",
                url: "https://solvro.pwr.edu.pl",
              },
              arrayFields: {
                type: {
                  type: "select",
                  options: [
                    {
                      label: "GitHub",
                      value: "github",
                    },
                    {
                      label: "LinkedIn",
                      value: "linkedin",
                    },
                    {
                      label: "Website",
                      value: "website",
                    },
                  ],
                  label: "Typ",
                },
                url: {
                  type: "text",
                  label: "URL",
                },
              },
            },
          },
        },
      },
      defaultProps: {
        title: "Nasz zespół",
        description:
          "Nasz zespół to nie tylko ludzie - to grupa pasjonatów, która zamienia marzenia w rzeczywistość.",
        members: [],
      },
      render: (props) => <Team {...props} />,
    },
    FAQ: {
      fields: {
        title: {
          type: "text",
          label: "Tytuł",
        },
        faqs: {
          label: "Pytania",
          type: "array",
          getItemSummary: (item) => item.question,
          defaultItemProps: {
            question: "Jak dołączyć do Solvro?",
            answer:
              "To proste! Rekrutacja do koła naukowego Solvro odbywa się na początku każdego semestru. Masz jakieś pytania lub pragniesz zobaczyć jak działamy? Napisz do nas na kn.solvro@pwr.edu.pl",
          },
          arrayFields: {
            question: {
              type: "text",
              label: "Pytanie",
            },
            answer: {
              type: "textarea",
              label: "Odpowiedź",
            },
          },
        },
      },
      defaultProps: {
        title: "FAQ",
        faqs: [
          {
            question: "Jak dołączyć do Solvro?",
            answer:
              "To proste! Rekrutacja do koła naukowego Solvro odbywa się na początku każdego semestru. Masz jakieś pytania lub pragniesz zobaczyć jak działamy? Napisz do nas na kn.solvro@pwr.edu.pl",
          },
          {
            question:
              "Czy muszę mieć doświadczenie w programowaniu, aby dołączyć do Solvro?",
            answer:
              "Dobrze jest mieć podstawy. W Solvro stawiamy na rozwijanie umiejętności, dlatego chętnie przyjmiemy osoby zarówno początkujące, jak i bardziej zaawansowane.",
          },
          {
            question: "Czy mogę proponować własne projekty?",
            answer:
              "Oczywiście! Każdy członek naszego koła może zaproponować nowy projekt. Po odpowiednim uzasadnieniu, przygotowaniu dokumentacji projektowej oraz wybraniu zespołu czas START.",
          },
        ],
      },
      render: (props) => <FAQ {...props} />,
    },
    Stopka: {
      fields: {
        title: {
          type: "text",
          label: "Tytuł",
        },
        groups: {
          label: "Grupy",
          type: "array",
          getItemSummary: (item) => item.name,
          defaultItemProps: {
            name: "Sociale",
            links: [
              {
                name: "Facebook",
                url: "https://www.facebook.com/",
              },
            ],
          },
          arrayFields: {
            name: {
              type: "text",
              label: "Nazwa",
            },
            links: {
              type: "array",
              getItemSummary: (item) => item.name,
              defaultItemProps: {
                name: "Facebook",
                url: "https://www.facebook.com/",
              },
              arrayFields: {
                name: {
                  type: "text",
                  label: "Nazwa",
                },
                url: {
                  type: "text",
                  label: "URL",
                },
              },
            },
          },
        },
      },
      defaultProps: {
        title: "KN Solvro",
        groups: [
          {
            name: "Sociale",
            links: [
              {
                name: "Facebook",
                url: "https://www.facebook.com/",
              },
              {
                name: "Instagram",
                url: "https://www.instagram.com/",
              },
              {
                name: "LinkedIn",
                url: "https://www.linkedin.com/",
              },
            ],
          },
          {
            name: "Kontakt",
            links: [
              {
                name: "Mail",
                url: "mailto:kn.solvro@pwr.edu.pl",
              },
              {
                name: "Strona",
                url: "https://solvro.pwr.edu.pl",
              },
            ],
          },
        ],
      },
      render: (props) => <Footer {...props} />,
    },
  },
};

export default config;
