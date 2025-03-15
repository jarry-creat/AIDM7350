// 首页按钮点击事件
const exploreButton = document.getElementById('exploreButton');
if (exploreButton) {
    exploreButton.addEventListener('click', function () {
        window.location.href = 'detail.html';
    });
}

// 详情页功能
if (window.location.pathname.includes('detail.html')) {
    const detailImage = document.querySelector('.slider');
    const zoomInButton = document.getElementById('zoomInButton');
    const zoomOutButton = document.getElementById('zoomOutButton');
    const prevImageButton = document.querySelector('.slider-arrow-left');
    const nextImageButton = document.querySelector('.slider-arrow-right');

    let scale = 1;
    const scaleStep = 0.1;
    const maxScale = 2;
    const minScale = 0.5;

    // 图片放大功能
    if (zoomInButton) {
        zoomInButton.addEventListener('click', function () {
            if (scale < maxScale) {
                scale += scaleStep;
                detailImage.style.transform = `scale(${scale})`;
            }
        });
    }

    // 图片缩小功能
    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', function () {
            if (scale > minScale) {
                scale -= scaleStep;
                detailImage.style.transform = `scale(${scale})`;
            }
        });
    }

    const slides = document.querySelectorAll('.slide');
    let currentImageIndex = 0;

    // 上一张图片功能
    if (prevImageButton) {
        prevImageButton.addEventListener('click', function () {
            if (currentImageIndex === 0) {
                
                const lastSlide = slides[slides.length - 1].cloneNode(true);
                detailImage.insertBefore(lastSlide, detailImage.firstChild);

                
                detailImage.style.transform = `translateX(0)`;

                
                requestAnimationFrame(() => {
                    
                    detailImage.style.transform = `translateX(-100%)`;
                    
                    setTimeout(() => {
                        detailImage.removeChild(lastSlide);
                        currentImageIndex = slides.length - 1;
                    }, 1500); 
                });
            } else {
                currentImageIndex = (currentImageIndex - 1 + slides.length) % slides.length;
                detailImage.style.transform = `translateX(-${currentImageIndex * 100}%)`;
            }
        });
    }

    
    if (nextImageButton) {
        nextImageButton.addEventListener('click', function () {
            if (currentImageIndex === slides.length - 1) {
                
                const firstSlide = slides[0].cloneNode(true);
                detailImage.appendChild(firstSlide);

                
                detailImage.style.transform = `translateX(-${currentImageIndex * 100}%)`;

               
                requestAnimationFrame(() => {
                    
                    detailImage.style.transform = `translateX(-${(currentImageIndex + 1) * 100}%)`;
                    
                    setTimeout(() => {
                        detailImage.removeChild(firstSlide);
                        currentImageIndex = 0;
                    }, 1500); 
                });
            } else {
                currentImageIndex = (currentImageIndex + 1) % slides.length;
                detailImage.style.transform = `translateX(-${currentImageIndex * 100}%)`;
            }
        });
    }
}
    