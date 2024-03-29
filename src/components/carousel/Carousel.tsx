"use client"
import React from "react"
import { useSwipeable } from "react-swipeable";
import styles from  "./Carousel.module.scss";
interface Props {
    children: React.ReactNode
}
export const CarouselItem = ({ children, width }: any) => {
    return (
      
        <div className={styles.slide} style={{ width: width }}>
            {children}
        </div>
      
    )
}

const Carousel: React.FC<Props> = ({ children }) => {
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const [pause, setPause] = React.useState<boolean>(false);
    const updateActive = (currentActive: number) => {
        if (currentActive < 0) {
            currentActive = React.Children.count(children) - 1;
        } else if (currentActive >= React.Children.count(children)) {
            currentActive = 0;
        }
        setActiveIndex(currentActive);
    }
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!pause) {

                updateActive(activeIndex + 1)
            }
        }, 5000);
        return () => {
            if (interval) {
                clearInterval(interval)

            }
        }
    });
    const handlers = useSwipeable({
        onSwipedRight: () => updateActive(activeIndex - 1),
        onSwipedLeft: () => updateActive(activeIndex + 1)
    })
    return (
        <>
            <div className={styles.carousel_container}>

                <div className={styles.carousel}
                    {...handlers}
                    onMouseEnter={() => setPause(true)}
                    onMouseLeave={() => setPause(false)}
                >

                    <div className={styles.inner} style={{
                        transform: `translateX(-${activeIndex * 100}%)`,
                        //  width: (React.Children.count(children) - 1) * 100 + "" 
                    }}>
                        {
                            React.Children.map(children, (child: any, index) => {
                                return React.cloneElement(child, { width: "100%" });
                            })
                        }
                    </div>
                    <div className={styles.button_group}>
                        <button onClick={() => {
                            updateActive(activeIndex - 1)
                        }}>&#8249;</button>


                        <button
                            onClick={() => {
                                updateActive(activeIndex + 1)
                            }}
                        >&#8250;</button>

                    </div>
                    <div className={styles.paginate_nav}>

                        {
                            React.Children.map(children, (child, index) => {
                                return (
                                    <button
                                        className={`${activeIndex === index ? styles.active : ""}`}
                                        onClick={() => {
                                            updateActive(index)
                                        }}>
                                        {/* {child} */}
                                        <span></span>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel;