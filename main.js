class City {
    constructor(id, name, produces = null) {
        this.id = id;
        this.title = name;
        this.produces = produces;
        this.needs = null;
        this.price = 100;
        this.disabled = false;
    }
}

class Product {
    constructor(id, name, img) {
        this.id = id;
        this.title = name;
        this.img = img;
    }
}

// Products
const conch = new Product(1, 'Эхо-раковина', 'conch.png');
const silk = new Product(2, 'Паучий шелк', 'silk.png');
const sakura = new Product(3, 'Сакура', 'sakura.png');
const cactus = new Product(4, 'Кактус Сэндтопии', 'cactus.png');
const tree = new Product(5, 'Зимний побег дерева', 'tree.png');
const bell = new Product(6, 'Колокольчики', 'bell.png');
const claw = new Product(7, 'Клешня краба', 'claw.png');
const bone = new Product(8, 'Кость скелетона', 'bone.png');
const feather = new Product(9, 'Перо пидженрата', 'feather.png');
const prisma = new Product(10, 'Лазерная призма', 'prisma.png');
const amber = new Product(11, 'Янтарь', 'amber.png');
const fang = new Product(12, 'Клык питона', 'fang.png');
const kappa = new Product(13, 'Самоцвет каппы', 'kappa.png');
const scale = new Product(14, 'Чешуя дракона', 'scale.png');
const fruit = new Product(15, 'Фрукт крокодил', 'fruit.png');
const tentacle = new Product(16, 'Щупальце чудовища', 'tentacle.png');
const oni = new Product(17, 'Кубок Они', 'oni.png');
const flame = new Product(18, 'Адское пламя', 'flame.png');
const horn = new Product(19, 'Рог ледяного гиганта', 'horn.png');
const soul = new Product(20, 'Узы души', 'soul.png');
const hellbat = new Product(21, 'Перепонка крыла хэлбэт', 'hellbat.png');
const lantern = new Product(22, 'Фонарь духов', 'lantern.png');
const ore = new Product(23, 'Кусок волшебной руды', 'ore.png');
const mane = new Product(24, 'Грива Сфинкса', 'mane.png');
const slate = new Product(25, 'Древняя табличка', 'slate.png');
const weed = new Product(26, 'Перекати-поле', 'weed.png');

// Cities
const berg = new City(1, 'Дракенберг', sakura);
const dungeon = new City(2, 'Подземелье дракона', tree);
const mountain = new City(3, 'Гора драконов');
const forest = new City(4, 'Злой лес');
const elven = new City(5, 'Эльфийский лес', conch);
const oasis = new City(6, 'Город-оазис');
const ruins = new City(7, 'Древние руины');
const sand = new City(8, 'Великая пустыня', fruit);
const sanct = new City(9, 'Заповедник');
const ice = new City(10, 'Континент льда', tree);
const tundra = new City(11, 'Тундра Эйсвинтер', feather);
const cave = new City(12, 'Драконья пещера', scale);
const snow = new City(13, 'Северный Снегберг', horn);
const darkwood = new City(14, 'Темнолесье');
const grave = new City(15, 'Кладбище');
const under = new City(16, 'Подземный город');
const volcano = new City(17, 'Подземный вулкан', flame);
const island = new City(18, 'Остров сакуры', sakura);
const isles = new City(19, 'Тысяча островов', bell);
const whirl = new City(20, 'Остров вихрей', kappa);
const oniisle = new City(21, 'Остров Они', oni);
const reef = new City(22, 'Коралловый риф', conch);
const ship = new City(23, 'Затонувшие корабли', claw);
const storm = new City(24, 'Зона шторма', amber);
const sea = new City(25, 'Спокойное море', tentacle);

const stages = [
    [mountain, cactus, forest, silk, oasis, cactus, ruins, prisma, sanct, soul, darkwood, silk, grave, bone, under, fang],
    [mountain, cactus, forest, hellbat, oasis, cactus, ruins, prisma, sanct, soul, darkwood, hellbat, grave, lantern, under, ore],
    [mountain, weed, forest, hellbat, oasis, weed, ruins, slate, sanct, mane, darkwood, hellbat, grave, lantern, under, ore]
];
const products = [conch, silk, sakura, cactus, tree, bell, claw, bone, feather, prisma, amber, fang, kappa, scale, fruit, tentacle, oni, flame, horn, soul, hellbat, lantern, ore, mane, slate, weed];
const cities = [berg, dungeon, mountain, forest, elven, oasis, ruins, sand, sanct, ice, tundra, cave, snow, darkwood, grave, under, volcano, island, isles, whirl, oniisle, reef, ship, storm, sea];

// State sync
function syncStateToURL() {
    const params = new URLSearchParams();
    params.set('stage', localStorage.getItem('stage') || '1');
    
    let parts = [];
    cities.forEach(c => {
        let p = localStorage.getItem('product-' + c.id) || '';
        let pr = parseInt(localStorage.getItem('price-' + c.id) || '100') - 100;
        let d = c.disabled ? '1' : '';
        
        if (d === '') {
            if (pr === 0) {
                parts.push(p);
            } else {
                parts.push(`${p}-${pr}`);
            }
        } else {
            parts.push(`${p}-${pr}-${d}`);
        }
    });
    
    // Remove trailing empty states to shorten URL
    while(parts.length > 0 && parts[parts.length-1] === '') {
        parts.pop();
    }
    
    if (parts.length > 0) {
        params.set('c', parts.join('.'));
    }
    
    const newUrl = window.location.pathname + '?' + params.toString();
    try {
        window.history.replaceState({}, '', newUrl);
    } catch (e) {
        console.warn('URL state sync is disabled on local files (file:///).');
    }
}

function loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('stage') && !params.has('c')) return;

    if (params.has('stage')) {
        localStorage.setItem('stage', params.get('stage'));
    }
    if (params.has('c')) {
        const cStr = params.get('c');
        if (cStr.includes('_')) {
            // Old format backward compatibility
            const citiesData = cStr.split('-');
            citiesData.forEach(cd => {
                const [id, prodId, price, disabled] = cd.split('_');
                if (prodId && prodId !== '0') localStorage.setItem('product-' + id, prodId);
                if (price) localStorage.setItem('price-' + id, price);
                if (disabled === '1') {
                    const city = cities.find(c => c.id == id);
                    if(city) city.disabled = true;
                }
            });
        } else {
            // New compressed format
            const citiesData = cStr.split('.');
            citiesData.forEach((data, index) => {
                if (!data) return; // empty slot
                const [prodId, priceOffset, disabled] = data.split('-');
                const city = cities[index];
                if (!city) return;
                
                if (prodId) localStorage.setItem('product-' + city.id, prodId);
                if (priceOffset) localStorage.setItem('price-' + city.id, (parseInt(priceOffset) + 100).toString());
                if (disabled === '1') city.disabled = true;
            });
        }
    }
}

// Logic
function nextStep(city, citiesList) {
    return citiesList.filter(obj => obj.needs === city.produces);
}
function removeCity(city, citiesList) {
    return citiesList.filter(obj => obj !== city);
}

function findRoutes(currentCity, startCity, citiesList, currentRoute, allRoutes) {
    currentRoute.push(currentCity);
    if (currentRoute.length > 1 && currentCity === startCity) {
        allRoutes.push([...currentRoute]);
    }
    const possibleCities = citiesList.filter(obj => obj.needs === currentCity.produces);
    for (const nextCity of possibleCities) {
        findRoutes(nextCity, startCity, removeCity(nextCity, citiesList), currentRoute, allRoutes);
    }
    currentRoute.pop();
}

function removeDuplicateLists(listOfLists) {
    const uniqueSets = new Set();
    const uniqueLists = [];
    for (const list of listOfLists) {
        const currentSet = new Set([...list].sort((a,b) => a.id - b.id));
        const hash = JSON.stringify([...currentSet].map(c => c.id));
        if (!uniqueSets.has(hash)) {
            uniqueSets.add(hash);
            uniqueLists.push(list);
        }
    }
    return uniqueLists;
}

function calculateProfit(route) {
    let total = 0;
    for(let i=1; i<route.length; i++) {
        total += (route[i].price - 100);
    }
    return total;
}

function renderRoutes() {
    const routesSection = document.getElementById('routes-section');
    const routesList = document.getElementById('routes-list');
    routesList.innerHTML = '';
    
    const routes = [];
    const workCities = cities.filter(data => data.disabled !== true);
    for (const startingCity of workCities) {
        if (!startingCity.produces) continue;
        findRoutes(startingCity, startingCity, workCities, [], routes);
    }
    
    let uniqueRoutes = removeDuplicateLists(routes);
    
    if (uniqueRoutes.length === 0) {
        routesList.innerHTML = `<p style="text-align:center; color: var(--text-secondary);">Маршруты не найдены. Убедитесь, что заполнены нужные товары.</p>`;
        routesSection.style.display = 'block';
        return;
    }

    uniqueRoutes.sort((a, b) => {
        const profitA = calculateProfit(a);
        const profitB = calculateProfit(b);
        if (profitB !== profitA) return profitB - profitA;
        return a.length - b.length;
    });

    uniqueRoutes.forEach(route => {
        const card = document.createElement('div');
        card.className = 'route-card';
        const totalProfit = calculateProfit(route);
        
        card.innerHTML = `
            <div class="route-meta">
                <div style="display:flex; align-items:center; gap: 1rem;">
                    <span class="route-profit">Доход: ${totalProfit}%</span>
                    <span class="route-length">${route.length - 1} остановок</span>
                </div>
                <button class="icon-button sm copy-route-btn" title="Копировать маршрут">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
            </div>
            <div class="route-path">
                ${route.map((city, i) => `
                    <div class="route-node">
                        ${city.produces && i < route.length - 1 ? `<img src="img/${city.produces.img}" alt="${city.produces.title}" title="${city.produces.title}">` : ''}
                        <span>${city.title}</span>
                        ${i > 0 ? `<span class="route-price-tag">${city.price}%</span>` : ''}
                    </div>
                    ${i < route.length - 1 ? `<span class="route-arrow">➜</span>` : ''}
                `).join('')}
            </div>
        `;
        
        const copyBtn = card.querySelector('.copy-route-btn');
        copyBtn.addEventListener('click', () => {
            let text = `Доход: ${totalProfit}% (${route.length - 1} остановок)\n`;
            text += route.map((c, i) => {
                let step = c.title;
                if (i > 0) step += ` (${c.price}%)`;
                return step;
            }).join(' ➜ ');
            
            navigator.clipboard.writeText(text).then(() => {
                const toast = document.getElementById('toast');
                toast.textContent = 'Маршрут скопирован!';
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.textContent = 'Ссылка скопирована!', 300);
                }, 3000);
            });
        });
        
        routesList.appendChild(card);
    });
    
    routesSection.style.display = 'block';
    routesSection.scrollIntoView({ behavior: 'smooth' });
}

function changeStage(stageId) {
    localStorage.setItem('stage', stageId);
    
    cities.forEach(c => {
        if(c.id === 3 || c.id === 4 || c.id === 6 || c.id === 7 || c.id === 9 || c.id === 14 || c.id === 15 || c.id === 16) {
            c.produces = null;
        }
    });

    const stageArr = stages[stageId - 1];
    for (let i = 0; i < stageArr.length; i += 2) {
        const city = stageArr[i];
        const product = stageArr[i+1];
        city.produces = product;
    }
    
    syncStateToURL();
}

// Custom Select Implementation
function createCustomDropdown(container, city) {
    let savedProdId = localStorage.getItem('product-' + city.id);
    let currentSelection = savedProdId ? products.find(p => p.id == savedProdId) : null;
    
    const header = document.createElement('div');
    header.className = 'cs-header';
    const renderHeader = () => {
        if (currentSelection) {
            header.innerHTML = `<img src="img/${currentSelection.img}"><span>${currentSelection.title}</span>`;
        } else {
            header.innerHTML = `<span class="cs-placeholder">-- Выберите товар --</span>`;
        }
    };
    renderHeader();
    
    const dropdown = document.createElement('div');
    dropdown.className = 'cs-dropdown';
    
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'cs-search-wrapper';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'cs-search';
    searchInput.placeholder = 'Поиск...';
    searchWrapper.appendChild(searchInput);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'cs-options';
    
    dropdown.appendChild(searchWrapper);
    dropdown.appendChild(optionsContainer);
    container.appendChild(header);
    container.appendChild(dropdown);
    
    const updateOptions = () => {
        optionsContainer.innerHTML = '';
        // Add "None" option
        const noneOpt = document.createElement('div');
        noneOpt.className = 'cs-option';
        noneOpt.innerHTML = `<span>-- Очистить --</span>`;
        noneOpt.onclick = () => {
            currentSelection = null;
            localStorage.removeItem('product-' + city.id);
            city.needs = null;
            renderHeader();
            container.classList.remove('open');
            const card = container.closest('.city-card');
            if (card) card.style.zIndex = '';
            syncStateToURL();
        };
        optionsContainer.appendChild(noneOpt);
        
        products.forEach(p => {
            const opt = document.createElement('div');
            opt.className = 'cs-option';
            opt.innerHTML = `<img src="img/${p.img}"><span>${p.title}</span>`;
            opt.onclick = () => {
                currentSelection = p;
                localStorage.setItem('product-' + city.id, p.id);
                city.needs = p;
                renderHeader();
                container.classList.remove('open');
                const card = container.closest('.city-card');
                if (card) card.style.zIndex = '';
                syncStateToURL();
            };
            optionsContainer.appendChild(opt);
        });
    };
    
    updateOptions();
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        Array.from(optionsContainer.children).forEach(child => {
            if (child.innerText.toLowerCase().includes(term) || child.innerText.includes('--')) {
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        });
    });
    
    header.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = container.classList.contains('open');
        
        // Close all other dropdowns and reset their parent z-index
        document.querySelectorAll('.custom-select-container').forEach(c => {
            c.classList.remove('open');
            const card = c.closest('.city-card');
            if (card) card.style.zIndex = '';
        });
        
        if (!isOpen) {
            container.classList.add('open');
            const card = container.closest('.city-card');
            if (card) card.style.zIndex = '100'; // Elevate the current card
            
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
        }
    });
}

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-container')) {
        document.querySelectorAll('.custom-select-container').forEach(c => {
            c.classList.remove('open');
            const card = c.closest('.city-card');
            if (card) card.style.zIndex = '';
        });
    }
});

function initUI() {
    loadStateFromURL();
    
    const stageId = localStorage.getItem('stage') || '1';
    
    // Assign dynamic products before rendering
    changeStage(stageId);

    document.querySelectorAll('input[type="radio"][name="stage"]').forEach(radio => {
        if (radio.value === stageId) radio.checked = true;
        radio.addEventListener('change', (e) => {
            changeStage(e.target.value);
            window.location.reload();
        });
    });

    const cityList = document.getElementById('city-list');
    cityList.innerHTML = '';

    cities.forEach(city => {
        const savedProdId = localStorage.getItem('product-' + city.id);
        const savedPrice = localStorage.getItem('price-' + city.id) || 100;
        
        city.needs = savedProdId ? products.find(p => p.id == savedProdId) : null;
        city.price = parseInt(savedPrice);
        
        const li = document.createElement('li');
        li.className = 'city-card' + (city.disabled ? ' disabled' : '');
        
        li.innerHTML = `
            <div class="city-header">
                <input type="checkbox" class="city-toggle" id="chk-${city.id}" ${city.disabled ? '' : 'checked'}>
                <div class="city-info">
                    <div class="city-name" onclick="document.getElementById('chk-${city.id}').click()">${city.title}</div>
                    <div class="city-produces">${city.produces ? `Производит: <img src="img/${city.produces.img}" class="produces-icon" alt="${city.produces.title}"> ${city.produces.title}` : ''}</div>
                </div>
            </div>
            <div class="city-controls">
                <div class="custom-select-container" id="cs-${city.id}"></div>
                <div class="price-input-wrapper">
                    <input type="number" class="price-input" id="price-${city.id}" value="${savedPrice}" min="100" max="200" placeholder="100">
                    <span class="price-symbol">%</span>
                </div>
            </div>
        `;
        cityList.appendChild(li);

        const chk = document.getElementById(`chk-${city.id}`);
        chk.addEventListener('change', (e) => {
            city.disabled = !e.target.checked;
            li.className = 'city-card' + (city.disabled ? ' disabled' : '');
            syncStateToURL();
        });

        const priceInp = document.getElementById(`price-${city.id}`);
        priceInp.addEventListener('input', (e) => {
            const val = e.target.value;
            if(val) {
                localStorage.setItem('price-' + city.id, val);
                city.price = parseInt(val);
            } else {
                localStorage.removeItem('price-' + city.id);
                city.price = 100;
            }
            syncStateToURL();
        });
    });

    // Initialize custom dropdowns
    cities.forEach(city => {
        const container = document.getElementById(`cs-${city.id}`);
        createCustomDropdown(container, city);
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        localStorage.clear();
        window.location.search = '';
    });

    document.getElementById('build-btn').addEventListener('click', renderRoutes);

    document.getElementById('share-btn').addEventListener('click', () => {
        syncStateToURL();
        navigator.clipboard.writeText(window.location.href).then(() => {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        });
    });
}

document.addEventListener('DOMContentLoaded', initUI);