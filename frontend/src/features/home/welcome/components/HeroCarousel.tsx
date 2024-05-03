import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import HeroImg from '/public/images/Hero.png';
import Image from "next/image";


export default function ImageCarousel() {
    return (
        <Carousel autoPlay infiniteLoop>
            <div>
                <Image src={HeroImg} alt="Image 1" />
            </div>
            <div>
                <Image src={HeroImg} alt="Image 2" />
            </div>
            <div>
                <Image src={HeroImg} alt="Image 3" />
            </div>
        </Carousel>
    );
}