const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database Connected")
})

const sample = array => array[Math.floor(Math.random()*array.length)]


const seedDB = async()=>{
    await Campground.deleteMany({});
    const c = new Campground({title: 'purple field'});
    for(let i=0;i<50;i++){
        const random150 =  Math.floor(Math.random()*150);
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground({
            author: '650e5170e1b83a92d37656b6',
            location: `${cities[random150].city}, ${cities[random150].admin_name}`, 
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error dicta magnam, quos iusto tenetur necessitatibus eum quod, minus sapiente obcaecati aut deserunt nihil nobis, ullam veniam nostrum harum ratione dolore.',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [ 72.579707, 23.021624 ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dxbznqpea/image/upload/v1695574028/WildCampsy/igbp4bmz9ttl9owk6fzp.jpg',
                  filename: 'WildCampsy/igbp4bmz9ttl9owk6fzp',
                 
                },
                {
                  url: 'https://res.cloudinary.com/dxbznqpea/image/upload/v1695574033/WildCampsy/vc5pi8rl1hxosybve690.jpg',
                  filename: 'WildCampsy/vc5pi8rl1hxosybve690',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dxbznqpea/image/upload/v1695574043/WildCampsy/ld7a4mbsfr5mfyjgswwv.jpg',
                  filename: 'WildCampsy/ld7a4mbsfr5mfyjgswwv',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dxbznqpea/image/upload/v1695574051/WildCampsy/untdhhzadsoqlkdhi0zk.jpg',
                  filename: 'WildCampsy/untdhhzadsoqlkdhi0zk',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dxbznqpea/image/upload/v1695574056/WildCampsy/s4satq7czfshhnm1trtx.jpg',
                  filename: 'WildCampsy/s4satq7czfshhnm1trtx',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dxbznqpea/image/upload/v1695574064/WildCampsy/bvttars2to280pzvtgws.jpg',
                  filename: 'WildCampsy/bvttars2to280pzvtgws',
                  
                }
              ]

        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})