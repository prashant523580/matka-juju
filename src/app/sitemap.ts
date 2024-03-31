import { get } from "@/libs/fetch"
import { MetadataRoute } from "next";

export default async function sitemap() :Promise<MetadataRoute.Sitemap> {
  // const baseUrl = 'https://www.chordograph.com'
  // const baseUrl = 'http://localhost:3000'
  // const baseUrl = process.env.NEXT_PUBLIC_API
  const baseUrl : any = process.env.NEXTAUTH_URL

  try{


  // let albumData = await get("album");
  let posts = await get("product");

  // console.log(laptops)

  const postsUrl :MetadataRoute.Sitemap = posts?.map((post: any) => (
    {
      url: `${baseUrl}/product/${post?.slug}`,
      lastModified: post?.updatedAt ? post?.updatedAt : Date.now(),
      priority:0.8
    }
  ))
  // console.log(albumData)
  // const albumUrl :MetadataRoute.Sitemap = albumData.map((album: any) => (
  //   {
  //     url: `${baseUrl}/artists/${album?.artistId?.slug}/album/${album?._id}`,
  //     lastModified: album?.updatedAt ? album?.updatedAt : Date.now(),
  //     priority:0.5
  //   }
  // ))
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1
    },
    {
        url: baseUrl+"/pages/about",
        lastModified: new Date(),
        priority: 1
    },
    {
        url: baseUrl+"/products",
        lastModified: new Date(),
        priority: 1
    },
    ...postsUrl,

    // ...albumUrl
  ]
}catch(error){
  console.log(error)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1
    },
    {
        url: baseUrl+"/products",
        lastModified: new Date(),
        priority: 1
    }
  ]
}
}