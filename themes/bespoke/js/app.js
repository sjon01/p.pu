// Ensure DOM is fully loaded before initializing
document.addEventListener("DOMContentLoaded", function() {
    // Splide Slider Initializations
    const sliders = [
        {
            id: "#latestEscortSlideHome",
            options: {
                type: "loop",
                perPage: 4,
                perMove: 1,
                autoplay: true,
                interval: 2000,
                pagination: false,
                arrows: true,
                breakpoints: {
                    767: {
                        perPage: 1,
                        padding: "5rem",
                        focus: "center"
                    }
                }
            }
        },
        {
            id: "#featuredEscortSlide",
            options: {
                perPage: 4,
                focus: "center",
                autoplay: true,
                interval: 8000,
                pagination: false,
                arrows: false,
                destroy: true,
                breakpoints: {
                    767: {
                        destroy: false,
                        perPage: 1,
                        padding: "10%"
                    }
                }
            }
        },
        {
            id: "#blogSlide",
            options: {
                type: "loop",
                perPage: 3,
                focus: "center",
                autoplay: true,
                interval: 8000,
                destroy: true,
                pagination: false,
                arrows: false,
                breakpoints: {
                    767: {
                        destroy: false,
                        perPage: 1,
                        padding: "10%"
                    }
                }
            }
        },
        {
            id: ".gallery-singleSlide", // Corrected typo from gallerySligneSlide
            options: {
                omitEnd: true,
                fixedWidth: "100%",
                fixedHeight: "500px",
                mediaQuery: "min",
                arrows: true,
                pagination: false,
                breakpoints: {
                    480: {
                        fixedWidth: "373px"
                    },
                    768: {
                        fixedWidth: "100%",
                        fixedHeight: "auto",
                        destroy: true
                    }
                },
                classes: {
                    arrows: "splide__arrows your-class-arrows",
                    arrow: "splide__arrow your-class-arrow",
                    prev: "splide__arrow--prev bg-transparent",
                    next: "splide__arrow--next bg-transparent"
                }
            }
        }
    ];

    // Initialize Splide sliders
    sliders.forEach(slider => {
        const element = document.querySelector(slider.id);
        if (element) {
            new Splide(element, slider.options).mount();
        } else {
            console.warn(`Slider element ${slider.id} not found in the DOM.`);
        }
    });

    // Hover Slider Logic
    document.querySelectorAll(".hoverSlider").forEach(slider => {
        if (slider.dataset.sliderInitialized) return;

        slider.dataset.sliderInitialized = "true";
        let interval, index = 0;
        const pictures = Array.from(slider.querySelectorAll(".gallery-media picture"));

        if (pictures.length < 1) {
            console.warn("No pictures found in .hoverSlider");
            return;
        }

        function startHoverSlider() {
            pictures.forEach(pic => pic.classList.remove("active"));
            pictures[index].classList.add("active");
            clearInterval(interval);
            interval = setInterval(() => {
                pictures[index].classList.remove("active");
                index = (index + 1) % pictures.length;
                pictures[index].classList.add("active");
            }, 1500);
        }

        slider.addEventListener("mouseenter", startHoverSlider);
        slider.addEventListener("mouseleave", () => {
            clearInterval(interval);
            pictures.forEach((pic, i) => {
                pic.classList.remove("active");
                if (i === 0) pic.classList.add("active");
            });
            index = 0;
        });

        startHoverSlider(); // Initialize immediately
    });
});

// jQuery Event Handlers
$(document).ready(function() {
    const currentUrl = window.location.origin + window.location.pathname;

    // Highlight active menu item
    $(".nav-min-menu a").each(function() {
        if (this.href === currentUrl) {
            $(this).parent().addClass("active");
        }
    });

    // Dropdown menu toggle
    $(".nav-min-menu > .have-child > a").on("click", function(e) {
        e.preventDefault();
        const $parent = $(this).parent();
        $parent.toggleClass("active").siblings().removeClass("active");
        $parent.siblings().find(".child-menu").removeClass("active");
        $parent.find(".child-menu").toggleClass("active");
        if ($(window).width() < 1200) {
            setTimeout(() => {
                $(".nav-min-close").css("position", "fixed");
            }, 250);
        }
    });

    // Close dropdown menu
    $(".child-menu-close").on("click", function() {
        $(this).closest(".child-menu").removeClass("active");
        $(this).closest(".have-child").removeClass("active");
    });

    // Mobile menu toggle
    $(".header-min-navToggle").on("click", function() {
        $(".nav-min-wrap").addClass("active");
    });

    $(".nav-min-close").on("click", function() {
        $(this).parent(".nav-min-wrap").removeClass("active");
        $(this).css("position", "absolute");
        $(".child-menu").removeClass("active");
    });

    // Search form toggle
    $(".search-btn").on("click", function() {
        $(".form-search").addClass("active");
    });

    $(".search-btn-close").on("click", function() {
        $(".form-search").removeClass("active");
    });

    // Blog sidebar toggle for mobile
    function toggleBlogSidebar() {
        if ($(window).width() < 768) {
            $(".blog-sidebar-toggle").on("click", function() {
                $(".blog-sidebar").addClass("active");
            });
            $(".blog-sidebar-close").on("click", function() {
                $(this).parent(".blog-sidebar").removeClass("active");
            });
        } else {
            $(".blog-sidebar").removeClass("active");
            $(".blog-sidebar-toggle").removeClass("active");
        }
    }

    if ($(".blog-sidebar").length) {
        toggleBlogSidebar();
        $(window).resize(toggleBlogSidebar);
    }

    // Back-to-top button
    $(".btm-top").fadeOut(200);
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) {
            $(".btm-top").fadeIn(200);
        } else {
            $(".btm-top").fadeOut(200);
        }
    });

    $(".btm-top").click(function() {
        $("body,html").animate({
            scrollTop: 0
        }, 500); // Increased duration for smoother scroll
    });

    // Custom file input
    if ($(".customFile").length) {
        try {
            $(".customFile").betterInputFile();
        } catch (e) {
            console.error("betterInputFile plugin not found:", e);
        }
    }

    // Bootstrap carousel lazyload
    if ($("#carouselExampleIndicators").length) {
        $("#carouselExampleIndicators").on("slide.bs.carousel", function() {
            try {
                $("img.lazy").lazyload();
            } catch (e) {
                console.error("Lazyload plugin not found:", e);
            }
        });
    }

    // Password toggle
    $(".form-passToggle").on("click", function() {
        $(this).toggleClass("active");
        const $input = $(this).siblings("input");
        $input.attr("type", $(this).hasClass("active") ? "text" : "password");
    });
});