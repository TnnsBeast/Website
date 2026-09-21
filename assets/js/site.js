(function () {
	'use strict';

	var body = document.body;
	var videos = Array.prototype.slice.call(document.querySelectorAll('.project-video'));
	var slides = Array.prototype.slice.call(document.querySelectorAll('.project-slide'));
	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var slideIndex = 0;
	var slideTimer = null;

	// Reveal the shell as soon as the DOM is ready. Waiting for every image and
	// media request made slow connections look like a failed page load.
	window.setTimeout(function () {
		body.classList.remove('is-preload');
	}, 100);

	function hydrateVideo(video) {
		if (video.dataset.loaded === 'true')
			return;

		Array.prototype.forEach.call(video.querySelectorAll('source[data-src]'), function (source) {
			source.src = source.dataset.src;
		});

		video.muted = true;
		video.defaultMuted = true;
		video.playsInline = true;
		video.dataset.loaded = 'true';
		video.load();
	}

	function playVideo(video) {
		hydrateVideo(video);
		var playRequest = video.play();

		if (playRequest && typeof playRequest.catch === 'function') {
			playRequest.catch(function () {
				// Controls remain visible if a browser or user preference blocks autoplay.
				video.classList.add('autoplay-blocked');
			});
		}
	}

	function pauseVideo(video) {
		if (!video.paused)
			video.pause();
	}

	videos.forEach(function (video) {
		video.muted = true;
		video.defaultMuted = true;
		video.setAttribute('muted', '');
		video.setAttribute('playsinline', '');
		video.addEventListener('playing', function () {
			video.classList.remove('autoplay-blocked');
		});
		video.addEventListener('error', function () {
			video.classList.add('media-error');
		});
	});

	if ('IntersectionObserver' in window) {
		var videoObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting && document.visibilityState !== 'hidden')
					playVideo(entry.target);
				else
					pauseVideo(entry.target);
			});
		}, {
			root: null,
			rootMargin: '180px 0px',
			threshold: 0.05
		});

		videos.forEach(function (video) {
			videoObserver.observe(video);
		});
	}
	else {
		var refreshVideos = function () {
			videos.forEach(function (video) {
				var rect = video.getBoundingClientRect();
				var nearby = rect.bottom >= -180 && rect.top <= window.innerHeight + 180;
				if (nearby && document.visibilityState !== 'hidden')
					playVideo(video);
				else
					pauseVideo(video);
			});
		};

		window.addEventListener('scroll', refreshVideos, { passive: true });
		window.addEventListener('resize', refreshVideos);
		window.addEventListener('hashchange', function () {
			window.setTimeout(refreshVideos, 400);
		});
		refreshVideos();
	}

	function showSlide(index) {
		slides.forEach(function (slide, currentIndex) {
			var active = currentIndex === index;
			slide.classList.toggle('is-active', active);
			slide.setAttribute('aria-hidden', active ? 'false' : 'true');
		});
	}

	function stopSlideshow() {
		if (slideTimer !== null) {
			window.clearInterval(slideTimer);
			slideTimer = null;
		}
	}

	function updateSlideshow() {
		stopSlideshow();

		if (!slides.length || reduceMotion || location.hash !== '#projects' || document.visibilityState === 'hidden')
			return;

		slideTimer = window.setInterval(function () {
			slideIndex = (slideIndex + 1) % slides.length;
			showSlide(slideIndex);
		}, 4000);
	}

	if (slides.length)
		showSlide(slideIndex);

	window.addEventListener('hashchange', updateSlideshow);
	document.addEventListener('visibilitychange', function () {
		if (document.visibilityState === 'hidden')
			videos.forEach(pauseVideo);
		updateSlideshow();
	});
	updateSlideshow();
})();
