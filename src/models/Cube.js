class Cube {
    static cubes = [
        {
            name: 'Gan356 Air SM',
            description: 'The Gans Air 356 SM is an amazing cube with very little to possibly no flaws. The cube has a blocky and stable feel while retaining enough speed for most people ...',
            imageUrl: 'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg',
            difficulty: '6'
        }
    ];

    constructor(name, description, imageUrl, difficulty) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = difficulty;
    };

    static getAll() {
        return Cube.cubes.slice()
    }

    static add(cube) {
        Cube.cubes.push(cube);
    }
}

module.exports = Cube;