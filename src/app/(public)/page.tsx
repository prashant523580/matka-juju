import { rubikvinyl, fugazone } from '@/components/Fonts';
import Carousel, { CarouselItem } from '@/components/carousel/Carousel'
import ProductCard from '@/components/ui/Card/ProductCard';
import ImageMagnify from '@/components/ui/image/ImageMagnify';
import { calculateDiscountedPrice } from '@/libs/calculator';
import { get } from '@/libs/fetch'
import Image from 'next/image'
import Link from 'next/link';

const showcase = [
  {
    title:"Original Flavor:",
    description: "Classic Juju Dhau with its signature creamy texture and mild sweetness.",
    image: "/images/matka.jpeg"
  },
  {
    title:"Mango Infusion",
    description: "Juju Dhau infused with the refreshing flavor of ripe mangoes.",
    image: "/icons/android-chrome-512x512.png"
  },
  // {
  //   title:"Chocolate Swirl",
  //   description: " Indulgent Juju Dhau with a rich chocolate swirl for chocolate lovers.",
  //   image: "/images/matka.jpeg"
  // },
]
export default async function Home() {
  let categoryData = await get("category");
  let productData = await get("product");
  const [category, products] = await Promise.all([categoryData, productData]);
  return (
    <>
      {/* <ImageMagnify/> */}
      <div className="py-2 md:p-4">

      <div className="  rounded-lg overflow-hidden">

        <Carousel>
          <CarouselItem>
            {/* <div className="h-[50vh] relative"> */}

            <Image fill sizes='100vw' className='w-full h-full ' alt='Matka juju banner' src="/images/banner/matkajuju.png" />
            {/* </div> */}
          </CarouselItem>
        
          <CarouselItem>
            {/* <div className="h-[50vh] relative"> */}

            <Image fill sizes='100vw' className='w-full h-full ' alt='Matka juju banner' src="/logo.png" />
            {/* </div> */}
          </CarouselItem>
        </Carousel>
      </div>
</div>
      <main className="  mx-auto max-w-screen-xl border-t pt-8">
        <div className="about md:px-16 px-4 pt-8">
          <h2 className='text-3xl md:text-4xl text-center py-2 font-bold mb-8 text-yellow-600 uppercase'>Juju Dhau: A Traditional Delight</h2>
          <p className=''>

            Juju Dhau, also known as &apos;&apos;King Curd,&apos;&apos; is a traditional Nepalese dessert that originated in the ancient city of Bhaktapur. This creamy and indulgent delicacy holds deep cultural significance and is often enjoyed during festivals, celebrations, and special occasions in Nepal.</p>
        </div>
        <div className="categories text-center py-8 md:py-12 lg:py-16">
          <div className="mb-6">

            <h1 className={' text-center font-bold text-3xl md:text-4xl md:mb-2 text-yellow-600'}>MATKA JUJU DHAU</h1>
            <p className={fugazone.className + " text-lg" }>Showcase</p>
          </div>
          <div className="category grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4   md:px-8 ">
            {showcase.map((cate: any, ind: number) => (
              <div className='cursor-pointer hover:underline  bg-white relative overflow-hidden   ' key={ind}>
                <Image src={"/images/matkajuju.png"} alt={cate.title}
                  width={650} height={400}
                // fill
                // sizes='100vw'
                className='object-cover'
                />
                {/* <span className='uppercase text-lg lg:text-xl   left-0 right-0 bottom-0 top-0 bg-black bg-opacity-40 text-white'>{cate.title}</span> */}
              </div>
            ))}
          </div>
        </div>
       
          <div className=" px-8 py-6 sm:py-8 lg:py-12">

            <div className="mx-auto  px-4 md:px-8">
              {/* <!-- text - start --> */}
              <div className="mb-10 md:mb-16">
                <h2 className={ " mb-4 text-center text-3xl md:text-4xl font-bold text-yellow-600 md:mb-6 lg:text-3xl"}>What We Offer</h2>

                <p className="mx-auto max-w-screen-md text-center text-gray-600 md:text-lg">At <strong>Matka Juju</strong>, we take pride in offering a wide range of Juju Dhau flavors and sizes to suit every palate and occasion. Our products are crafted using high-quality, locally sourced ingredients, ensuring freshness and authenticity in every bite. Whether you&apos;re looking for a special treat for yourself or a unique gift for a loved one, we have customizable gift packs and subscription options available. Enjoy fast and reliable shipping to various locations, allowing you to savor the goodness of Juju Dhau wherever you are.</p>
              </div>
              {/* <!-- text - end --> */}

              {/* <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 ">
        
          </div> */}
            </div>
          </div>

        <div className=' bg-white grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 px-2  mx-auto gap-4  text-center'>
          {
            products.map((product : any) => (
              <ProductCard product={product} key={product?._id} />
            ))
          }
        </div>
      </main>
    </>

  )
}
