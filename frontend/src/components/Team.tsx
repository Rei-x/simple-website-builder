import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Facebook, Instagram, Linkedin } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <h2 className="text-3xl font-bold md:text-4xl">
        <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      <p className="mb-10 mt-4 text-muted-foreground">{description}</p>

      <div className="grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {members.map(({ imageUrl, name, role, description, links }, i) => (
          <Card
            key={name + i}
            className="relative mt-8 flex flex-col items-center justify-center bg-muted/50"
          >
            <CardHeader className="mt-8 flex items-center justify-center pb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={`${name} ${role}`}
                className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover"
              />
              <CardTitle className="text-center">{name}</CardTitle>
              <CardDescription className="text-primary">{role}</CardDescription>
            </CardHeader>

            <CardContent className="pb-2 text-center">
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
