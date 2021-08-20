'use strict';


// menu

const menu_smart = document.querySelector('#smart_navigation');

const menu_header_first = document.querySelector('.modal__header_first');
const menu_header_parent = document.querySelector('.modal__header_parent');
const menu_header_parent_parent = document.querySelector('.modal__header_parent_parent');

if(menu_smart) {
	const menu_parent = menu_smart.querySelectorAll('.parent');

	const parent_menu = document.querySelectorAll('.parent_menu > li > a');
	const parent_menu_sub = document.querySelectorAll('.parent_menu_sub > li > a');

	menu_parent.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault();

			this.parentNode.classList.toggle('active');
		});
	});

	parent_menu.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault();

			let title = this.querySelector('span').innerHTML;

			menu_header_first.classList.add('hide');
			menu_header_parent.classList.remove('hide');
			menu_header_parent.querySelector('.title').innerHTML = title;

			this.nextElementSibling.classList.add('active');

			// console.log(this.nextElementSibling)

		});
	});

	parent_menu_sub.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault();

			let title = this.querySelector('span').innerHTML;

			menu_header_parent.classList.add('hide');
			menu_header_parent_parent.classList.remove('hide');
			menu_header_parent_parent.querySelector('.title').innerHTML = title;

			this.nextElementSibling.classList.add('active');

			// console.log(this.nextElementSibling)

		});
	});


	menu_header_parent.querySelector('.modal__prev').addEventListener('click', function() {
		menu_header_first.classList.remove('hide');
		menu_header_parent.classList.add('hide');

		document.querySelector('.parent_menu_sub.active').classList.remove('active');
	});

	menu_header_parent_parent.querySelector('.modal__prev').addEventListener('click', function() {
		menu_header_parent.classList.remove('hide');
		menu_header_parent_parent.classList.add('hide');

		document.querySelector('.parent_menu_sub_sub.active').classList.remove('active');
	});

	// close

	const modal_menu = document.querySelectorAll('.modal_menu .modal__close');

	modal_menu.forEach(e => {
		e.addEventListener('click', function() {
			document.querySelector('#modal_menu').classList.remove('active');


		});
	});
}

// modal

const modal = document.querySelectorAll('.modal');

if(modal) {
	modal.forEach(e => {
		const modal_close = e.querySelector('.modal__close');

		modal_close.addEventListener('click', function(event) {
			event.preventDefault();

			e.classList.remove('active');
		});
	});
}


const modal_button_active = document.querySelectorAll('[data-modal]');

if(modal_button_active) {
	modal_button_active.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault();
			
			const modal_target = e.getAttribute('data-modal');

			if(modal_target == 'modal_register' && document.querySelector('#modal_login').classList.contains('active')) {
				document.querySelector('#modal_login').classList.remove('active');
			}

			if(modal_target == 'modal_login' && document.querySelector('#modal_register').classList.contains('active')) {
				document.querySelector('#modal_register').classList.remove('active');
			}

			if(modal_target == 'modal_search' && document.querySelector('#modal_menu').classList.contains('active')) {
				document.querySelector('#modal_menu').classList.remove('active');
			}

			document.querySelector(`#${modal_target}`).classList.add('active');
		});
	});
}


// show text

const button_show = document.querySelector('.show-text');

if(button_show) {
	button_show.addEventListener('click', function() {
		document.querySelector('.product_article__content').classList.remove('hide');
	});
}

// calcs

const calc_final_price = document.querySelector('.final_price');
const calc_count_item = document.querySelector('.count_product');
const calc_item = document.querySelectorAll('.calc_number');

if(calc_item != null) {

	if(calc_count_item) calc_count_item.innerHTML = calc_item.length;

	calc_item.forEach(e => {
		const calc_button_minus = e.querySelector('.minus');
		const calc_button_plus = e.querySelector('.plus');
		const calc_button_input = e.querySelector('input');
		const calc_button_price_item = e.querySelector('.price_item');
		const calc_button_price_sum = e.querySelector('.price_sum');


		const changePrice = () => {
			calc_button_price_sum.innerHTML = parseInt(calc_button_price_item.innerHTML) * parseInt(calc_button_input.value);
		
			// document.querySelectorAll('.price_sum').forEach(e => {
			// 	console.log(e.innerHTML);
			// })

			calc_final_price.innerHTML = Array.prototype.reduce.call(
				document.querySelectorAll('.price_sum'), function(p, t){
					return p + parseInt(t.innerHTML);
				}, 0
			);
		}

		changePrice();

		calc_button_minus.addEventListener('click', function() {
			let count = parseInt(calc_button_input.value) - 1;

			count = count < 1 ? 1 : count;
			calc_button_input.value = count;

			changePrice();

		});

		calc_button_plus.addEventListener('click', function() {
			let count = parseInt(calc_button_input.value) + 1;
			calc_button_input.value = count;

			changePrice();

		});

		calc_button_input.addEventListener('input', function(event) {

			let testText = this.value;

			if(testText*1 + 0 != calc_button_input.value) {
				calc_button_input.value = testText.substring(0, testText.length - 1);
			}
			

			if(parseInt(testText) < 1 || testText == '') calc_button_input.value = 1;

			changePrice();
		});

	});
	
}

const html5Slider = document.getElementById('uirange');

if(html5Slider) {
	noUiSlider.create(html5Slider, {
		start: [0, 999999],
		step: 10,
		connect: true,
		range: {
			'min': 0,
			'max': 999999
		}
	});

	const inputNumber = document.getElementById('input_price_1');
	const inputNumber2 = document.getElementById('input_price_2');

	html5Slider.noUiSlider.on('update', function (values, handle) {
		inputNumber.value = Math.floor(values[0]);
		inputNumber2.value = Math.floor(values[1]);
	});

	inputNumber.addEventListener('change', function () {
		html5Slider.noUiSlider.set([null, this.value]);
	});

	inputNumber2.addEventListener('change', function () {
		html5Slider.noUiSlider.set([null, this.value]);
	});
}

const modal_range = document.getElementById('modal_filter_range');

if(modal_range) {
	noUiSlider.create(modal_range, {
		start: [0, 999999],
		step: 10,
		connect: true,
		range: {
			'min': 0,
			'max': 999999
		}
	});

	const inputNumber3 = document.getElementById('modal_filter_field_1');
	const inputNumber4 = document.getElementById('modal_filter_field_2');

	modal_range.noUiSlider.on('update', function (values, handle) {
		inputNumber3.value = Math.floor(values[0]);
		inputNumber4.value = Math.floor(values[1]);
	});

	inputNumber3.addEventListener('change', function () {
		modal_range.noUiSlider.set([null, this.value]);
	});

	inputNumber4.addEventListener('change', function () {
		modal_range.noUiSlider.set([null, this.value]);
	});
}


// sliders

const header_slider = new Swiper('#header_slider', {
	// Optional parameters
	loop: true,
	spaceBetween: 16,

	// If we need pagination
	pagination: {
		el: document.querySelector('#header_slider .swiper-control--nav-page'),
		clickable: true
	},

	// Navigation arrows
	navigation: {
		nextEl: document.querySelector('#header_slider .swiper-control--nav-next'),
		prevEl: document.querySelector('#header_slider .swiper-control--nav-prev')
	}
});

const slider_related_product = new Swiper('#slider_related_product', {
  	// Optional parameters
  	// loop: true,
	slidesPerView: 4,
	spaceBetween: 16,
	simulateTouch: false,

	breakpoints: {
		0: {
			slidesPerView: 1.8,
			spaceBetween: 10
		},

		540: {
			slidesPerView: 2.2,
			spaceBetween: 16
		},

		768: {
			slidesPerView: 2.8,
			spaceBetween: 16
		},

		900: {
			slidesPerView: 3.8,
			spaceBetween: 16
		},

		1050: {
			slidesPerView: 4,
			spaceBetween: 16
		},
	},
 
	scrollbar: {
		el: '#slider_related_product .swiper-scrollbar',
		clickable: true
	},
});

const slider_related_product_height = () => {
	const slider_related_product_wrapper = slider_related_product.wrapperEl;
	[].forEach.call(slider_related_product.slides, function(slide) {
	slide.style.height = "";
	});

	setTimeout(() => {
		[].forEach.call(slider_related_product.slides, function(slide) {
		slide.style.height = slider_related_product_wrapper.clientHeight + "px";
		});
	}, 300);
}

if(slider_related_product) {
	slider_related_product_height();

	window.addEventListener('resize', () => slider_related_product_height());
}



const slider_popular_product = new Swiper('#slider_popular_product', {
  	// Optional parameters
  	// loop: true,
	slidesPerView: 4,
	spaceBetween: 16,
	simulateTouch: false,

	breakpoints: {
		0: {
			slidesPerView: 1.8,
			spaceBetween: 10
		},

		540: {
			slidesPerView: 2.2,
			spaceBetween: 16
		},

		768: {
			slidesPerView: 2.8,
			spaceBetween: 16
		},

		900: {
			slidesPerView: 3.8,
			spaceBetween: 16
		},

		1050: {
			slidesPerView: 4,
			spaceBetween: 16
		},
	},
 
	scrollbar: {
		el: '#slider_popular_product .swiper-scrollbar',
		clickable: true
	},
});


const slider_popular_product_height = () => {
	const slider_popular_product_wrapper = slider_popular_product.wrapperEl;
	[].forEach.call(slider_popular_product.slides, function(slide) {
	slide.style.height = "";
	});

	setTimeout(() => {
		[].forEach.call(slider_popular_product.slides, function(slide) {
		slide.style.height = slider_popular_product_wrapper.clientHeight + "px";
		});
	}, 300);
}

if(slider_popular_product) {
	slider_popular_product_height();

	window.addEventListener('resize', () => slider_popular_product_height());
}




const slider_new_product = new Swiper('#slider_new_product', {
  	// Optional parameters
  	// loop: true,
	slidesPerView: 4,
	spaceBetween: 16,
	simulateTouch: false,

	breakpoints: {
		0: {
			slidesPerView: 1.8,
			spaceBetween: 10
		},

		540: {
			slidesPerView: 2.2,
			spaceBetween: 16
		},

		768: {
			slidesPerView: 2.8,
			spaceBetween: 16
		},

		900: {
			slidesPerView: 3.8,
			spaceBetween: 16
		},

		1050: {
			slidesPerView: 4,
			spaceBetween: 16
		},
	},
 
	scrollbar: {
		el: '#slider_new_product .swiper-scrollbar',
		clickable: true
	},
});

const slider_new_product_height = () => {
	const slider_new_product_wrapper = slider_new_product.wrapperEl;
	[].forEach.call(slider_new_product.slides, function(slide) {
	slide.style.height = "";
	});

	setTimeout(() => {
		[].forEach.call(slider_new_product.slides, function(slide) {
		slide.style.height = slider_new_product_wrapper.clientHeight + "px";
		});
	}, 300);
}

if(slider_new_product) {
	slider_new_product_height();

	window.addEventListener('resize', () => slider_new_product_height());
}






// product slider

const product_thumbs = new Swiper("#product_thumbs", {
    spaceBetween: 0,
    slidesPerView: 'auto',
    // freeMode: true,
    // watchSlidesVisibility: true,
    // watchSlidesProgress: true,

	direction: 'vertical',

	navigation: {
		nextEl: "#product_thumbs .nav-next",
		prevEl: "#product_thumbs .nav-prev",
    },
});
const product_main = new Swiper("#product_main", {
    spaceBetween: 10,
	simulateTouch: false,
    
    thumbs: {
      	swiper: product_thumbs,
    },
});