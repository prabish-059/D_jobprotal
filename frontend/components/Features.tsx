import Link from "next/link";
import Image from "next/image";
import { FadeIn, FadeInStagger } from "./FadeIn";

interface FeaturesProps {
  data: {
    id: number;
    heading: string;
    description: string;
    feature: Feature[];
  };
}

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
  media: Picture;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      caption: string;
      alternativeText: string;
    };
  };
}

export default function Features({ data }: FeaturesProps) {
  console.log("------------------------------------",data)
  return (
    // <div className="dark:bg-gray-900 py-24 sm:py-32">
    //   <div className="rounded-2xl dark:bg-gray-900 p-8 text-sm leading-6 mx-auto max-w-7xl px-6 lg:px-8 flex items-center">
    //     <div className="mx-auto grid content-center max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
    //       <div className="flex justify-center h-full">
    //         <h2 className="font-bold tracking-normal sm:text-4xl my-auto">
    //           {data.heading}
    //         </h2>
    //       </div>

    //       {/* <p>{data.description}< /p> */}

    //       <dl className="col-span-2  grid grid-cols-1 gap-x-16 gap-y-16 sm:grid-cols-2">
    //         {data.feature.map((feature: Feature) => (
    //           <FadeIn
    //             key={feature.id}
    //             className="rounded-2xl p-4 bg-gray-100 dark:bg-gray-800"
    //           >
    //             <dt className="text-base font-semibold leading-7 dark:text-slate-50 ">
    //               <div className="mb-4 flex h-50 w-50 items-center justify-center">
    //                 <Image
    //                   src={feature.media.data.attributes.url}
    //                   alt={
    //                     feature.media.data.attributes.alternativeText ??
    //                     "Speed Wings Human Resource"
    //                   }
    //                   width={130}
    //                   height={130}
    //                   className="h-100 w-100"
    //                 />
    //               </div>
    //               {feature.title}
    //             </dt>
    //             <dd className="mt-1 text-base text-justify leading-7 dark:text-gray-400">
    //               {feature.description}
    //             </dd>
    //             {feature.showLink && feature.url && feature.text && (
    //               <p className="mt-6">
    //                 <Link href={`/${feature.url}`}
    //                   className="text-sm font-semibold leading-6 text-blue-400"
    //                 >
    //                   {feature.text} <span aria-hidden="true">→</span>
    //                 </Link>
    //               </p>
    //             )}
    //           </FadeIn>
    //         ))}
    //       </dl>
    //     </div>
    //   </div>
    // </div>
    <h1>Feature</h1>
  );
}