window.onload=function(){const e=document.getElementById("loading");e.classList.add("loaded")};const fadeIN=document.querySelectorAll(".js-fadeIN"),fadeINleft=document.querySelector(".js-fadeINleft");items.forEach(e=>{e?gsap.fromTo(".js-fadeIN",{autoAlpha:0,x:"10vw"},{autoAlpha:1,x:0,duration:3,ease:"power4.out",scrollTrigger:{markers:!0,trigger:".js-fadeIN",start:"top"}}):fadeINleft&&gsap.fromTo(".js-fadeINleft",{autoAlpha:0,x:"-10vw"},{autoAlpha:1,x:0,duration:3,ease:"power4.out",scrollTrigger:{markers:!0,trigger:".js-fadeINleft",start:"top"}})});