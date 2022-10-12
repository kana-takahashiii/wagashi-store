// ------------
// TOP>works-swiper
// ------------ 
const swiperWorks = new Swiper(".js-slider-works", {
    // 1023px以下の場合
    slidesPerView: 'auto',
	spaceBetween: 60,
    centeredSlides: true,
    // loop: true,
    // ページネーション
    pagination: {
        el: '.swiper-pagination', 
        clickable: true, 
        type: 'progressbar' ,
    },
    //ブレイクポイント PC
    breakpoints: {
        // 1024px以上の場合
        1024: {
            slidesPerView: 2,   // スライド表示数２枚
            spaceBetween: 30,
            slidesOffsetBefore: 370,
            centeredSlides: false
        },
        // 768px以上の場合
        768: {
            slidesPerView: 2,   // スライド表示数２枚
            spaceBetween: 30,
            slidesOffsetBefore: 100,
            centeredSlides: false
        }

    }
});


// ------------
// TOP>about-swiper
// ------------
const swiperAbout = new Swiper(".js-slider-about", {
    effect: "cards",
    grabCursor: true,
    loop: true,
    // <>ページナビ
    navigation: {
        paginationClickable: true,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev', 
    }

});
// -----------------------------------
// ＊＊＊＊＊＊
// -----------------------------------



// ------------
// ALL_hamburger menu
// ------------
function hamburger() {
    const navArea = document.querySelector('#navArea'),
        btn = document.querySelector('.toggle_btn'),
        mask = document.querySelector('#mask');
        // open = document.querySelector('.open');

    // バーガーメニュー部分押したとき
    btn.addEventListener('click', function() {
        navArea.classList.toggle('open');
        btn.classList.toggle("active");
    });

    // マスク部分押したとき
    mask.addEventListener('click', function() {
        navArea.classList.remove('open');
        btn.classList.remove("active");
    });

}
hamburger();
// -----------------------------------
// ＊＊＊＊＊＊
// -----------------------------------




// -------------------
// ALL_custom　cursor
// -------------------
function customCursor() {
    // window=デバイスの横幅
    var winW = window.outerWidth;    
    // PCかそれ以外かを区別するために数値設定
    var breakpoints = 1024;
    // もしデバイスの横幅が1024以上なら
    if( breakpoints < winW ) {
        var follow = document.querySelector(".follower");
        var cur = document.querySelector(".cursor");
        // querySelectorAll("a")　aタグすべて
        var links = document.querySelectorAll("a");
        // querySelectorAll("img")　※top>about>swiperのみ
        // var links = document.querySelectorAll(".swiper-slide img");


        // カーソルの最初の位置指定
        gsap.set(follow, { xPercent: -50, yPercent: -50 });
        gsap.set(cur, { xPercent: -50, yPercent: -50 });
    
        // マウス動くたびに発火
        document.onmousemove = function(e) {
            // マウス動かすたびにX,Yを動かす。（オレンジ色と黒色の追従速度）
            gsap.to(cur, { duration: 0.2, x: e.clientX, y: e.clientY, cursor: "none" });
            gsap.to(follow, { duration: 0.9, x: e.clientX, y: e.clientY });
        };

        // aタグになるとカーソルが大きくなる、
        links.forEach(link => {
            link.addEventListener( "mouseenter", () => {
                cur.classList.add("is-active");
                follow.classList.add("is-active");
            });
            // 離れると小さくなるcssをActiveにする。
            link.addEventListener( "mouseleave", () => {
                cur.classList.remove("is-active");
                follow.classList.remove("is-active");
            });
        });
    }
}
// カスタムカーソルのjsを実行。
customCursor();

// リサイズされたタイミングでカスタムカーソルを実行。
window.addEventListener('resize',function(){
    customCursor();
});
// -----------------------------------
// ＊＊＊＊＊＊
// -----------------------------------






// -----------------------
//ALL__span化
// -----------------------
class SpanWrap {
    constructor(target) {

    this.target = this.convertElement(target);
    this.nodes = [...this.target.childNodes];

    this.convert();
}

convert() {

    let spanWrapText = ""

    this.nodes.forEach((node) => {
    if (node.nodeType == 3) { //テキストの場合
        const text = node.textContent.replace(/\r?\n/g, '');//テキストから改行コード削除
    //spanで囲んで連結
    spanWrapText = spanWrapText + text.split('').reduce((acc, v) => {
    return acc + `<span>${v}</span>`
        }, "");
    } else {  //テキスト以外
        //<br>などテキスト以外の要素をそのまま連結
        spanWrapText = spanWrapText + node.outerHTML
    }
    })
    this.target.innerHTML = spanWrapText
}
//jQueryオブジェクトや文字列セレクターを変換
convertElement(element) {
    if (element instanceof HTMLElement) {
        return element
    }
    // if (element instanceof jQuery) {
    //   return element[0]
    // }
    return document.querySelector(element);
    }
}
//実行処理
const targets = [...document.querySelectorAll(".js-span,.js-kv-spn,.js-kv-spn2")]
targets.forEach( (target) => {
    new SpanWrap(target);
})




// -----------------------
//ALL__条件分岐
// -----------------------
const home = document.querySelector(".shutter"); //TOP
const about = document.querySelector(".about"); //ABOUTページ
const works = document.querySelector(".works"); //WORKSページ
if(home) {
    // スムーススクロール記述　↓↓
    let smoothHomeAnchor =()=> {
        const anchorLinks = document.querySelectorAll('a[href^="/#"]');
        const anchorLinksArr = Array.prototype.slice.call(anchorLinks);
        anchorLinksArr.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.hash;
                const targetElement = document.querySelector(targetId);
                const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
                window.scrollTo({
                    top: targetOffsetTop,
                    behavior: "smooth"
                });
            });
        });
    }
    // スムーススクロール記述 ↑↑
    smoothHomeAnchor();
    
    //各セクションタイトルと要素がふわっと同時に浮き上がる　↓↓
    const items = document.querySelectorAll('.js-trigger');
    const titleFades = document.querySelectorAll('.js-span');
        items.forEach((item) => {
            gsap.fromTo(item,
                {y: 100,opacity:0},
                {y: 0,opacity:1,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger:  item.querySelectorAll( '.js-span' ),
                    start: 'top center',
                    onEnter: () => item.classList.add('is-active'),
                    onLeaveBack: () => item.classList.remove('is-active'),
                }
                }
            );
        gsap.set(".js-span span",{opacity: 0,});
        titleFades.forEach(( titleFade ) => {
            gsap.to( titleFade.querySelectorAll( 'span' ), {
                    opacity: 1,
                    duration: 2,
                    stagger: 0.07,
                    scrollTrigger: {
                        // 各セクションタイトル
                        trigger:  titleFade,
                        start: 'top center',
                    }
                });
        })
    });
    // -----------------------------------
    //　kvのアニメーション　　gsap span anime
    // -----------------------------------
    gsap.set(".parapara-top",{opacity: 0,});
    gsap.set(".js-kv-spn span",{opacity: 0,});
    gsap.set(".js-kv-spn2 span", {opacity: 0,});
    gsap.set(".cir-sd",{opacity: 0,});
    gsap.set(".header-nav-pc", {opacity: 0,});

    const targetEl = document.querySelector('.content');
        targetEl.addEventListener('animationend',() => {

        var kv = gsap.timeline();
            // "kana takahashi"
            kv.to(".js-kv-spn span",{
                opacity: 1,
                duration: 3,
                stagger: 0.07,
            })

            // "hi!~~"
            .to(".js-kv-spn2 span",{
                opacity:1,
                duration: 3,
                stagger: 0.03,
            }, "<+=0.01")

            // svg img
            .to(".cir-sd",{
                opacity:1,
                duration: 1,
                ease: "power4.inOut",
                y: "-20%",
            },"<+=2")

            // parapara img
            .to(".parapara-top",{
                opacity:1,
                duration: 1,
                ease: "power4.inOut",
                y: "-10%"
            },"<")

            //header-nav
            .to(".header-nav-pc",{
                opacity:1,
                duration: 1,
            },"<+=2")

    });
    // -----------------------------------
    // ＊＊＊＊＊＊
    // -----------------------------------

    //各セクションタイトルと要素がふわっと同時に浮き上がる　↓↓
    // about-page　のみ
    } else if(about) {
        // ふわっと現れる記述　↓↓
        const tl = gsap.timeline();
        tl.from(".gp-demo",{
                opacity:0,
                duration:3,
                y: "10%",
                ease: "Expo.easeOut"})

            .from(".gp-demo2",{
                opacity:0,
                duration: 3,
                y: "10%",
                ease: "Expo.easeOut"}, "<+=0.2")

            .from(".gp-demo3",{
                opacity:0,
                duration:3,
                y:"10%",
                ease: "Expo.easeOut"}, "<+=0.3");
        // gsap about ふわっと現れる記述　↑↑
            
            

    // works-pageのみ
    } else if(works) {
        // スクロール×ふわっと現れる記述　↓↓
        const animes = gsap.utils.toArray('.js-demo');
        animes.forEach((anime) => {
            gsap.from(anime,
                {
                    opacity: 0,
                    duration: 2,
                    y: "30%",
                    ease: "Power4.easeOut",
                    scrollTrigger: {
                        trigger:  anime,
                        start: 'top center'
                    }
                }
                );
            });
        //　スクロール×ふわっと現れる記述　↑↑


        //img×スクロール×ふわっと現れる記述　↓↓
        gsap.from(".js-demo-img",{
            opacity: 0,
            y: "30%",
            stagger: 0.3,
            ease: "Power4.easeOut",
            duration: 2,
            scrollTrigger: {
                trigger:  ".js-demo-img",
                start: 'top center'
            }
        })
        //img×スクロール×ふわっと現れる記述　↑↑

};
// -----------------------------------
// ＊＊＊＊＊＊
// -----------------------------------



