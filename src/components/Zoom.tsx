import { useRef, useState } from "react";
import styled from "styled-components";
// import "./styles.css";
import Image from "next/image";
import ReactZoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  padding: 50px;
  border: 1px solid #00adb7;
  border-radius: 15px;
  width: 300px;
  height:300px;
  :hover {
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.55), 0 14px 18px rgba(0, 0, 0, 0.55);
  }
`;

// const Image : any = styled.img.attrs((props : any) => ({
//   src: props.source
// }))``;

// const Target = styled(Image)`
//   position: absolute;
//   left: ${(props) => props.offset.left}px;
//   top: ${(props) => props.offset.top}px;
//   opacity: ${(props) => props.opacity};
// `;

export default function Zoom({ image }: any) {
  const sourceRef = useRef<any>(null);
  const targetRef = useRef<any>(null);
  const containerRef = useRef<any>(null);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e: any) => {
    const targetRect = targetRef.current.getBoundingClientRect();
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio =
      (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(
      Math.min(e.pageX - sourceRect.left, sourceRect.width),
      0
    );
    const top = Math.max(
      Math.min(e.pageY - sourceRect.top, sourceRect.height),
      0
    );

    setOffset({
      left: left * -xRatio,
      top: top * -yRatio
    });
  };

  return (
    <ReactZoom>
      {/* <Image src={image}
        fill
        sizes='100vw'
        priority
        objectFit='contain'
        objectPosition='center'
        alt={"image"} /> */}

      <Image 
       alt="source" src={image} className="mx-auto" width={420} height={550}/>
    
    </ReactZoom>

  );
}
