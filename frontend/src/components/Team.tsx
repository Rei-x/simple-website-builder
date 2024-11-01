import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface SociaNetworkslProps {
  name: string;
  url: string;
}

// const teamList: TeamProps[] = [
//   {
//     imageUrl: "https://i.pravatar.cc/150?img=35",
//     name: "Emma Smith",
//     position: "Product Manager",
//     socialNetworks: [
//       {
//         name: "Linkedin",
//         url: "https://www.linkedin.com/in/leopoldo-miranda/",
//       },
//       {
//         name: "Facebook",
//         url: "https://www.facebook.com/",
//       },
//       {
//         name: "Instagram",
//         url: "https://www.instagram.com/",
//       },
//     ],
//   },
//   {
//     imageUrl: "https://i.pravatar.cc/150?img=60",
//     name: "John Doe",
//     position: "Tech Lead",
//     socialNetworks: [
//       {
//         name: "Linkedin",
//         url: "https://www.linkedin.com/in/leopoldo-miranda/",
//       },
//       {
//         name: "Facebook",
//         url: "https://www.facebook.com/",
//       },
//       {
//         name: "Instagram",
//         url: "https://www.instagram.com/",
//       },
//     ],
//   },
//   {
//     imageUrl: "https://i.pravatar.cc/150?img=36",
//     name: "Ashley Ross",
//     position: "Frontend Developer",
//     socialNetworks: [
//       {
//         name: "Linkedin",
//         url: "https://www.linkedin.com/in/leopoldo-miranda/",
//       },

//       {
//         name: "Instagram",
//         url: "https://www.instagram.com/",
//       },
//     ],
//   },
//   {
//     imageUrl: "https://i.pravatar.cc/150?img=17",
//     name: "Bruce Rogers",
//     position: "Backend Developer",
//     socialNetworks: [
//       {
//         name: "Linkedin",
//         url: "https://www.linkedin.com/in/leopoldo-miranda/",
//       },
//       {
//         name: "Facebook",
//         url: "https://www.facebook.com/",
//       },
//     ],
//   },
// ];

type LinkType = "github" | "linkedin" | "website";
export interface TeamProps {
  title: string;
  description: string;
  members: Array<{
    name: string;
    role: string;
    description: string;
    imageUrl: string;
    links: Array<{
      type: LinkType;
      url: string;
    }>;
  }>;
}

export const Team = ({ title, description, members }: TeamProps) => {
  const socialIcon = (iconName: LinkType) => {
    switch (iconName) {
      case "linkedin":
        return <LinkedInLogoIcon />;

      case "github":
        return <GitHubLogoIcon />;

      case "website":
        return <ExternalLinkIcon />;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {title}
        </span>
      </h2>

      <p className="mt-4 mb-10 text-muted-foreground">{description}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {members.map(({ imageUrl, name, role, description, links }, i) => (
          <Card
            key={name + i}
            className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
          >
            <CardHeader className="mt-8 flex justify-center items-center pb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={`${name} ${role}`}
                className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
              />
              <CardTitle className="text-center">{name}</CardTitle>
              <CardDescription className="text-primary">{role}</CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-2">
              <p>{description}</p>
            </CardContent>

            <CardFooter>
              {links.map(({ type, url }) => (
                <div key={url}>
                  <a
                    rel="noreferrer noopener"
                    href={url}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <span className="sr-only">{name} icon</span>
                    {socialIcon(type)}
                  </a>
                </div>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
