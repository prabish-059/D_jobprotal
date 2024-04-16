import Link from "next/link";
import Image from "next/image";

import { renderButtonStyle } from "../utils/render-button-style";
import { FadeIn } from "./FadeIn";
// import { FadeIn, FadeInStagger } from "./FadeIn";

interface Button {
  id: string;
  link: string;
  text: string;
  type: string;
  newTab: boolean;
}

// interface Picture {
//   data: {
//     id: string;
//     attributes: {
//       file: string;
//       name: string;
//       alternativeText: string;
//     };
//   };
// }

interface Picture {
  id: string;
  title: string;
  file: string;
  width: number;
  height: number;
}

interface HeroProps {
  data: {
    id: string;
    heading: string;
    title: string;
    description: string;
    image: Picture;
    button: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  // const imgUrl = data.picture.data.attributes.url;
  // const alternativeText = data.picture.data.attributes.alternativeText;
  console.log("Hello++++++++++++++++++++++++++++",data.heading)
  return(
    <div className="relative isolate overflow-hidden pt-14">
      <Image
        src={data.image.file}
        alt={
          data.image.title ??
          "SpeedWings HHuman Resource- Best Recruitment agency for blue collar jobs"
        }
        className="absolute inset-0 -z-10 h-full w-full object-cover "
        width={data.image.width}
        height={data.image.height}
        priority
      />
      {data.heading.length>1 && (
        <div
          className="absolute inset-x-0 top-10 -z-10 transform-gpu overflow-hidden sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative right-[calc(10%)] aspect-[1000/1090] opacity-80 bg-gradient-to-r from-black via-gray-600 to-transparent" />
        </div>
      )}
      
        <div className="mx-baseline max-w-3xl py-42 ml-2 sm:py-48 lg:py-56 lg:ml-40">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          {/* {data.title.length>1 && ( */}
          <FadeIn>
            <div className="text-center">
              <h1 className="text-3xl font-bold leading-8 tracking-wide text-left lg:text-5xl">
                {data.heading}
              </h1>
              <p className="mt-6 text-lg text-left leading-8 text-slate-50 lg:text-3xl">
                {data.description}
              </p>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                  {/* <Link
                    key={data.button.id}
                    href={`/${data.button.url}`}
                    target={data.button.newTab ? "_blank" : "_self"}
                    className={renderButtonStyle(data.button.__typename)}
                  >
                    {data.button.text}
                  </Link> */}

              </div>
            </div>
          </FadeIn>
                {/* // )} */}
        </div>

    </div>
  )
}