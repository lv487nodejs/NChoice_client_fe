# fn

## User:
POST:

**http://localhost:5000/users/**
```json
{
    "email": "reekee@gmail.com",
    "password": "12345678",
    "firstName": "Oleg",
    "lastName": "Kulch"
       
}
```
**Required:**

email - type: string,  __@__.__ 

password - type: string, at least 6 symbols

firstName - type: string

lastName - type: string**

**Not Required:**

avatar - type: String

date - type: Date, default: Date.now 
```json
{
    "message": "User saved",
    "user": {
        "_id": "5e4c5109bb87cd2f1d768434",
        "firstName": "Oleg",
        "lastName": "Kulch", 
        "email": "reekee@gmail.com",
        "password": "$2a$10$BC/GTeQ0NBpBxwAc53BVTuXDqOWtTQG4spTf/6Tl08O7ktkVj59k2",
        "date": "2020-02-18T21:03:05.461Z",
        "__v": 0
    }
}
```


## Auth:
POST
**http://localhost:5000/auth/login/**
```json
{
	"email": "reekee@gmail.com",
	"password": "12345678"
}
```
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmVla2VlQGdtYWlsLmNvbSIsImlhdCI6MTU4MjA2MjU2MiwiZXhwIjoxNTgyMDYyNTc3fQ.PVyUwb0-lx68plUKGa2-CBvadpVCx2jL8PrkLeeOUYc",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmVla2VlQGdtYWlsLmNvbSIsImlhdCI6MTU4MjA2MjU2Mn0.NSPnzZcEsdgQOl8OP6xqKni8od--Mlx26_NSEmKKUUA"
}
```

## Brands: 
POST: 
**http://localhost:5000/brands**
```json
{
	"brand": "test",
	"images": ["test.img"]
}
```
**Required:**

brand:   String, unique,

Not Required

images: [ Srtings ]

Response:
```json
{
    "images": [
        "test.img"
    ],
    "_id": "5e4e8d2a72079f05d682f78b",
    "brand": "test",
    "__v": 0
}
```

GET:
**http://localhost:5000/brands**
Response:
```json
[
    {
        "images": [],
        "_id": "5e4c4d610501222b9928a28f",
        "brand": "Hikee",
        "__v": 0
    },
    {
        "images": [],
        "_id": "5e4c4d680501222b9928a294",
        "brand": "Dive",
        "__v": 0
    },
    {
        "images": [],
        "_id": "5e4c4d6a0501222b9928a299",
        "brand": "Tommy Kesh",
        "__v": 0
    }
]
```

GET:
**http://localhost:5000/brands/5e4c4d610501222b9928a28f **

**it works with query: http://localhost:5000/brands?brand=addic**


```json
{
    "images": [],
    "_id": "5e4c4d610501222b9928a28f",
    "brand": "Hikee",
    "__v": 0
}
```

## Catalog:
GET:
**http://localhost:5000/catalogs**
```json
[
    {
        "images": [
            "catalogkids.jpg"
        ],
        "categories": [],
        "_id": "5e4c4d2a0fc75d48c83e1f78",
        "catalog": "kids",
        "__v": 0
    },
    {
        "images": [
            "catalogmen.jpg"
        ],
        "categories": [],
        "_id": "5e4c4d310fc75d48c83e1f79",
        "catalog": "men",
        "__v": 0
    },
    {
        "images": [
            "catalogwomen.jpg"
        ],
        "categories": [],
        "_id": "5e4c4d350fc75d48c83e1f7a",
        "catalog": "women",
        "__v": 0
    }
]
```

GET:
**http://localhost:5000/catalogs?catalog=men**

or 

**http://localhost:5000/catalogs/5e4c4d310fc75d48c83e1f79**
```json
[
    {
        "images": [
            "catalogmen.jpg"
        ],
        "categories": [],
        "_id": "5e4c4d310fc75d48c83e1f79",
        "catalog": "men",
        "__v": 0
    }
]
```

POST:
**http://localhost:5000/catalogs/**
```json
{
	"catalog": "test",
	"images": ["test.img"]
}
```
Response: 200 Ok
```json
{
    "images": [
        "test.img"
    ],
    "categories": [],
    "_id": "5e4e95a972079f05d682f78c",
    "catalog": "test",
    "__v": 0
}
```


## Products:
POST
**http://localhost:5000/products**
```json
{
    "catalog": {"catalog": "women"},
    "category": {"category": "shoes"},
    "brand": {"brand": "zori"},
    "title": "daleki",
    "description": "daleki zori vasylia",
    "color": {"color": "red"},
    "images": ["shoes.jpg"],
    "propetries": {
        "size": "38",
        "available": "25",
        "sku": "JD790J2S",
        "mrsp": 213,
        "price": 180
    }
}
```

**Required**
catalog: women || men || kids, type Object, 

category: (any existing category) , type Object, 

brand: (any existing brand) , type Object, 

title:  type String,

description: type String,

color: type Object,

images: [ `${product.category.category}_${product.catalog.catalog}.jpg`], type Array, by this example

size:  '36'|| '37' || '38' || '39' || '40' || '41' || '42' || '43' || '44' || '45' || 'XS' || 'S' || 'M' || 'L' || 'XL' || 'XXL' , type String

available: min: 0, max: 100, type Number

sku: unique,  type:String, a-zA-z0-9 

mrsp:  min: 0, type Number

price: min: 0, type Number
 
Response:
```json
{
    "images": [
        "shoes.jpg"
    ],
    "_id": "5e4e965072079f05d682f78e",
    "catalog": {
        "images": [
            "catalogwomen.jpg"
        ],
        "categories": [
            {
                "images": [],
                "_id": "5e4c552158a955341f476b0b",
                "category": "shoes",
                "__v": 0
            }
        ],
        "_id": "5e4c4d350fc75d48c83e1f7a",
        "catalog": "women",
        "__v": 1
    },
    "category": {
        "images": [],
        "_id": "5e4c552158a955341f476b0b",
        "category": "shoes",
        "__v": 0
    },
    "brand": {
        "images": [],
        "_id": "5e4c552258a955341f476b0f",
        "brand": "zori",
        "__v": 0
    },
    "title": "daleki",
    "description": "daleki zori vasylia",
    "color": {
        "images": [],
        "_id": "5e4c54ef58a955341f476afc",
        "color": "red",
        "__v": 0
    },
    "propetries": [
        {
            "size": [
                "38"
            ],
            "_id": "5e4e965072079f05d682f78f",
            "available": 25,
            "sku": "JD790J2S",
            "mrsp": 213,
            "price": 180
        }
    ],
    "modified": "2020-02-20T14:23:12.211Z",
    "__v": 0
}
```
GET:
**http://localhost:5000/products**

Returns all products.

GET: 
**http://localhost:5000/products?catalog=men&category=sweaters&brand=hikee&color=black**

***Query can be filtered by:*** **catalog, category, brand, color.**

RESPONSE:
```json
[
    {
        "images": [
            "blank_sweaters_men.jpg"
        ],
        "_id": "5e4c53043ab1ae31bc2f7a90",
        "catalog": {
            "images": [
                "catalogmen.jpg"
            ],
            "categories": [],
            "_id": "5e4c4d310fc75d48c83e1f79",
            "catalog": "men",
            "__v": 0
        },
        "category": {
            "images": [],
            "_id": "5e4c4d6a0501222b9928a298",
            "category": "sweaters",
            "__v": 0
        },
        "brand": {
            "images": [],
            "_id": "5e4c4d610501222b9928a28f",
            "brand": "hikee",
            "__v": 0
        },
        "title": "Sweaters Hikee Biw fanisjet zileize.",
        "description": "Nu wisuf estonjid neksuzzi deco tokwolor ami ice putibwi laovutoc harporzo di laje. Og vo rosewo lelilda founi web ri okruke bosisow eli wa gowtenac he adaoz mupvabo escelcu sobec homal. Ih orujec cas agasemnaz fucgit renehaten kosuvdak luhhol korsir bud hihuhe siker ziam wegej sifhi. Keaji zoffedun jassad gedco midobwir wari wiclo lat limahewi vitmo selred ug. Ferarnog duilbut ba dinkuban nice ifoaf zus pukip urusuduj milse tij lin pugifgir piac. Pitij ge evoepolu sot su am lulvod nuwkazi tohgac sopuwzep piwdavu fate se.",
        "color": {
            "images": [],
            "_id": "5e4c4d680501222b9928a295",
            "color": "black",
            "__v": 0
        },
        "propetries": [
            {
                "size": [
                    "45"
                ],
                "_id": "5e4c53043ab1ae31bc2f7a91",
                "available": 7,
                "sku": "CNNYNQQQ",
                "mrsp": 955,
                "price": 573
            }
        ],
        "modified": "2020-02-18T21:11:32.688Z",
        "__v": 0
    }
]
```

