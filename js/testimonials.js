$('.testimonial-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: false,

    responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});
