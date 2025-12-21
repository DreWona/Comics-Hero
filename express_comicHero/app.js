//env variable
require('dotenv').config();   
//env variable end
const { createClient } = require('@supabase/supabase-js')


//express setup
const express = require('express');
const app = express();
const port = 3000;

//Supabase api doc style
const supabaseUrl = 'https://pnruffioxoxrialmcuim.supabase.co';
const supabaseKey = process.env.Supabase_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'))    //double underscore and lowercase public

app.get('/', (req, res) => {
    res.sendFile('public/project_home.html', { root:__dirname});   //Add in all web page
});
//express setup end

// Actual calls
app.get('/api/heroes/search/:name', async (req, res) => {
    const hero_Name = req.params.name;
    const apikey = process.env.SuperHero_API_KEY;

    const response = await fetch(`https://superheroapi.com/api/${apikey}/search/${hero_Name}`
    );

    const data = await response.json();
    res.json(data);
});

app.get('/api/heroes/saved', async (req, res) => {   // GET FROM DB
    console.log('=== /api/heroes/saved called ===') //del

    const { data, error } = await supabase
        .from('super_heroDB')
        .select('*')
        // .order('created_at', { ascending: false });

    console.log('Supabase response:', { data, error });
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get('/api/heroes/:id', async (req, res) => {
    const id = req.params.id;
    const apikey = process.env.SuperHero_API_KEY;

    const response = await fetch(`https://superheroapi.com/api/${apikey}/${id}`
    );

    const data = await response.json();
    res.json(data);
});

app.get('/api/image-proxy', async (req, res) => {  //image load issues
    const imageUrl = req.query.url;
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    res.set('Content-Type', response.headers.get('content-type'));
    res.send(Buffer.from(buffer));
});

//------------------------------------------------
//DB Write to supabase
app.post(`/api/heroes/save`, async (req, res) => {            //SAVE TO DB
    const { heroID } = req.body;
    const apikey = process.env.SuperHero_API_KEY;

    const [statsRes, bioRes, appearanceRes, imageRes] = await Promise.all([
        fetch(`https://superheroapi.com/api/${apikey}/${heroID}/powerstats`),
        fetch(`https://superheroapi.com/api/${apikey}/${heroID}/biography`),
        fetch(`https://superheroapi.com/api/${apikey}/${heroID}/appearance`),
        fetch(`https://superheroapi.com/api/${apikey}/${heroID}/image`) 
    ]);

    const stats = await statsRes.json();    //The endpoints from superheroapi. stats, biography, appearance, img
    const bio = await bioRes.json();
    const appearance = await appearanceRes.json();
    const image = await imageRes.json();

        const heroData = {
        id: parseInt(heroID),
        name: bio.name,
        intelligence: parseInt(stats.intelligence) || 0,
        strength: parseInt(stats.strength) || 0,
        speed: parseInt(stats.speed) || 0,
        durability: parseInt(stats.durability) || 0,
        power: parseInt(stats.power) || 0,
        combat: parseInt(stats.combat) || 0,
        full_name: bio['full-name'],
        alter_egos: bio['alter-egos'],
        aliases: JSON.stringify(bio.aliases),
        place_of_birth: bio['place-of-birth'],
        first_appearance: bio['first-appearance'],
        publisher: bio.publisher,
        alignment: bio.alignment,
        gender: appearance.gender,
        race: appearance.race,
        height: appearance.height.join(', '),
        weight: appearance.weight.join(', '),
        eye_color: appearance['eye-color'],
        hair_color: appearance['hair-color'],
        image_url: image.url
    };

    console.log('Prepared heroData:', heroData); //delte
    
    const { data, error } = await supabase.from('super_heroDB').upsert([heroData]);

    console.log('Supabase INSERT result:', { data, error }); //del

    if (error) {
        console.error('INSERT ERROR:', error); // ADD THIS LINE
        return res.status(500).json({ error: error.message });
    }
    
    console.log('Success! Saved to DB'); // ADD THIS LINE
    res.json({success: true, data});

    // if (error) return res.status(500).json({ error: error.message });
    // res.json({success: true, data});

});

app.listen(port, () =>{
    console.log(`Express app listening on port: ${port}`);
});