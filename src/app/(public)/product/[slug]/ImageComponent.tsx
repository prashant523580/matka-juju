"use client"
import Image from 'next/image'
import React from 'react'
import { useSwipeable } from 'react-swipeable';
import Zoom from '@/components/Zoom'
function ImageComponet({ images, title}: { images: any[], title: string}) {
    const [currentImg, setCurrentImg] = React.useState(images[0].src);
    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    const handlers = useSwipeable({
        onSwipedRight: () => updateActive(activeIndex - 1),
        onSwipedLeft: () => updateActive(activeIndex + 1)
    })

    function updateActive(currentActive: number) {
        if (currentActive < 0) {
            currentActive = images.length - 1;
        } else if (currentActive >= images.length) {
            currentActive = 0;
        }
        setActiveIndex(currentActive);

    }
    return (
        <div>
            
            <div {...handlers} 
            // className={`relative rounded-md ${productType === "laptop" ? " w-10/12 h-[23vh] sm:w-10/12 sm:h-[35vh] mx-auto md:w-8/12 md:h-[40vh] lg:w-7/12  lg:h-[50vh] " : "  w-8/12 h-[25vh] sm:w-5/12 sm:h-[40vh] mx-auto md:w-5/12 md:h-[40vh] lg:w-4/12  lg:h-[50vh] "}`}
            className='relative mx-auto'
            >
            <Zoom image={images[activeIndex].src}/>

                {/* <Image src={images[activeIndex].src}
                    fill
                    sizes='100vw'
                    priority
                    objectFit='contain'
                    objectPosition='center'
                    alt={title} /> */}
                    <div className="absolute bottom-5 right-5 drop-shadow-2xl shadow-white">{activeIndex+1}/{images.length}</div>
                    {/* </Zoom> */}
            </div>
            <div className="flex justify-center space-x-2 my-2">

                {
                    images.map((img: any,ind :number) => {
                        return (

                            <figure key={ind}
                                onClick={() => setActiveIndex(ind)}
                                // className={`relative rounded-md ${ productType === "laptop" ? " w-10/12 h-[23vh] sm:w-8/12 sm:h-[35vh] mx-auto md:w-8/12 md:h-[40vh] lg:w-7/12  lg:h-[50vh] " : "  w-8/12 h-[25vh] sm:w-5/12 sm:h-[40vh] mx-auto md:w-5/12 md:h-[40vh] lg:w-4/12  lg:h-[50vh] "}`}
                                className='relative w-10 h-10 md:w-20 md:h-20 cursor-pointer'
                            >
                                <Image src={img.src}
                                    fill
                                    sizes='100vw'
                                    priority
                                    objectFit='contain'
                                    objectPosition='center'
                                    alt={title} />
                                {/* <figcaption>Digital art by Anonymous</figcaption> */}
                            </figure>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ImageComponet