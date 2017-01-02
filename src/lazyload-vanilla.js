(() => {
  const lazyloadVanilla = () => {
    // Test if image is in the viewport
    const isImageInViewport = (img) => {
      const rect = img.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // Create custom fading effect for showing images
    const fadeInCustom = (element) => {
      let elementOpacity = 0.1;// initial opacity

      element.style.display = 'block';

      const timer = setInterval(() => {
        if (elementOpacity >= 1){
          clearInterval(timer);
        }

        element.style.opacity = elementOpacity;

        element.style.filter = 'alpha(opacity=' + elementOpacity * 100 + ")";

        elementOpacity += elementOpacity * 0.1;
      }, 15);
    };

    // lazyloadVanilla function
    const lazyloadVanillaLoader = () => {
      const lazyImagesList = document.querySelectorAll('img[data-src]');

      lazyImagesList.forEach((image) => {
        if (isImageInViewport(image)) {
          if (image.getAttribute('data-src') !== null) {
            image.setAttribute('src', image.getAttribute('data-src'));

            image.removeAttribute('data-src');
          }

          if (image.getAttribute('data-srcset') !== null) {
            image.setAttribute('srcset', image.getAttribute('data-srcset'));

            image.removeAttribute('data-srcset');
          }

          image.setAttribute('data-loaded', true);

          fadeInCustom(image);
        }
      });

      // Remove event listeners if all images are loaded
      if (document.querySelectorAll('img[data-src]').length === 0 && document.querySelectorAll('img[data-srcset]')) {
        window.removeEventListener('DOMContentLoaded', lazyloadVanilla);

        window.removeEventListener('load', lazyloadVanillaLoader);

        window.removeEventListener('resize', lazyloadVanillaLoader);

        window.removeEventListener('scroll', lazyloadVanillaLoader);
      }
    };

    // Add event listeners to images
    window.addEventListener('DOMContentLoaded', lazyloadVanillaLoader);

    window.addEventListener('load', lazyloadVanillaLoader);

    window.addEventListener('resize', lazyloadVanillaLoader);

    window.addEventListener('scroll', lazyloadVanillaLoader);
  }
  
  // Test if JavaScript is available and allowed
  if (document.querySelector('.no-js') !== null) {
    document.querySelector('.no-js').classList.remove('no-js');
  }
  
  // Initiate lazyloadVanilla plugin
  return lazyloadVanilla();
})();
