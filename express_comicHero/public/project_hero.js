
// Search hero and API
const form = document.getElementById('search_field');
const input = document.getElementById('hero_Search');
const result = document.getElementById('print_Result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const hero_Name = input.value;

    const response = await fetch(`/api/heroes/search/${hero_Name}`);
    const data = await response.json();


    const hero = data.results[0];
    const heroID = hero.id;
    

    result.innerHTML = 
        `<h2 style="text-align: center;">${hero.name}</h2>
        
        <div class="swiper" style="max-width: 300px; margin: 20px auto;">
            <div class="swiper-wrapper" style="height:10px>
                <div class="swiper-slide">
                    <img src="/api/image-proxy?url=${encodeURIComponent(hero.image.url)}" width="300"/>
                </div>
                <div class="swiper_slide" style="background: #333; color: white; padding: 40px; text-align: center;">
              <h3>Biography</h3>
                    <p><strong>Full Name:</strong> ${hero.biography['full-name']}</p>
                    <p><strong>Publisher:</strong> ${hero.biography.publisher}</p>
                    <p><strong>Alignment:</strong> ${hero.biography.alignment}</p>
                    <p><strong>First Appearance:</strong> ${hero.biography['first-appearance']}</p>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 600px; margin: 20px auto;">
        <div style="background: #f0f0f0; padding: 20px; border-radius: 8px;">
            <h3>Power Stats</h3>
            <p>Intelligence: ${hero.powerstats.intelligence}</p>
            <p>Strength: ${hero.powerstats.strength}</p>
            <p>Speed: ${hero.powerstats.speed}</p>
            <p>Durability: ${hero.powerstats.durability}</p>
            <p>Power: ${hero.powerstats.power}</p>
            <p>Combat: ${hero.powerstats.combat}</p>
        </div>
        
        <div style="background: #f0f0f0; padding: 20px; border-radius: 8px;">
            <h3>Appearance</h3>
            <p><strong>Gender:</strong> ${hero.appearance.gender}</p>
            <p><strong>Race:</strong> ${hero.appearance.race}</p>
            <p><strong>Height:</strong> ${hero.appearance.height.join(',')}</p>
            <p><strong>Weight:</strong> ${hero.appearance.weight.join(',')}</p>
        </div>
    `;
        
    new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
    });

    await saveHero(heroID);
});

///--------------------------
//Auto save to DB on call 
async function saveHero(heroID) {
    console.log('saveHero called with ID:', heroID); 
    const response = await fetch('/api/heroes/save', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({heroID})
    });
    
    console.log('Response status:', response.status); 
    const data = await response.json(); 
    console.log('Response data:', data); 
}

// Show on webpage

async function loadSavedHeroes() {
    const response = await fetch('/api/heroes/saved');
    const heroes = await response.json();
    
    
    const savedDiv = document.getElementById('saved_heroes');  //div id on html give a new variable
    savedDiv.innerHTML = '<h2>Saved Heroes from Supabase</h2>';  // result into the html
    

    
    if (heroes.length === 0) {
        savedDiv.innerHTML += '<p>No heroes saved yet!</p>';
        return;
    }
    
    heroes.forEach(hero => {
        savedDiv.innerHTML += `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                <h3>${hero.name}</h3>
                <img src="/api/image-proxy?url=${encodeURIComponent(hero.image_url)}" width="100"/>
                <p>Intelligence: ${hero.intelligence} </p>
                <p>Strength: ${hero.strength}</p>
                <p>Publisher: ${hero.publisher} </p>
                <p>Alignment: ${hero.alignment}</p>
            </div>
        `;
    });
}
// loadSavedHeroes(); 
