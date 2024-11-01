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
    <section id="faq" className="container  py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {title}
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
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
