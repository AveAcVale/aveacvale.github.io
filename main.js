'use strict';

function makeStruct(keys) {
  if (!keys) return null;
  const k = keys.split(', ');
  const count = k.length;

  /** @constructor */
  function constructor() {
    for (let i = 0; i < count; i++) this[k[i]] = arguments[i];
  }
  return constructor;
}

const City = new makeStruct("id, title, produces, needs, disabled");
const Product = new makeStruct("id, title, img");

const conch = new Product(1, 'Эхо-раковина', 'conch.png')
const silk = new Product(2, 'Паучий шелк', 'silk.png')
const sakura = new Product(3, 'Сакура', 'sakura.png')
const cactus = new Product(4, 'Кактус Сэндтопии', 'cactus.png')
const tree = new Product(5, 'Зимний побег дерева', 'tree.png')
const bell = new Product(6, 'Колокольчики', 'bell.png')
const claw = new Product(7, 'Клешня краба', 'claw.png')
const bone = new Product(8, 'Кость скелетона', 'bone.png')
const feather = new Product(9, 'Перо пидженрата', 'feather.png')
const prisma = new Product(10, 'Лазерная призма', 'prisma.png')
const amber = new Product(11, 'Янтарь', 'amber.png')
const fang = new Product(12, 'Клык питона', 'fang.png')
const kappa = new Product(13, 'Самоцвет каппы', 'kappa.png')
const scale = new Product(14, 'Чешуя дракона', 'scale.png')
const fruit = new Product(15, 'Фрукт крокодил', 'fruit.png')
const tentacle = new Product(16, 'Щупальце чудовища', 'tentacle.png')
const oni = new Product(17, 'Кубок Они', 'oni.png')
const flame = new Product(18, 'Адское пламя', 'flame.png')
const horn = new Product(19, 'Рог ледяного гиганта', 'horn.png')
const soul = new Product(20, 'Узы души', 'soul.png')
const hellbat = new Product(21, 'Мембрана крыла', 'hellbat.png')
const lantern = new Product(22, 'Фонарь духов', 'lantern.png')
const ore = new Product(23, 'Волшебная руда', 'ore.png')
const mane = new Product(24, 'Sphinx Mane', 'mane.png')
const slate = new Product(25, 'Древняя фреска', 'slate.png')
const weed = new Product(26, 'Перекати-поле', 'weed.png')


const products = [conch, silk, sakura, cactus, tree, bell, claw, bone, feather, prisma, amber, fang, kappa, scale, fruit, tentacle, oni, flame, horn, soul, hellbat, lantern, ore];

const cities = [
	new City(1, 'Дракенберг', sakura),
	new City(2, 'Подземелье дракона', tree),
    new City(3, 'Гора драконов', cactus),
    new City(4, 'Злой лес', hellbat),
    new City(5, 'Эльфийский лес', conch),
    new City(6, 'Город-оазис', cactus),
    new City(7, 'Древние руины', prisma),
    new City(8, 'Великая пустыня', fruit),
    new City(9, 'Заповедник', soul),
    new City(10, 'Континент льда', tree),
    new City(11, 'Тундра Эйсвинтер', feather),
    new City(12, 'Драконья пещера', scale),
    new City(13, 'Северный Снегберг', horn),
    new City(14, 'Темнолесье', hellbat),
    new City(15, 'Кладбище', lantern),
    new City(16, 'Подземный город', ore),
    new City(17, 'Подземный вулкан', flame),
    new City(18, 'Остров сакуры', sakura),
    new City(19, 'Тысяча островов', bell),
    new City(20, 'Остров вихрей', kappa),
    new City(21, 'Остров Они', oni),
    new City(22, 'Коралловый риф', conch),
    new City(23, 'Затонувшие корабли', claw),
    new City(24, 'Зона шторма', amber),
    new City(25, 'Спокойное море', tentacle)
];

class DynamicSelect {

    constructor(element, options = {}) {
        let defaults = {
            placeholder: 'Select an option',
            columns: 1,
            name: '',
            width: '',
            height: '',
            data: [],
			selectedVal: 0,
            onChange: function() {}
        };
        this.options = Object.assign(defaults, options);
		this.selectedValue = this.options.selectedVal;
        this.selectElement = typeof element === 'string' ? document.querySelector(element) : element;
        for(const prop in this.selectElement.dataset) {
            if (this.options[prop] !== undefined) {
                this.options[prop] = this.selectElement.dataset[prop];
            }
        }
        this.element = this._template();
        this.selectElement.replaceWith(this.element);
        this._updateSelected();
        this._eventHandlers();
    }

    _template() {
        let optionsHTML = '';
        for (let i = 0; i < this.data.length; i++) {
            let optionWidth = 100 / this.columns;
            let optionContent = `
				${this.data[i].img ? `<img src="img/${this.data[i].img}" alt="${this.data[i].title}" style="'width: 64; height: 64;'">` : ''}
				${this.data[i].title ? '<span class="dynamic-select-option-text">' + this.data[i].title + '</span>' : ''}
			`;
            optionsHTML += `
                <div class="dynamic-select-option${this.data[i].id == this.selectedValue ? ' dynamic-select-selected' : ''}" data-value="${this.data[i].id}" style="width:${optionWidth}%;${this.height ? 'height:' + this.height + ';' : ''}">
                    ${optionContent}
                </div>
            `;
        }
        let template = `
            <div class="dynamic-select ${this.name}"${this.selectElement.id ? ' id="' + this.selectElement.id + '"' : ''} style="${this.width ? 'width:' + this.width + ';' : ''}${this.height ? 'height:' + this.height + ';' : ''}">
                <input type="hidden" name="${this.name}" value="${this.selectedValue}">
                <div class="dynamic-select-header" style="${this.width ? 'width:' + this.width + ';' : ''}${this.height ? 'height:' + this.height + ';' : ''}"><span class="dynamic-select-header-placeholder">${this.placeholder}</span></div>
                <div class="dynamic-select-options" style="${this.options.dropdownWidth ? 'width:' + this.options.dropdownWidth + ';' : ''}${this.options.dropdownHeight ? 'height:' + this.options.dropdownHeight + ';' : ''}">${optionsHTML}</div>
            </div>
        `;
        let element = document.createElement('div');
        element.innerHTML = template;
        return element;
    }

    _eventHandlers() {
        this.element.querySelectorAll('.dynamic-select-option').forEach(option => {
            option.onclick = () => {
                this.element.querySelectorAll('.dynamic-select-selected').forEach(selected => selected.classList.remove('dynamic-select-selected'));
                option.classList.add('dynamic-select-selected');
                this.element.querySelector('.dynamic-select-header').innerHTML = option.innerHTML;
                this.element.querySelector('input').value = option.getAttribute('data-value');
                //this.data.forEach(data => data.selected = false);
                //this.data.filter(data => data.id == option.getAttribute('data-value'))[0].selected = true;
				this.selectedValue = option.getAttribute('data-value');
                this.element.querySelector('.dynamic-select-header').classList.remove('dynamic-select-header-active');
                this.options.onChange(
					option.getAttribute('data-value'),
					option.querySelector('.dynamic-select-option-text') ? option.querySelector('.dynamic-select-option-text').innerHTML : '',
					option,
					this.data.filter(data => data.id == option.getAttribute('data-value'))[0]);
            };
        });
        this.element.querySelector('.dynamic-select-header').onclick = () => {
            this.element.querySelector('.dynamic-select-header').classList.toggle('dynamic-select-header-active');
        };  
        if (this.selectElement.id && document.querySelector('label[for="' + this.selectElement.id + '"]')) {
            document.querySelector('label[for="' + this.selectElement.id + '"]').onclick = () => {
                this.element.querySelector('.dynamic-select-header').classList.toggle('dynamic-select-header-active');
            };
        }
        document.addEventListener('click', event => {
            if (!event.target.closest('.' + this.name) && !event.target.closest('label[for="' + this.selectElement.id + '"]')) {
                this.element.querySelector('.dynamic-select-header').classList.remove('dynamic-select-header-active');
            }
        });
    }

    _updateSelected() {
        if (this.selectedValue) {
            this.element.querySelector('.dynamic-select-header').innerHTML = this.element.querySelector('.dynamic-select-selected').innerHTML;
        }
    }

    set data(value) {
        this.options.data = value;
    }

    get data() {
        return this.options.data;
    }

    set selectElement(value) {
        this.options.selectElement = value;
    }

    get selectElement() {
        return this.options.selectElement;
    }

    set element(value) {
        this.options.element = value;
    }

    get element() {
        return this.options.element;
    }

    set placeholder(value) {
        this.options.placeholder = value;
    }

    get placeholder() {
        return this.options.placeholder;
    }

    set columns(value) {
        this.options.columns = value;
    }

    get columns() {
        return this.options.columns;
    }

    set name(value) {
        this.options.name = value;
    }

    get name() {
        return this.options.name;
    }

    set width(value) {
        this.options.width = value;
    }

    get width() {
        return this.options.width;
    }

    set height(value) {
        this.options.height = value;
    }

    get height() {
        return this.options.height;
    }

}

function nextStep(city, cities) {
    return cities.filter(obj => obj.needs === city.produces);
}

// Функция для удаления города
function removeCity(city, cities) {
    return cities.filter(obj => obj !== city);
}

// Функция для нахождения маршрутов
function findRoutes(currentCity, startCity, cities, currentRoute, allRoutes) {
    currentRoute.push(currentCity);
    
    if (currentRoute.length > 1 && currentCity === startCity) {
        allRoutes.push([...currentRoute]); // Копируем текущий маршрут
    }

    const possibleCities = cities.filter(obj => obj.needs === currentCity.produces);
    for (const nextCity of possibleCities) {
        findRoutes(nextCity, startCity, removeCity(nextCity, cities), currentRoute, allRoutes);
    }
    currentRoute.pop(); // Убираем текущий город из маршрута
}

// Функция для удаления дубликатов списков
function removeDuplicateLists(listOfLists) {
    const uniqueSets = new Set(); // Множество для хранения уникальных наборов
    const uniqueLists = []; // Список для хранения уникальных списков
    
    for (const list of listOfLists) {
        const currentSet = new Set(list.toSorted((a,b) => a.id - b.id)); // Преобразуем список в множество

        // Проверяем, уже существует ли этот набор
        if (!uniqueSets.has(JSON.stringify([...currentSet]))) {
            uniqueSets.add(JSON.stringify([...currentSet])); // Добавляем набор в множество 
            uniqueLists.push(list); // Сохраняем оригинальный список
        }
    }
    
    return uniqueLists;
}

function removeDuplicateLists2(listOfLists) {
    const uniqueSets = new Set(); // Множество для хранения уникальных наборов элементов
    const uniqueLists = [];        // Массив для хранения уникальных списков

    for (const lst of listOfLists) {
        // Преобразуем список в строку для игнорирования порядка
		const currentSet = new Set(lst);
        //const currentSet = JSON.stringify(testSet); // Сортируем и превращаем в строку

        // Проверяем, был ли такой набор элементов уже добавлен
        if (!uniqueSets.has(currentSet)) {
            uniqueSets.add(currentSet); // Добавляем этот набор в множество
            uniqueLists.push(lst);       // Сохраняем оригинальный список
        }
    }

    return uniqueLists;
}

function getRoutes() {
	const routes = [];
	const $routesList = $('#routes-list');
	$routesList.empty();

	const workCities = cities.filter(data => data.disabled != true);
	for (const startingCity of workCities) {
		findRoutes(startingCity, startingCity, workCities, [], routes);
	}
	const uniqueRoutes = removeDuplicateLists(routes);
	
	
	
	for (const route of uniqueRoutes) {
		const $routeItem = $('<li/>');
		for (const [i, city] of route.entries()) {
			$routeItem.append($(`<span>${city.title}${(i===route.length-1)?'':' => '}</span>`));
		}
		
		$routesList.append($routeItem);
	}
}

$(document).ready(function() {
    const $cityList = $('#city-list');

    cities.forEach(city => {
        const $cityItem = $(`
            <li>
				<span class="rowspan"><input type="checkbox" checked id="${city.id}"></span>
                <span class="city">${city.title}</span>
				<span class="rowspan"><select class="custom-select"></select></span>
                <span class="product">${city.produces.title}</span>
            </li>
        `);
		const $select = new DynamicSelect($cityItem.find(`select`)[0], {
			width: '300px',
			placeholder: 'Выберите товар',
			name: 'product-'+city.id,
			cityId: city.id,
			columns: 1,
			data: products,
			selectedVal: localStorage.getItem('product-'+city.id),
			onChange: function(value, text, option, data) {
				localStorage.setItem(this.name, value);
				cities.filter(city => city.id == this.cityId)[0].needs = data;
			}
		});
		city.needs = products.filter(data => data.id.toString() == localStorage.getItem('product-'+city.id))[0];
        $cityList.append($cityItem);
    });
	
	$(".reset_btn").click(() => {localStorage.clear(); location.reload();})
	$(".build_btn").click(() => {getRoutes();})
	$('input[type="checkbox"]').change(function() {
		cities.filter(data => data.id == $(this).attr('id'))[0].disabled = !$(this).is(':checked');
	});
});