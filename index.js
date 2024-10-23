$(document).ready(function() {
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=5';  // Fetch 5 random cat images
    const $carouselInner = $('.carousel-inner');
    let currentIndex = 0;

    // Smooth Scrolling for navigation links (400ms duration)
    $('nav ul li a').click(function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        const targetSection = $(this.hash); // Get the target section
        $('html, body').animate({
            scrollTop: targetSection.offset().top
        }, 400); // Smooth scrolling to the section over 400ms
    });

    // Fetch random cat images from the Cat API
    function loadCatImages() {
        $.getJSON(apiUrl, function(images) {
            $carouselInner.empty();  // Clear any previous images
            images.forEach(function(image, index) {
                const imageElement = `<img src="${image.url}" class="${index === 0 ? 'active' : ''}">`;
                $carouselInner.append(imageElement);
            });
        });
    }

    // Initialize the carousel by loading images
    loadCatImages();

    // Carousel controls
    $('.next').click(function() {
        const totalImages = $carouselInner.children().length;
        currentIndex = (currentIndex + 1) % totalImages;
        $carouselInner.css('transform', `translateX(-${currentIndex * 100}%)`);
    });

    $('.prev').click(function() {
        const totalImages = $carouselInner.children().length;
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        $carouselInner.css('transform', `translateX(-${currentIndex * 100}%)`);
    });
});
