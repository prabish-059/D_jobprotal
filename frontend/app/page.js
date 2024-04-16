// import Image from 'next/image';
// import { headers, draftMode } from 'next/headers';
// import { unstable_cache } from 'next/cache';
// import { cache } from 'react';
// import { notFound, permanentRedirect, redirect } from 'next/navigation';
// import LazyContainers from '../containers/LazyContainers';

// import { Component } from "react"

// import {
//     getPage,
//     getPagePreview,
//     getRedirect,
//     getAllPages,
//     WagtailApiResponseError,
// } from '../api/wagtail';
// import ClientComponent from './clientcomponent';

// const isProd = process.env.NODE_ENV === 'production';

// async function getPreviewPageData({
//     contentType,
//     token,
//     inPreviewPanel,
//     headers = {},
// }) {
//     try {
//         const { json: pagePreviewData } = await getPagePreview(
//             contentType,
//             token,
//             {
//                 in_preview_panel: inPreviewPanel,
//             },
//             {
//                 headers,
//             }
//         );
//         return {
//             props: pagePreviewData,
//         };
//     } catch (err) {
//         if (!(err instanceof WagtailApiResponseError)) {
//             throw err;
//         }

//         if (!isProd && err.response.status >= 500) {
//             const html = await err.response.text();
//             return {
//                 props: {
//                     componentName: 'PureHtmlPage',
//                     componentProps: { html },
//                 },
//             };
//         }

//         throw err;
//     }

//     return { notFound: true };
// }

// async function getPageData({
//     path,
//     searchParams,
//     headers = {},
//     options = null,
// }) {
//     // Try to serve page
//     try {
//         const {
//             json: { componentName, componentProps, redirect, customResponse },
//             headers: responseHeaders,
//         } = await getPage(path, searchParams, {
//             headers,
//             cache: options?.cache,
//             revalidate: options?.revalidate,
//         });

//         let setCookieHeader = null;
//         if (responseHeaders.get('set-cookie')) {
//             setCookieHeader = responseHeaders.get('set-cookie');
//         }

//         if (redirect) {
//             const { destination, isPermanent } = redirect;
//             return {
//                 redirect: {
//                     destination: destination,
//                     permanent: isPermanent,
//                 },
//             };
//         }

//         return {
//             props: { componentName, componentProps },
//             setCookieHeader,
//         };
//     } catch (err) {
//         if (!(err instanceof WagtailApiResponseError)) {
//             throw err;
//         }

//         // When in development, show django error page on error
//         if (!isProd && err.response.status >= 500) {
//             const html = await err.response.text();
//             return {
//                 props: {
//                     componentName: 'PureHtmlPage',
//                     componentProps: { html },
//                 },
//             };
//         }

//         if (err.response.status >= 500) {
//             throw err;
//         }
//     }

//     // Try to serve redirect
//     try {
//         const { json: redirect } = await getRedirect(path, searchParams, {
//             headers,
//         });

//         const { destination, isPermanent } = redirect;
//         return {
//             redirect: {
//                 destination: destination,
//                 permanent: isPermanent,
//             },
//         };
//     } catch (err) {
//         if (!(err instanceof WagtailApiResponseError)) {
//             throw err;
//         }

//         if (err.response.status >= 500) {
//             throw err;
//         }
//     }

//     return { notFound: true };
// }

// export async function generateMetadata({ params, searchParams }, parent) {
//     const headersList = headers();
//     const data = await getPageData({
//         path: params.path,
//         searchParams: {
//             host: headersList.get('host'),
//         },
//         options: {
//             //cache: 'force-cache',
//             revalidate: 900, // 15 minutes
//         },
//     });

//     if (data?.redirect) {
//         return {};
//     }

//     const { seo } = data.props.componentProps;

//     const {
//         seoHtmlTitle,
//         seoMetaDescription,
//         seoOgTitle,
//         seoOgDescription,
//         seoOgUrl,
//         seoOgImage,
//         seoOgType,
//         seoTwitterTitle,
//         seoTwitterDescription,
//         seoTwitterUrl,
//         seoTwitterImage,
//         seoMetaRobots,
//         canonicalLink,
//     } = seo;

//     return {
//         metadataBase: new URL(seoOgUrl),
//         title: seoHtmlTitle,
//         description: seoMetaDescription,
//         openGraph: {
//             title: seoOgTitle,
//             description: seoOgDescription,
//             images: seoOgImage,
//             url: seoOgUrl,
//             type: seoOgType || 'website',
//         },
//         twitter: {
//             title: seoTwitterTitle,
//             description: seoTwitterDescription,
//             images: [seoTwitterImage],
//         },
//         alternates: {
//             canonical: canonicalLink,
//         },
//         robots: {
//             index: seoMetaRobots.index,
//             follow: seoMetaRobots.follow,
//         },
//     };
// }

// export default async function CatchAllPage(props) {
//     const headersList = headers();
//     const { params, searchParams } = props;
//     const { isEnabled: isDraftEnabled } = draftMode();

//     let data = null;
//     if (isDraftEnabled && searchParams.contentType && searchParams.token) {
//         const { contentType, token, inPreviewPanel } = searchParams;
//         data = await getPreviewPageData({
//             contentType,
//             token,
//             inPreviewPanel: inPreviewPanel === 'true',
//             headers: {
//                 cookie: headersList.get('cookie'),
//             },
//         });
//     } else {
//         data = await getPageData({
//             path: params.path,
//             searchParams: {
//                 ...searchParams,
//                 host: headersList.get('host'),
//             },
//             headers: {
//                 cookie: headersList.get('cookie'),
//             },
//         });
//     }

//     if (data?.redirect) {
//         const { destination, permanent } = data.redirect;
//         return permanent
//             ? permanentRedirect(destination)
//             : redirect(destination);
//     }

//     if (data.notFound) {
//         return notFound();
//     }

//     const { componentName, componentProps } = data.props || {};
//     const setCookieHeader = data.setCookieHeader;

//     const Component = LazyContainers[componentName];
//     if (!Component) {
//         return <h1>Component {componentName} not found</h1>;
//     }
//     return (
//         <>
//             {!!setCookieHeader && (
//                 <ClientComponent setCookieHeader={setCookieHeader} />
//             )}
//             <Component {...componentProps} shouldRenderSeo={false} />
//         </>
//     );
// }

"use client"
import { useQuery } from "@tanstack/react-query"
import {request, gql} from "graphql-request"
import LandingPageQuery from "./graphql/queries/LandingPage.gql"
import { sectionRenderer } from "./utils/sectionRenderer"
// import {graphql} from "../src/gql"

// const query = graphql(`${LandingPageQuery}`)

const CatchingAllPage = () => {
    // Use useQuery hook to fetch data
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["landingPageData"], // Provide a unique key for the query
        queryFn: async () => {
            try {
                // Fetch data using graphql-request
                const response = await request(
                    'http://backend-speed.centralindia.cloudapp.azure.com:8000/graphql/',
                    LandingPageQuery
                );
                return response;
            } catch (error) {
                throw new Error("Failed to fetch data");
            }
        },
    });

    // Handle loading and error states
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    console.log(data)
    console.log(LandingPageQuery)

    // Render fetched data
    return (
        data.landingPage.body.map(section=>(
            sectionRenderer(section, section.id)
        ))
    );
};

export default CatchingAllPage;
