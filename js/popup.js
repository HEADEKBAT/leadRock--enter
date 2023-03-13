/** @format */

document.addEventListener('DOMContentLoaded', () => {
	(function () {
		// коллекция всех элементов на странице, которые могут открывать всплывающие окна
		// их отличительной особенность является наличие атрибута '[data-modal]'
		var mOpen = window.document.querySelectorAll('[data-modal]');
		// если нет элементов управления всплывающими окнами, прекращаем работу скрипта
		if (mOpen.length == 0) return;

		// подложка под всплывающее окно
		const overlay = document.querySelector('.overlay'),
			// коллекция всплывающих окон
			modals = document.querySelectorAll('.dlg-modal'),
			// коллекция всех элементов на странице, которые могут
			// закрывать всплывающие окна
			// их отличительной особенность является наличие атрибута '[data-close]'
			mClose = document.querySelectorAll('[data-close]');
		// флаг всплывающего окна: false - окно закрыто, true - открыто
		let mStatus = false;

		for (let el of mOpen) {
			el.addEventListener('click', function (e) {
				// используюя атрибут [data-modal], определяем ID всплывающего окна,
				// которое требуется открыть
				// по значению ID получаем ссылку на элемент с таким идентификатором
				let modalId = el.dataset.modal,
					modal = document.getElementById(modalId);
				// вызываем функцию открытия всплывающего окна, аргументом
				// является объект всплывающего окна
				modalShow(modal);
			});
		}

		// регистрируются обработчики событий на элементах, закрывающих
		// всплывающие окна
		for (let el of mClose) {
			el.addEventListener('click', modalClose);
		}

		// регистрируются обработчик события нажатия на клавишу
		document.addEventListener('keydown', modalClose);

		function modalShow(modal) {
			// показываем подложку всплывающего окна
			overlay.classList.remove('fadeOut');
			overlay.classList.add('fadeIn');

			// определяем тип анимации появления всплывающего окна
			// убираем и добавляем классы, соответствующие типу анимации
			if (typeAnimate === 'fade') {
				modal.classList.remove('fadeOut');
				modal.classList.add('fadeIn');
			} else if (typeAnimate === 'slide') {
				modal.classList.remove('slideOutUp');
				modal.classList.add('slideInDown');
			}
			// выставляем флаг, обозначающий, что всплывающее окно открыто
			mStatus = true;
		}

		function modalClose(event) {
			if (mStatus && (event.type != 'keydown' || event.keyCode === 27)) {
				// обходим по очереди каждый элемент коллекции modals (каждое всплывающее окно)
				// и в зависимости от типа анимации, используемой на данной странице,
				// удаляем класс анимации открытия окна и добавляем класс анимации закрытия
				for (let modal of modals) {
					if (typeAnimate == 'fade') {
						modal.classList.remove('fadeIn');
						modal.classList.add('fadeOut');
					} else if (typeAnimate == 'slide') {
						modal.classList.remove('slideInDown');
						modal.classList.add('slideOutUp');
					}
				}

				// закрываем overlay
				overlay.classList.remove('fadeIn');
				overlay.classList.add('fadeOut');
				// сбрасываем флаг, устанавливая его значение в 'false'
				// это значение указывает нам, что на странице нет открытых
				// всплывающих окон
				mStatus = false;
			}
		}
	})();
	//=================
	//Menu
	let unlock = true;
	let iconMenu = document.querySelector('.icon-menu');
	if (iconMenu != null) {
		let delay = 500;
		let menuBody = document.querySelector('.menu__body');
		iconMenu.addEventListener('click', function (e) {
			if (unlock) {
				body_lock(delay);
				iconMenu.classList.toggle('_active');
				menuBody.classList.toggle('_active');
			}
		});
	}
	function menu_close() {
		let iconMenu = document.querySelector('.icon-menu');
		let menuBody = document.querySelector('.menu__body');
		iconMenu.classList.remove('_active');
		menuBody.classList.remove('_active');
	}
	//=================
	//BodyLock
	function body_lock(delay) {
		let body = document.querySelector('body');
		if (body.classList.contains('_lock')) {
			body_lock_remove(delay);
		} else {
			body_lock_add(delay);
		}
	}
	function body_lock_remove(delay) {
		let body = document.querySelector('body');
		if (unlock) {
			let lock_padding = document.querySelectorAll('._lp');
			setTimeout(() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = '0px';
				}
				body.style.paddingRight = '0px';
				body.classList.remove('_lock');
			}, delay);

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}
	function body_lock_add(delay) {
		let body = document.querySelector('body');
		if (unlock) {
			let lock_padding = document.querySelectorAll('._lp');
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight =
					window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			}
			body.style.paddingRight =
				window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			body.classList.add('_lock');

			unlock = false;
			setTimeout(function () {
				unlock = true;
			}, delay);
		}
	}
	//=================
});

// const popupLinks = document.querySelectorAll('.popup-link');
// const body = document.querySelector('body');
// const lockPadding = document.querySelectorAll('.lock-padding');

// let unlock = true;

// const timeout = 800;

// if (popupLinks.length > 0) {
// 	for (let index = 0; index < popupLinks.length; index++) {
// 		const popapLink = popupLinks[index];
// 		popapLink.addEventListener('click', function (e) {
// 			const popupName = popapLink.getAttribute('href').replace('#', '');
// 			const curentPopup = document.getElementById(popupName);
// 			popupOpen(curentPopup);
// 			e.preventDefault();
// 		});
// 	}
// }
// const PopupCloseIcon = document.querySelectorAll('.close-popup');
// if (PopupCloseIcon.length > 0) {
// 	for (let index = 0; index < popupLinks.length; index++) {
// 		const el = PopupCloseIcon[index];
// 		el.addEventListener('click', function (e) {
// 			popupClose(el.closest('.popup'));
// 			e.preventDefault();
// 		});
// 	}
// }
// function popupOpen(curentPopup) {
// 	const popupActive = document.querySelector('.popup.open');
// 	if (popupActive) {
// 		popupClose(popupActive, false);
// 	} else {
// 		bodyLock();
// 	}
// 	curentPopup.classList.add('open');
// 	curentPopup.addEventListener('click', function (e) {
// 		if (!e.target.closest('.popup__content')) {
// 			popupClose(e.target.closest('.popup'));
// 		}
// 	});
// }

// function popupClose(popupActive, duUnlock = true) {
//     if(unlock) {
//         popupActive.classList.remove('open');
//         if(duUnlock){
//             duUnlock()
//         }
//     }
// }
