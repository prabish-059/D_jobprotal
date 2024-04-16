import Image from "next/image";
import { FadeIn, FadeInStagger } from "./FadeIn";

interface Testimonial {
  id: number;
  text: string;
  authorName: string;
  picture: {
    data: {
      id: string;
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
}

interface TestimonialsProps {
  data: {
    id: string;
    title: string;
    description: string;
    testimonials: Testimonial[];
  };
}

export default function Testimonials({ data }: TestimonialsProps) {
    console.log("***************",data)
  return (
    <h1>Testimonial</h1>
    // <div className="py-24 sm:py-32">
    //   <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //     <FadeIn className="mx-auto max-w-xl text-center">
    //       <h2 className="text-lg font-semibold leading-8 tracking-tight text-orange-400">
    //         {data.title}
    //       </h2>
    //       <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-50 sm:text-4xl">
    //         {data.description}
    //       </p>
    //     </FadeIn>
    //     <FadeInStagger faster className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
    //       <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3 ">
    //         {data.testimonials.map(
    //           (testimonial: Testimonial, index: number) => (
    //             <FadeIn
    //               key={testimonial.id}
    //               className="pt-8 sm:inline-block sm:w-full sm:px-4"
    //             >
    //               <figure className="rounded-2xl bg-gray-50 p-8 text-base leading-6 dark:bg-gray-800">
    //                 <blockquote className="text-gray-900 dark:text-slate-50">
    //                   <p>{`“${testimonial.text}”`}</p>
    //                 </blockquote>
    //                 <figcaption className="mt-6 flex items-center gap-x-4">
    //                   <Image
    //                     className="h-10 w-10 rounded-full bg-gray-50"
    //                     src={testimonial.picture.data.attributes.url}
    //                     alt={
    //                       testimonial.picture.data.attributes.alternativeText ?? "SpeedWings HHuman Resource- Best Recruitment agency for blue collar jobs"
    //                     }
    //                     width={100}
    //                     height={100}
    //                   />

    //                   <div className="font-semibold text-gray-900 dark:text-slate-50">
    //                     {testimonial.authorName}
    //                   </div>
    //                 </figcaption>
    //               </figure>
    //             </FadeIn>
    //           )
    //         )}
    //       </div>
    //     </FadeInStagger>
    //   </div>
    // </div>
  );
}