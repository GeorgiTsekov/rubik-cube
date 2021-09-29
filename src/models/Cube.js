const uniqid = require('uniqid');

class Cube {
    static #cubes = [
        {
            id: 'sdf1123sdf44a',
            name: 'Gan356 Air SM',
            description: 'The Gans Air 356 SM is an amazing cube with very little to possibly no flaws. The cube has a blocky and stable feel while retaining enough speed for most people ...',
            imageUrl: 'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg',
            difficulty: '6'
        },
        {
            id: 'dfj5sd23sdf25a',
            name: 'Eco-Dark',
            description: 'Eco-Dark is an amazing cube with very little to possibly no flaws. The cube has a blocky and stable feel while retaining enough speed for most people ...',
            imageUrl: 'https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg',
            difficulty: '6'
        },
        {
            id: 'd56ghsd23sdf25a',
            name: 'Pyraminx',
            description: 'Pyraminx is an amazing cube with very little to possibly no flaws. The cube has a blocky and stable feel while retaining enough speed for most people ...',
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg',
            difficulty: '1'
        },
        {
            id: 'dfmm55sd23sdf25a',
            name: 'Megaminx',
            description: 'Megaminx is an amazing cube with very little to possibly no flaws. The cube has a blocky and stable feel while retaining enough speed for most people ...',
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61HpQqVQ37L._SY355_.jpg',
            difficulty: '3'
        }
    ];

    constructor(name, description, imageUrl, difficulty) {
        this.id = uniqid();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = difficulty;
    };

    static get cubes() {
        return Cube.#cubes.slice()
    }

    static add(cube) {
        Cube.#cubes.push(cube);
    }
}

module.exports = Cube;