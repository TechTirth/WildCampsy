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
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error dicta magnam, quos iusto tenetur necessitatibus eum quod, minus sapiente obcaecati aut deserunt nihil nobis, ullam veniam nostrum harum ratione dolore.',
            price

        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})