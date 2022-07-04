function burgerMenu() {
	const burger = document.querySelector('.menu-header__burger-menu')
	const menu = document.querySelector('.menu-header__list')
	const body = document.querySelector('body')
	burger.addEventListener('click', () => {
		if (!menu.classList.contains('active')) {
			menu.classList.add('active')
			burger.classList.add('active-burger')
			body.classList.add('locked')
		} else {
			menu.classList.remove('active')
			burger.classList.remove('active-burger')
			body.classList.remove('locked')
		}
	})

	window.addEventListener('resize', () => {
		if (window.innerWidth > 767.98) {
			menu.classList.remove('active')
			burger.classList.remove('active-burger')
			body.classList.remove('locked')
		}
	})
}



burgerMenu();