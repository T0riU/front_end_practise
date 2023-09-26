const data = [{
        img: './img/jpg/projects/1.jpg',
        title: '{HTML, JavaScript, SASS, React}, {Landing}, {Web}',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content ',
        technology: [{
                title: 'HTML',
                id: 'html'
            },
            {
                title: 'JavaScript',
                id: 'java-script'
            },
            {
                title: 'SASS',
                id: 'sass'
            },
            {
                title: 'React',
                id: 'react'
            },
        ],
        theme: [{
            title: 'Landing',
            id: 'landing'
        }, ],
        platform: [{
            title: 'Web',
            id: 'web'
        }],
    },
    {
        img: './img/jpg/projects/2.jpg',
        title: '{HTML, React}, {Ecommerce}, {Ios}',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content ',
        technology: [{
                title: 'HTML',
                id: 'html'
            },
            {
                title: 'React',
                id: 'react'
            },
        ],
        theme: [{
            title: 'Ecommerce',
            id: 'ecommerce'
        }, ],
        platform: [{
            title: 'Ios',
            id: 'ios'
        }],
    }, {
        img: './img/jpg/projects/3.jpg',
        title: '{HTML, JavaScript, SASS, React}, {Blog}, {Android}',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content ',
        technology: [{
                title: 'HTML',
                id: 'html'
            },
            {
                title: 'JavaScript',
                id: 'java-script '
            },
            {
                title: 'SASS',
                id: 'sass'
            },
            {
                title: 'React',
                id: 'react '
            },
        ],
        theme: [{
            title: 'Blog',
            id: 'blog'
        }, ],
        platform: [{
            title: 'Android',
            id: 'android'
        }],
    },
    {
        img: './img/jpg/projects/4.jpg',
        title: '{HTML}, {Landing}, {Web}',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content ',
        technology: [{
            title: 'HTML',
            id: 'html'
        }, ],
        theme: [{
            title: 'Landing',
            id: 'landing'
        }, ],
        platform: [{
            title: 'Web',
            id: 'web'
        }],
    },
    {
        img: './img/jpg/projects/5.jpg',
        title: '{HTML}, {Landing}, {Web, Android}',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content ',
        technology: [{
            title: 'HTML',
            id: 'html'
        }, ],
        theme: [{
            title: 'Landing',
            id: 'landing'
        }, ],
        platform: [{
                title: 'Web',
                id: 'web'
            },
            {
                title: 'Android',
                id: 'android'
            }
        ],
    },
    {
        img: './img/jpg/projects/6.jpg',
        title: '{HTML, SASS}, {Blog}, {Web}',
        desc: 'This is sample project description random things are here in description This is sample project lorem ipsum generator for dummy content ',
        technology: [{
            title: 'HTML',
            id: 'html'
        }, {
            title: 'SASS',
            id: 'sass'
        }],
        theme: [{
            title: 'Blog',
            id: 'blog'
        }, ],
        platform: [{
            title: 'Web',
            id: 'web'
        }],
    }
];
const projectsContainer = document.querySelector('.js-projects-container');
const VerticalChecker = document.querySelector('.tog-btn');
const filtersForm = document.querySelector('.js-filters');
const checkbox = document.querySelector('#tog');
const activeFilters = {};
const createProjectTemplate = (project, type) => {
    return `         
        <article class="project-card ${type}">             
            <img class="img" src="${project.img}" alt="">             
            <div class="content">                 
                <h3 class="name">${project.title}</h3>                 
                <p class="desc">${project.desc}</p>                 
                <p class="stack"><b>Tech stack</b>: ${ project.technology.map(item => item.title).join(', ')} </p>                 
                <p class="stack"><b>Platform</b >: ${ project.platform.map(item => item.title).join(', ')} </p>                 
                <p class="stack"><b>Theme</b >: ${ project.theme.map(item => item.title).join(', ')}</p>                 
                <div class="actions">                     
                    <a href="" class="link">                         
                        <img class="icon" src="./img/svg/link.svg" alt=""> Live Preview
                    </a>                     
                    <a href="" class="link">                         
                        <img class="icon" src="./img/svg/github.svg" alt=""> View Code
                    </a>                
                </div>             
            </div>        
        </article>     
    `;
};

const dataRender = (data, container, isVertical) => {
    if (!(typeof data === 'object')) {

        return '';
    }
    let content = '';
    for (let i = 0; i < data.length; i++) {
        if (isVertical) {
            content += createProjectTemplate(data[i], "vertical");
        } else {
            content += createProjectTemplate(data[i], "");
        }
    }
    container.innerHTML = content;
}
const dataRenderEmpty = (container) => {
    //let content = '<div class="empty-filter"> <p class = ""> There are no items satisfy the filter</p></div>'
    let content = '<div class="empty-filter"> <p class = ""> There are no items satisfy the filter</p> <img class="noresults" src="./img/png/NoResults.png" alt="NoResults"></div>'
    container.innerHTML = content;
}
const itemIsValid = (dataItem, activeFilters) => {
    let count = 0;
    for (const activeFilterKey in activeFilters) {
        const activeFilterValue = activeFilters[activeFilterKey];
        const itemHasFilterValue = dataItem[activeFilterKey].map(item => item.id).includes(activeFilterValue);

        if (itemHasFilterValue) {
            count++;
        }
    }
    return Object.keys(activeFilters).length === count;
};
var IsVertical = false;
const RenderHtml = () => {
    const filteredData = data.filter((dataItem) => itemIsValid(dataItem, activeFilters));
    if (filteredData.length === 0) {
        dataRenderEmpty(projectsContainer);
    } else {
        dataRender(filteredData, projectsContainer, IsVertical);
    }
}

const handleFormChange = (event) => {
    const target = event.target;
    const targetValue = target.value;
    const targetName = target.name;
    if (targetValue === '') {
        delete activeFilters[targetName];
        if (!Object.keys(activeFilters).length) {
            dataRender(data, projectsContainer, IsVertical);
            return;
        }
    } else {
        activeFilters[targetName] = targetValue;
    }
    RenderHtml();
};

filtersForm.addEventListener('change', handleFormChange);

VerticalChecker.addEventListener('change', (event) => {
    IsVertical = event.target.checked;
    RenderHtml();
});

dataRender(data, projectsContainer, IsVertical);