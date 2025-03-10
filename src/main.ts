import './style.css'
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".hamburger-container button") as HTMLButtonElement;
    const mobileNav = document.querySelector(".mobile-nav") as HTMLDivElement;
    const headerContainer = document.querySelector(".header-container") as HTMLDivElement;

    const resizeObserver = new ResizeObserver((entries) => {
        const header_cont = entries[0];

        if (Math.floor(header_cont.contentRect.width) > 667) {
            if (!mobileNav.classList.contains("close")) {
                (menuButton.querySelector("img") as HTMLImageElement).src = "/images/icon-hamburger.svg";
                animateMenuOut();
                scrollBody(true);
                mobileNav.classList.add("close");
            }
        }
    })


    resizeObserver.observe(headerContainer)

    menuButton.addEventListener("click", () => {

        mobileNav.classList.toggle("close");

        if (mobileNav.classList.contains("close")) {
            (menuButton.querySelector("img") as HTMLImageElement).src = "/images/icon-hamburger.svg";
            scrollBody(true);
            animateMenuOut();
        }
        else {
            (menuButton.querySelector("img") as HTMLImageElement).src = "/images/icon-close.svg";
            scrollBody(false);
            animateMenuIn();
        }
    })

    function scrollBody(enable: boolean) {
       if (enable) {
        lenis.start();
       }else {
        lenis.stop();
       }
    }

    function animateMenuIn() {
        const tl = gsap.timeline()
        tl
        .to(".mobile-nav nav", {
            left: "0", 
            duration: 0.3
        })
        .from(".mobile-nav li", {
            opacity: 0,
            stagger: {
                each: 0.1,
                from: "start"
            },
            duration: 1,
        })
    }

    function animateMenuOut() {
        gsap.to(".mobile-nav nav", {
            left: "100%"
        })
    }
})

