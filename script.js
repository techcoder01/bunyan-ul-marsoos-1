// Typing Animation
const typingText = document.getElementById('typing-text');
const text = "Bunyan al Marsoos - 10 May 2025";
let index = 0;

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100); // Adjust typing speed here
    }
}

document.addEventListener('DOMContentLoaded', type);


// Add soldier data
const soldiers = [
    { name: 'Squadron Leader Usman Yousuf', image: 'public/1.jpg' },
    { name: 'Chief Technician Aurangzeb', image: 'public/2.jpg' },
    { name: 'Corporal Technician Farooq', image: 'public/3.jpg' },
    { name: 'Senior Technician Mubashir', image: 'public/4.jpg' },
    { name: 'Captain Abdullah', image: 'public/download (1).jpg' },
    { name: 'Major Raza', image: 'public/download (2).jpg' },
    { name: 'Subedar Ahmed', image: 'public/download (3).jpg' },
    { name: 'Sepoy Ali', image: 'public/images (4).jpg' }
];

const soldierGallery = document.querySelector('.soldier-gallery');
soldiers.forEach(soldier => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${soldier.image}" alt="${soldier.name}">
        <p>${soldier.name}</p>
    `;
    soldierGallery.appendChild(div);
});



// Add COAS data
const coas = { name: 'General Asim Munir', image: 'public/General_Asim_Munir_(Pakistan).jpg' };
const coasInfo = document.querySelector('.coas-info');
coasInfo.innerHTML = `
    <img src="${coas.image}" alt="${coas.name}">
    <h3>${coas.name}</h3>
`;

// Add weapon data
const weapons = [
    {
        name: 'Fatah-II MRLS',
        image: 'public/fatah.webp',
        details: 'The Fatah-II is a guided multi-launch rocket system (GMLRS) developed by Pakistan, capable of engaging targets up to 400 km with high precision.'
    },
    {
        name: 'Air Defence Systems',
        image: 'public/Pakistan-Air-Defence-Systems-and-List.jpg',
        details: 'Pakistan operates a variety of advanced air defence systems, including the HQ-9/P HIMADS, ensuring protection against aerial threats.'
    },
    {
        name: 'Ballistic Missiles',
        image: 'public/Pakistinian_Missiles_2021-scaled.jpg',
        details: 'Pakistan possesses a diverse range of ballistic missiles, such as the Shaheen and Ghauri series, forming a crucial part of its strategic deterrence.'
    },
    {
        name: 'JF-17 Thunder',
        image: 'public/jf 17 thunder.jpg',
        details: 'The JF-17 Thunder is a lightweight, single-engine, multi-role combat aircraft developed jointly by the Pakistan Aeronautical Complex and the Chengdu Aircraft Corporation of China.'
    }
];

const weaponGallery = document.querySelector('.weapon-gallery');
weapons.forEach(weapon => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${weapon.image.replace('400/250', '220/180')}" alt="${weapon.name}">
        <p>${weapon.name}</p>
        <button class="details-btn">Details</button>
    `;
    // Add data attributes to the button for the modal
    const button = div.querySelector('.details-btn');
    button.dataset.name = weapon.name;
    button.dataset.image = weapon.image;
    button.dataset.details = weapon.details;

    weaponGallery.appendChild(div);
});

// Modal Logic
const modal = document.getElementById('weaponModal');
const closeButton = document.querySelector('.close-button');
const modalWeaponName = document.getElementById('modal-weapon-name');
const modalWeaponImage = document.getElementById('modal-weapon-image');
const modalWeaponDetails = document.getElementById('modal-weapon-details');

weaponGallery.addEventListener('click', e => {
    if (e.target.classList.contains('details-btn')) {
        const button = e.target;
        modalWeaponName.textContent = button.dataset.name;
        modalWeaponImage.src = button.dataset.image;
        modalWeaponDetails.textContent = button.dataset.details;
        modal.style.display = 'block';
    }
});

closeButton.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


// Scroll Animation
// Use a timeout to ensure all cards are loaded before observing
setTimeout(() => {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });
}, 200);

// Auto-play videos when videos section comes into view
const videoSection = document.getElementById('videos');
const videos = document.querySelectorAll('.video-item video');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Auto-play all videos when section is visible
            videos.forEach(video => {
                video.play().catch(e => {
                    // Some browsers might block autoplay, this is expected
                    console.log('Video autoplay was prevented:', e);
                });
            });
        } else {
            // Pause videos when section is not visible
            videos.forEach(video => {
                video.pause();
            });
        }
    });
}, { threshold: 0.3 }); // Trigger when 30% of section is visible

if (videoSection) {
    videoObserver.observe(videoSection);
}