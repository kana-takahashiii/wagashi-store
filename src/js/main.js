// オープニングローディング
window.onload = function() {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}



//　セクションアニメーション記述
const fadeINs = document.querySelectorAll('.js-fadeIN');
const fadeINleft = document.querySelector('.js-fadeINleft');
// fadeInアニメーションを都度まわす
fadeINs.forEach((fadeIN) => {
    const flag = fadeIN.classList.contains('js-fadeINleft'); 
    if(!flag) {
        gsap.fromTo( fadeIN, {
            autoAlpha: 0,
            x: '10vw'
        },
        {
            autoAlpha: 1,
            x: 0,
            duration: 3,
            ease: "power4.out",
            scrollTrigger: {
                markers: true,
                trigger: fadeIN,
                start: 'top'
            }
        })
    }
    else {
        gsap.fromTo( fadeIN, {
            autoAlpha: 0,
            x: '-10vw'
        },
        {
            autoAlpha: 1,
            x: 0,
            duration: 3,
            ease: "power4.out",
            scrollTrigger: {
                markers: true,
                trigger: fadeIN,
                start: 'top'
            }
        })
    }
});


