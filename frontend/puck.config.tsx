import type { Config } from "@measured/puck";

type Props = {
  HeadingBlock: { title: string };
};

export const config: Config<Props> = {
  root: {
    label: "Hello jello",
    fields: {
      seo: {
        type: "text",
      },
    },
  },
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      ),
    },
  },
};

export default config;
