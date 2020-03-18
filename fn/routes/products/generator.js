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
                const lorem =
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
                const sed =
                    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.';
                const vero =
                    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.';
                const requestedCatalog = { catalog: chance.pick(['men', 'women', 'kids'], 1) };
                console.log(requestedCatalog);
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
                let brand = await Brands.findOne(requestedBrand);
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
                const rateChance = chance.integer({ min: 1, max: 5 });
                const rate = parseInt(rateChance * chance.pick([0.8, 0.6, 0.7, 0.9], 1));

                const props = [
                    {
                        size: requestedCategory.category === 'shoes' ? sizeShoesSmall : sizeWearSmall,
                        available: chance.integer({ min: 1, max: 8 }),
                        sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                    },
                    {
                        size: requestedCategory.category === 'shoes' ? sizeShoesMedium : sizeWearMedium,
                        available: chance.integer({ min: 1, max: 12 }),
                        sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                    },
                    {
                        size: requestedCategory.category === 'shoes' ? sizeShoesBig : sizeWearBig,
                        available: chance.integer({ min: 1, max: 8 }),
                        sku: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
                    },
                ];

                const gentitle = `${requestedCategory.category} ${requestedBrand.brand} ${chance
                    .sentence({ words: 3 })
                    .toLowerCase()}`;
                const product = new Products({
                    catalog,
                    category,
                    brand,
                    title: gentitle,
                    description: chance.pick([lorem, sed, vero], 1),
                    color,
                    images: [`${product.category.category}_${product.catalog.catalog}.jpg`],
                    mrsp: mrspR,
                    price: priceR,
                    rate,
                    propetries: props,
                });

                await product.save();

                ;
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        }, 1000);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
