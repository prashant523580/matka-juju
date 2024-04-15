import CustomizedAccordions from '@/components/Accordion';
import { rubikvinyl, fugazone } from '@/components/Fonts';
import Carousel, { CarouselItem } from '@/components/carousel/Carousel'
import ProductCard from '@/components/ui/Card/ProductCard';
import { Heading, Paragraph, Section, SectionHeading } from '@/components/ui/Element';
import { site } from '@/constent';
// import ImageMagnify from '@/components/ui/image/ImageMagnify';
// import { calculateDiscountedPrice } from '@/libs/calculator';
import { get } from '@/libs/fetch'
import Image from 'next/image'
// import Link from 'next/link';


export default async function Home() {
  let categoryData = await get("category");
  let productData = await get("product");
  const [category, products] = await Promise.all([categoryData, productData]);
  return (
    <>
      {/* <ImageMagnify/> */}
      <div className="pt-2 md:pt-2  p-1">

        <div className="  rounded-2xl overflow-hidden">

          <Carousel>
            {
              site.banners.map((image, ind) => (

                <CarouselItem key={ind}>
                  <div
                    className="h-[200px] sm:h-[350px] md:h-[520px] w-full relative"
                  >
                    {/* <Image 
            width={1800}
            height={400}
            className='' alt='Matka juju banner' src="/images/banner/matkajuju.jpg" /> */}

                    <Image
                      fill sizes="(max-width: 768px) 100vw, 33vw"
                      className=' object-center object-fill'
                      //  width={1200}
                      //  height={300}
                      alt='Matka juju banner'
                      // src={showcase[0].image}
                      src={image}
                      loading='eager'
                    />
                  </div>
                </CarouselItem>
              ))
            }


          </Carousel>
        </div>
      </div>
      <main className=" px-2 space-y-8  mx-auto max-w-screen-xl pt-1">
        <Section className=''>
          <SectionHeading className='text-3xl md:text-4xl text-center mb-4 md:mb-8  uppercase'>Juju Dhau: A Traditional Delight</SectionHeading>
          <Paragraph className='text-center'>

            Juju Dhau, also known as &apos;&apos;King Curd,&apos;&apos; is a traditional Nepalese dessert that originated in the ancient city of Bhaktapur. This creamy and indulgent delicacy holds deep cultural significance and is often enjoyed during festivals, celebrations, and special occasions in Nepal.</Paragraph>
          <div className=' bg-white grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 px-2  mx-auto gap-4  text-center pt-8'>
            {
              products.map((product: any) => (
                <ProductCard product={product} key={product?._id} />
              ))
            }
          </div>
        </Section>
        <Section className="c">
          <div className="mb-6">

            <SectionHeading className={' text-center  md:mb-2 '}>MATKA JUJU DHAU</SectionHeading>
            <Paragraph className={fugazone.className + " text-lg text-center"}>Showcase</Paragraph>
          </div>
          <div className="category grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4   md:px-8 ">
            {site.showcase.map((cate: any, ind: number) => (
              <div className={`cursor-pointer   bg-white relative overflow-hidden  ${ind == 1 ? " row-span-2 col-span-1 " : " "}   `} key={ind}>
                <Image src={cate.image} alt={cate.title}
                  width={700} height={400}
                  // fill
                  // sizes='100vw'
                  className='object-cover rounded-2xl overflow-hidden'
                />
                <div className="flex flex-col">

                  {/* <span className='uppercase text-lg lg:text-xl   left-0 right-0 bottom-0 top-0 '>{cate.title}</span>
                <p>{cate.description}</p> */}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section className=" ">


          <SectionHeading className={" mb-4 md:mb-6 text-center "}>What We Offer</SectionHeading>

          <Paragraph className="mx-auto  text-center">At <strong>Matka Juju</strong>, we take pride in offering a wide range of Juju Dhau flavors and sizes to suit every palate and occasion. Our products are crafted using high-quality, locally sourced ingredients, ensuring freshness and authenticity in every bite. Whether you&apos;re looking for a special treat for yourself or a unique gift for a loved one, we have customizable gift packs and subscription options available. Enjoy fast and reliable shipping to various locations, allowing you to savor the goodness of Juju Dhau wherever you are.</Paragraph>

        </Section>
        <Section className="faq">
          <SectionHeading className='text-center mb-3 md:mb-4'>Frequently Asked questions</SectionHeading>
          <div className="grid grid-cols-1 max-w-screen-md mx-auto  md:grid-cols-1 md:gap-2 mdpx-4 py-4 md:py-6">

            <CustomizedAccordions />
          </div>
        </Section>

      </main>
    </>

  )
}
