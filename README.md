# Nature Choice(NChoice)
# 1. About the project
“Nature choice” is the e-commerce online shop with ecological clothes. This application is an exciting place for the whole family to shop. We provide an exceptional style for everybody that made of eco-friendly or recycled materials. In our website customers can register, login and have a great shopping experience. Сustomer’s wish list and cart are stored at the database, so if the user will Log out – all data will be waiting for him to come back. 
The admin part of the application designed for managers of the project to maintain orders, products, and user accounts. 
NChoice – Look exclusive and save the Planet!  

# 2. Main parts of the project and technologies.
This project contains  4 main parts: client frontend, admin portal frontend, backend, and database. All parts of the project are at **https://github.com/lv487nodejs/NChoice**

Let's take a closer look at the technologies of each part.

**Client Frontend** - using React, Redux, Bootstrap-React

**Admin Portal Frontend**  - using React, Redux, Material UI

**Backend** - using Node.js, Nodemon, Axios, Mongoose, Express.js, JWT.

**Database** -  MongoDB and hosted on MongoDB Atlas: **https://cloud.mongodb.com/v2/5e486810c56c98378081f5b5#clusters**

**End-to-end testing** - Cypress

# 3. How to contribute
You're encouraged to contribute to our project if you've found any issues or missing functionality that you would want to see. Here **https://github.com/lv487nodejs/NChoice/issues** you can see the list of issues and here **https://github.com/lv487nodejs/NChoice/issues/new** you can create a new issue.

Before sending any pull request, please discuss requirements/changes to be implemented using an existing issue or by creating a new one. All pull requests should be done into the development branch.

# 4. How to start the project locally.
4.1. Clone or download the project from **https://github.com/lv487nodejs/NChoice.git**

4.2. Before running the project, make sure that you downloaded all dependencies.

4.2.1. Run "npm install" at fn/fn folder to download dependencies for backend.

4.2.2. Run "npm install" at fn/fn/admin folder to download dependencies for admin portal.

4.2.3. Run "npm install" at fn/fn/client folder to download dependencies for client page.

4.3. Run "npm run dev" at fn/fn folder to run client and backend aplication at http://localhost:3000/.

4.4. Run "npm start" at fn/fn/ folder to run backend(by itself at http://localhost:5000/ or for admin portal) aplication at http://localhost:3000/.

4.5. Run "npm start" at fn/fn/admin folder to run aplication at http://localhost:3000/.

4.6. Run "npm run cypress" at fn/fn/admin folder to run end-to-end tests.

# 5. Project Deploy

5.1. Our client page deployed at **https://lv487node-client.herokuapp.com/**

5.2. Our admin portal deployed at **https://lv487node-admin.herokuapp.com/**

5.2. Our backend deployed at **https://lv487node-backend.herokuapp.com/**

# 6. Project API
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
        "id": "5e53ddc92d9ca328e8e0712e",
        "title": "shoes cassics zu kakceno ticif.",
        "images": [
            "shoes_men.jpg"
        ],
        "description": "Te ilfotha to sil onemer sada wembefca hizojre meruhe tuca cowcijfof lutpupah jopil daupivin ipoomo kat. Movi saditim ek vofezit let sudkupa ufiwilu bi perjevo af lu ziide pa fig. Ahni fiwe jewuba ajenum bep podoci pemiw ta we ekihin evotier kaer ne. Vahdefo tajidev hawopar fu ane awiduhew wi ligitu wip dafa pamir tusfeh hulteri peb. Si ja idvu sakaga nevtalar ta aduf voshovdun zoebidi tigren arahugef vozej. Epti ula gadhu salroh diolu mochoza gacrati lev umgog ucirdip bame subdorto rik nagido bivburhu. Felohhi gistic ohahap ebo cuh izuodcip nihcuf nakunke eztocit lokow de wuhjanav nelepebe nikelug joepo je.",
        "propetries": [
            {
                "size": [
                    "37"
                ],
                "_id": "5e53ddc92d9ca328e8e0712f",
                "available": 4,
                "sku": "9WJ5CB88",
                "mrsp": 503,
                "price": 402
            },
            {
                "size": [
                    "41"
                ],
                "_id": "5e53ddc92d9ca328e8e07130",
                "available": 4,
                "sku": "XWZ2C25D",
                "mrsp": 503,
                "price": 402
            },
            {
                "size": [
                    "44"
                ],
                "_id": "5e53ddc92d9ca328e8e07131",
                "available": 4,
                "sku": "WBWA6USH",
                "mrsp": 503,
                "price": 402
            }
        ],
        "modified": "2020-02-24T14:29:29.027Z",
        "catalog": "men",
        "category": "shoes",
        "color": "red",
        "brand": "cassics"
    },
```
GET:
**http://localhost:5000/products**

*Returns all products.*

GET: 
**http://localhost:5000/products?catalog=men&category=sweaters&brand=hikee&color=black&&searchTerm=hoodies dive bib**



***Query can be filtered by:*** **catalog, category, brand, color, searchTerm.**




Response:
```json
{
        "id": "5e53ddc92d9ca328e8e0712e",
        "title": "shoes cassics zu kakceno ticif.",
        "images": [
            "shoes_men.jpg"
        ],
        "description": "Te ilfotha to sil onemer sada wembefca hizojre meruhe tuca cowcijfof lutpupah jopil daupivin ipoomo kat. Movi saditim ek vofezit let sudkupa ufiwilu bi perjevo af lu ziide pa fig. Ahni fiwe jewuba ajenum bep podoci pemiw ta we ekihin evotier kaer ne. Vahdefo tajidev hawopar fu ane awiduhew wi ligitu wip dafa pamir tusfeh hulteri peb. Si ja idvu sakaga nevtalar ta aduf voshovdun zoebidi tigren arahugef vozej. Epti ula gadhu salroh diolu mochoza gacrati lev umgog ucirdip bame subdorto rik nagido bivburhu. Felohhi gistic ohahap ebo cuh izuodcip nihcuf nakunke eztocit lokow de wuhjanav nelepebe nikelug joepo je.",
        "propetries": [
            {
                "size": [
                    "37"
                ],
                "_id": "5e53ddc92d9ca328e8e0712f",
                "available": 4,
                "sku": "9WJ5CB88",
                "mrsp": 503,
                "price": 402
            },
            {
                "size": [
                    "41"
                ],
                "_id": "5e53ddc92d9ca328e8e07130",
                "available": 4,
                "sku": "XWZ2C25D",
                "mrsp": 503,
                "price": 402
            },
            {
                "size": [
                    "44"
                ],
                "_id": "5e53ddc92d9ca328e8e07131",
                "available": 4,
                "sku": "WBWA6USH",
                "mrsp": 503,
                "price": 402
            }
        ],
        "modified": "2020-02-24T14:29:29.027Z",
        "catalog": "men",
        "category": "shoes",
        "color": "red",
        "brand": "cassics"
    },
```

