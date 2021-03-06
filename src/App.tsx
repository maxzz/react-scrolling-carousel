import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.scss";

//import styled from "https://cdn.skypack.dev/styled-components@5.2.1";

// const H1 = styled.h1`
//   text-align: center;
//   margin: 0;
//   padding-bottom: 10rem;
// `

// const Relative = styled.div`
//   position: relative;
// `
/*
const Flex = styled.div`
  display: flex;
`

// const HorizontalCenter = styled(Flex)`
//   justify-content: center;
//   margin-left: auto;
//   margin-right: auto;

//   max-width: 25rem;
// `

// const Container = styled.div`
//   height: stretch;
//   width: 100%;

//   background: #ecf0f1;
// `

// const Item = styled.div`
//   color: white;
//   font-size: 2rem;
//   text-transform: capitalize;

//   width: ${({ size }) => `${size}rem`};
//   height: ${({ size }) => `${size}rem`};

//   display: flex;

//   align-items: center;
//   justify-content: center;
// `
*/

function Item({ size, children, style = {} }: any) {
    return (
        <div
            className="item"
            style={{ width: `${size}rem`, height: `${size}rem`, ...style }}
        >
            {children}
        </div>
    );
}

function getPrevElement(list: Element[]) {
    const sibling = list[0].previousElementSibling;

    if (sibling instanceof HTMLElement) {
        return sibling;
    }

    return sibling;
}

function getNextElement(list: Element[]) {
    const sibling = list[list.length - 1].nextElementSibling;

    if (sibling instanceof HTMLElement) {
        //console.log('next', sibling);
        
        return sibling;
    }

    return null;
}

function throttle(func: Function, limit: number) {
    let lastFunc: number;
    let lastRan: number;
    return function () {
        const context = null; // this
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function usePosition(ref: React.MutableRefObject<Element | undefined>) {
    const [prevElement, setPrevElement] = React.useState<Element | null>(null);
    const [nextElement, setNextElement] = React.useState<Element | null>(null);

    React.useEffect(() => {
        const element = ref.current;

        if (!element) { return; }

        console.log('------------------------------');
        

        const update = () => {
            const rect = element.getBoundingClientRect();

            const visibleElements = Array.from(element.children).filter((child) => {
                const r = child.getBoundingClientRect();
                return r.left >= rect.left && r.right <= rect.right;
            });

            //console.log('visibleElements', visibleElements);

            if (visibleElements.length > 0) {
                setPrevElement(getPrevElement(visibleElements));
                setNextElement(getNextElement(visibleElements));
                console.log('prev, next', getPrevElement(visibleElements), getNextElement(visibleElements));
            }
        };

        update();

        //element.addEventListener("scroll", update, { passive: true });
        element.addEventListener("scroll", throttle(update, 500), { passive: true });

        return () => {
            element.removeEventListener("scroll", update);
        };
    }, [ref]);

    const scrollToElement = React.useCallback((element) => {
        const currentNode = ref.current;

        if (!currentNode || !element) { return; }

        let newScrollPosition =
            element.offsetLeft +
            element.getBoundingClientRect().width / 2 -
            currentNode.getBoundingClientRect().width / 2;

        currentNode.scroll({ left: newScrollPosition, behavior: "smooth" });
    }, [ref]);

    const scrollRight = React.useCallback(() => scrollToElement(nextElement), [nextElement, scrollToElement]);
    const scrollLeft = React.useCallback(() => scrollToElement(prevElement), [prevElement, scrollToElement]);

    return {
        hasItemsOnLeft: prevElement !== null,
        hasItemsOnRight: nextElement !== null,
        scrollRight,
        scrollLeft,
    };
}

// const CarouserContainer = styled(Relative)`
//   overflow: hidden;
// `

// const CarouselItem = styled.div`
//   flex: 0 0 auto;

//   margin-left: 1rem;
// `

function CarouselButton(props: any) {
    const { children, hasItemsOnSide, onClick, className } = props;
    let classNames = "carousel-button " + className;
    return (
        <div
            className={classNames}
            onClick={onClick}
            style={{ visibility: hasItemsOnSide ? "visible" : "hidden" }}
        >
            {children}
        </div>
    );
}


// const CarouselButton = styled.button`
//   position: absolute;

//   cursor: pointer;

//   top: 50%;
//   z-index: 1;

//   transition: transform 0.1s ease-in-out;

//   background: white;
//   border-radius: 15px;
//   border: none;
//   padding: 0.5rem;
// `
// const LeftCarouselButton = styled(CarouselButton)`
//   left: 0;
//   transform: translate(-100%, -50%);

//   ${CarouserContainer}:hover & {
//     transform: translate(0%, -50%);
//   }

//   visibility: ${({ hasItemsOnLeft }) => (hasItemsOnLeft ? `all` : `hidden`)};
// `

// const RightCarouselButton = styled(CarouselButton)`
//   right: 0;
//   transform: translate(100%, -50%);

//   ${CarouserContainer}:hover & {
//     transform: translate(0%, -50%);
//   }

//   visibility: ${({ hasItemsOnRight }) => (hasItemsOnRight ? `all` : `hidden`)};
// `

// const CarouserContainerInner = styled(Flex)`
//   overflow-x: scroll;
//   scroll-snap-type: x mandatory;
//   -ms-overflow-style: none;
//   scrollbar-width: none;

//   // offset for children spacing
//   margin-left: -1rem;

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   ${CarouselItem} & {
//     scroll-snap-align: center;
//   }
// `

const ArrowLeft = ({ size = 30, color = "#000000" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M19 12H6M12 5l-7 7 7 7" />
    </svg>
);

const ArrowRight = ({ size = 30, color = "#000000" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
);

function Carousel({ children }: { children: any }) {
    const ref = React.useRef<HTMLElement>();

    const {
        hasItemsOnLeft,
        hasItemsOnRight,
        scrollRight,
        scrollLeft,
    } = usePosition(ref);

    return (
        <div
            className="carouser-container"
            role="region"
            aria-label="Colors carousel"
        >
            <div className="carouser-container-inner" ref={ref as any}>
                {React.Children.map(children, (child, index) => (
                    <div className="carousel-item" key={index}>
                        {child}
                    </div>
                ))}
            </div>

            <CarouselButton className="carousel-button-left" hasItemsOnSide={hasItemsOnLeft} onClick={scrollLeft}>
                <ArrowLeft />
            </CarouselButton>

            <CarouselButton className="carousel-button-right" hasItemsOnSide={hasItemsOnRight} onClick={scrollRight}>
                <ArrowRight />
            </CarouselButton>
        </div>

        // <CarouserContainer role="region" aria-label="Colors carousel">
        //     <CarouserContainerInner ref={ref}>
        //         {React.Children.map(children, (child, index) => (
        //             <CarouselItem key={index}>{child}</CarouselItem>
        //         ))}
        //     </CarouserContainerInner>
        //
        //     <LeftCarouselButton hasItemsOnLeft={hasItemsOnLeft} onClick={scrollLeft} aria-label='Previous slide'>
        //         <ArrowLeft />
        //     </LeftCarouselButton>
        //
        //     <RightCarouselButton
        //         hasItemsOnRight={hasItemsOnRight}
        //         onClick={scrollRight}
        //         aria-label='Next slide'
        //     >
        //         <ArrowRight />
        //     </RightCarouselButton>
        // </CarouserContainer>
    );
}

const colors = [
    "#f1c40f",
    "#f39c12",
    "#e74c3c",
    "#16a085",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#95a5a6",
];

const numbersArray = Array.from(Array(10).keys()).map((number) => (
    <Item size={5} style={{ color: "black" }} key={number}>
        {number}
    </Item>
));

const colorsArray = colors.map((color) => (
    <Item
        size={20}
        style={{ background: color, borderRadius: "20px", opacity: 0.9 }}
        key={color}
    >
        {color}
    </Item>
));

function App() {
    return (
        <div className="container">
            <h1>Easy Carousel</h1>
            {/* <div className="horizontal-center">
                <Carousel>{colorsArray}</Carousel>
            </div> */}
            <div className="horizontal-center">
                <Carousel>{numbersArray}</Carousel>
            </div>
        </div>
        // <Container>
        //     <h1>Easy Carousel</h1>
        //     <HorizontalCenter>
        //         <Carousel>{colorsArray}</Carousel>
        //     </HorizontalCenter>

        //     <HorizontalCenter>
        //         <Carousel>{numbersArray}</Carousel>
        //     </HorizontalCenter>
        // </Container>
    );
}

export default App;
