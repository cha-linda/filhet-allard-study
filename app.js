document.addEventListener("DOMContentLoaded", () => {
  /** Gère la taille de la nav */
  const topMenu = document.querySelector(".top-menu");
  window.addEventListener("scroll", (e) => {
    if (!topMenu.classList.contains("flow") && window.pageYOffset >= 5) {
      topMenu.classList.add("flow");
    }
    if (window.pageYOffset <= 5 && topMenu.classList.contains("flow")) {
      topMenu.classList.remove("flow");
    }
  });

  /** affichage des textes étudiants et alternance */
  const studentsItems = document.querySelectorAll("#students .item");

  studentsItems.forEach((item) => {
    let title = item.querySelector(".inner-title");
    let content = item.querySelector(".text");
    if (title && content) {
      title.addEventListener("click", () => {
        content.style.opacity = "1";
        setTimeout(() => {
          content.style.opacity = "0";
        }, 15000);
      });
    }
  });

  /**gestion du slider et de la lightbox des portraits video */
  const cards = document.querySelectorAll(".video-card");
  const lightbox = document.getElementById("videoLightbox");
  const player = document.getElementById("mainPlayer");
  const closeBtn = document.querySelector(".close-lightbox");
  const videoGallery = document.querySelector("#metiers .video-gallery");

  videoGallery.addEventListener("click", (e) => {
    const card = e.target.closest(".video-card");

    if (card) {
      const videoUrl = card.getAttribute("data-video");
      player.src = videoUrl;
      player.load();
      lightbox.classList.add("active");
      player.play().catch(() => {
        console.log("Lecture manuelle requise.");
      });
    }
  });
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    player.pause();
    player.src = "";
  };

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  $(videoGallery).slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    accessibility: true,
    arows: false,
    dots: true,
    prevArrow:
      '<button arial-label="vers la gauche" type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow:
      '<button arial-label="vers la droite" type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  /** gestion du CTA étudiant */

  const chatBot = document.querySelector(".bot-btn");
  const areasToWatch = document.querySelectorAll("#numbers, #metiers");
  const footer = document.querySelector("#footer");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chatBot.classList.add("green");
        } else {
          chatBot.classList.remove("green");
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "-90% 0px 0px 0px",
    },
  );

  areasToWatch.forEach((area) => observer.observe(area));

  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chatBot.style.display = "none"; // cache le bouton
        } else if (window.scrollY >= window.innerHeight * 1.5) {
          chatBot.style.display = "flex"; // réaffiche si on est assez bas
        }
      });
    },
    {
      threshold: 0.1, // dès que 10% du footer est visible
    },
  );

  footerObserver.observe(footer);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY; // combien on a scrollé
    const triggerPoint = window.innerHeight * 0.75; // 150vh

    if (scrollY >= triggerPoint) {
      chatBot.classList.add("active"); // bouton visible
    } else {
      chatBot.classList.remove("active"); // bouton caché
    }
  });
});
