import Pricing from "../../components/Faq";
import Features from "../../components/Features";
import Hero from "../../components/Hero";
import Team from "../../components/TeamSection";
import Testimonials from "../../components/Testimonials";

export function sectionRenderer(section: any, index: number) {
console.log(section.blockType)
switch (section.blockType) {
    case "HeroSection":
      return <Hero key={index} data={section} />;
    case "FeatureSection":
      return <Features key={index} data={section} />;
    case "TestimonialSection":
      return <Testimonials key={index} data={section} />;
    case "FaqSection":
      return <Pricing key={index} data={section} />;
    case "TeamSection":
      return <Team key={index} data={section} />;
    // case "CarouselSection":
    //   return <CarouselSec key={index} data={section} />;
    // case "sections.statistics":
    //   return <Statistic key={index} data={section}/>;
    // case "sections.rich-text":
    //   return <PageRichText key={index} data={section} />;
    default:
      return null;
  }
}