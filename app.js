// Shared: smooth scroll, reveals, bag count.
const bagKey = "veloura-bag";
function readBag(){ try { return JSON.parse(localStorage.getItem(bagKey)) || []; } catch { return []; } }
function writeBag(b){ try { localStorage.setItem(bagKey, JSON.stringify(b)); } catch {} updateBag(); }
function updateBag(){ document.querySelectorAll("[data-bag-count]").forEach(el => el.textContent = readBag().length); }
updateBag();

if (typeof gsap !== "undefined") {
  document.documentElement.classList.add("gsap");
  gsap.registerPlugin(ScrollTrigger);

  if (typeof Lenis !== "undefined") {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis = lenis;
  }

  // Hero intro (not scroll-triggered)
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  if (document.querySelector(".hero")) {
    tl.from(".hero h1 .line span", { yPercent: 100, duration: 1.2, stagger: .12 })
      .from(".hero .eyebrow, .hero p, .hero-ctas, .rating", { y: 24, opacity: 0, duration: 1, stagger: .08 }, "-=.9")
      .fromTo(".hero-img", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 1.4 }, 0)
      .from(".badge-love", { scale: 0, rotate: -40, duration: 1, ease: "back.out(1.6)" }, .6);
    gsap.to(".badge-love", { rotate: 20, y: -40, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-img", { backgroundPositionY: "70%", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }

  gsap.utils.toArray(".reveal").forEach(el => {
    gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%" } });
    const img = el.querySelector("img");
    if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.4, ease: "expo.out", clearProps: "transform",
      scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  gsap.utils.toArray(".fade").forEach(el => {
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
  });
  gsap.utils.toArray("[data-parallax]").forEach(el => {
    gsap.to(el, { y: +el.dataset.parallax, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  });
}
