
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
            <div class="swiper_wrapper">
                <div class="swiper_slide">
                    <img src="/api/image-proxy?url=${encodeURIComponent(hero.image.url)}" width="300"/>
                </div>
                <div class="swiper_slide" style="background: #333; color: white; padding: 40px; text-align: center;">
                    <h3> Power Stats</h3>
                    <p>Intelligence: ${hero.powerstats.intelligence}</p>
                    <p>Strength: ${hero.powerstats.strength}</p>
                </div>
            </div>
            <div class="swiper-pagination"></div>
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

        // await saveHero(heroID)
// });

///--------------------------
//Auto save to DB on call
async function saveHero(heroID) {
    const response = await fetch('/api/heroes/save', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({heroID})
    });
    
    const data = await response.json();
    
    // if (data.success) {   //error logging
    //     result.innerHTML += '<p style="color: green;">✓ Saved to database!</p>';
    //     loadSavedHeroes(); // Refresh the saved heroes list
    // } else {
    //     result.innerHTML += '<p style="color: red;">✗ Error saving to database</p>';
    // }
}

// Show on webpage

async function loadSavedHeroes() {
    const response = await fetch('/api/heroes/saved');
    const heroes = await response.json();
    
    // console.log('What we got from backend:', heroes); // DEBUG
    
    const savedDiv = document.getElementById('saved_heroes');  //div id on html give a new variable
    savedDiv.innerHTML = '<h2>Saved Heroes from Supabase</h2>';  // result into the html
    
    // Check if it's an array
    // if (!Array.isArray(heroes)) {
    //     savedDiv.innerHTML += '<p>Error: Could not load heroes</p>';
    //     console.error('Expected array, got:', typeof heroes, heroes);
    //     return;
    // }
    
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
