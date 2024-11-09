import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

export interface FAQProps {
  title: string;

  faqs: FAQ[];
}

export const FAQ = ({ title, faqs }: FAQProps) => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">
        <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      <Accordion type="single" collapsible className="AccordionRoot w-full">
        {faqs.map(({ question, answer }, i) => (
          <AccordionItem key={i} value={i.toString()}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>
            <AccordionContent className="max-w-screen-md">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
