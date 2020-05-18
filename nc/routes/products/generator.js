const express = require('express');
const Chance = require('chance');

const chance = new Chance();

const Products = require('../../models/Product');
const Catalogs = require('../../models/Catalog');
const Categories = require('../../models/Category');
const Brands = require('../../models/Brand');
const Colors = require('../../models/Color');

const router = express.Router();

const sizeShoesSmall = chance.pick(['36', '37', '38'], 1);
const sizeShoesMedium = chance.pick(['39', '40', '41'], 1);
const sizeShoesBig = chance.pick(['42', '43', '44', '45'], 1);
const sizeWearSmall = chance.pick(['XS', 'S'], 1);
const sizeWearMedium = chance.pick(['L', 'M'], 1);
const sizeWearBig = chance.pick(['XL', 'XXL'], 1);

router.post('/', async (req, res) => {
    try {
        setInterval(async () => {
            try {
                const requestedCatalog = { catalog: chance.pick(['men', 'women', 'kids'], 1) };
                const catalog = await Catalogs.findOne(requestedCatalog);
                if (!catalog) throw { message: 'Bad catalog name' };

                const requestedCategory = {
                    category: chance.pick(
                        ['dresses', 'sweaters', 'jeans', 't-shirts', 'shoes', 'hoodies', 'shirts'],
                        1
                    ),
                };
                let category = await Categories.findOne(requestedCategory);
                if (!category) {
                    category = new Categories({
                        category: requestedCategory.category,
                    });

                    if (category.category === 'dresses' && catalog.catalog === 'men') {
                        return;
                    }
                    category = await category.save();
                    catalog.categories.push(category);
                    await catalog.save();
                }

                const condition = catalog.categories.findIndex(valueId => valueId.toString() === category.id);

                if (category.category === 'dresses' && catalog.catalog === 'men') {
                    return;
                }

                if (condition < 0) {
                    catalog.categories.push(category);
                    await catalog.save();
                }

                const requestedBrand = {
                    brand: chance.pick(
                        [
                            'zori',
                            'addic',
                            'hikee',
                            'ruma',
                            'cassics',
                            'tier',
                            'dive',
                            'tommy kesh',
                            'gosha',
                            'medicine',
                        ],
                        1
                    ),
                };
                let brand = await Brands.findOne({ brand: requestedBrand.brand });
                if (!brand) {
                    brand = new Brands({
                        brand: requestedBrand.brand,
                    });
                    brand = await brand.save();
                }

                const requestedColor = { color: chance.pick(['red', 'black', 'blue', 'white', 'green', 'yellow'], 1) };
                let color = await Colors.findOne(requestedColor);
                if (!color) {
                    color = new Colors({
                        color: requestedColor.color,
                    });
                    color = await color.save();
                }
                const mrspR = chance.integer({ min: 100, max: 1000 });
                const priceR = parseInt(mrspR * chance.pick([0.8, 0.6, 0.7, 0.9], 1));
                const rateR = chance.floating( [{min: 2, max: 5, fixed: 2 }])
                const imageNumber = chance.integer({ min: 1, max: 19 });
                const props = [
                    {
                        size: requestedCategory.category === 'shoes' ? sizeShoesSmall : sizeWearSmall,
                        available: chance.integer({ min: 1, max: 10 }),
                        sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                    },
                    {
                        size: requestedCategory.category === 'shoes' ? sizeShoesMedium : sizeWearMedium,
                        available: chance.integer({ min: 1, max: 10 }),
                        sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                    },
                    {
                        size: requestedCategory.category === 'shoes' ? sizeShoesBig : sizeWearBig,
                        available: chance.integer({ min: 1, max: 10 }),
                        sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                    },
                ];

                let description;
                switch (category.category) {
                    case 'dresses':
                        description = chance.pick(['A dress with thin straps. Featuring a semi-sheer matching lace top appliqué. Passementerie appliqué on the hem with contrast beads and side vents. Side zip fastening hidden in the seam.', 'High neck dress with long sleeves and elastic cuffs. Featuring gathered detailing at the waist and lining.', 'Dress with a high neck and long sleeves. Lining. Ruffled hem. Button fastening on the front.'], 1);
                        break;
                    case 'sweaters':
                        description = `Comfort can't be overlooked. Take care of yourself through every phase of your workout. This sweatshirt has a soft, cozy feel and a convenient pullover style. Has a supportive contoured feel for a full range of motion.`;
                        break;
                    case 'jeans':
                        description = `Faded five-pocket carrot jeans. Turn-up hems. Front button fastening in comfort stretch with zip fly, high waist and relaxed tapered leg. These are our most soft and comfy fits with authentic denim look.`;
                        break;
                    case 't-shirts': 
                        description = `Life has its puzzling moments. Getting ready in the morning shouldn't be one of them. Find your moment of clarity when you throw on this easy, cool t-shirt. The colourful graphic is as bright as your personality. Feel confident in tackling whatever is outside your front door.`;
                        break;
                    case 'shoes': 
                        description = `Feel confident, whatever the conditions. These shoes feature a knit upper with a structured collar for a form-fitting and stable feel. The rubber outsole provides traction, whether you are walking, running or working. High-density Boost gives you endless energy return and superior cushioning with low-to-the ground stability`;
                        break;
                    case 'hoodies': 
                        description = chance.pick([`A clean-cut essential. Its loose-fitting hoodie with an adjustable hood and long sleeves. Featuring a front pouch pocket and ribbed trims. The sweatshirt is a blank canvas. If it looks good and feels great, let it ride.`, 'Knit hoodie with an adjustable drawstring hood and long sleeves.', 'Textured hoodie featuring an adjustable drawstring hood, long sleeves with elastic cuffs, welt hip pockets and ribbed hem.'], 1);
                        break;
                    case 'shirts': 
                        description = chance.pick(['Relaxed fit shirt made from a flowing linen blend. Featuring a camp collar and long sleeves, side slits at the hem and a front button fastening.', 'Slim fit collared shirt featuring long sleeves with buttoned cuffs and a button-up front.', 'Collared shirt featuring long sleeves with contrast buttoned cuffs and an asymmetric hem. Button-up front hidden by a placket.'], 1);
                    default:
                        break;
                }

                const material = chance.pick(['cotton', 'jute', 'silk', 'ramie', 'wool', 'recycled'], 1);

                const gentitle = `${requestedCategory.category} ${requestedBrand.brand} ${chance
                    .sentence({ words: 1 })
                    .toLowerCase()}`;
                const product = new Products({
                    catalog,
                    category,
                    brand,
                    material,
                    title: gentitle,
                    description,
                    color,
                    images: [`${category.category}_${catalog.catalog}${imageNumber}.jpg`],
                    mrsp: mrspR,
                    price: priceR,
                    rate: rateR,
                    propetries: props,
                });
                await product.save();
                res.status(201).send(product);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        }, 1000);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
