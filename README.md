Heartland
===

## Personal Information
- Title:  SDET 
- Authors:  Montenegro Pablo Mmontenegro

## Install & Dependence
- [node](https://nodejs.dev/en/learn/how-to-install-nodejs/) 18.16
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 9.6.7


## USE
- install dependencies
  ```
  npm install 
  ```
- run test
  ```
  npm start
  ```


## Directory Hierarchy
```
|—— features
|    |—— pageobjects
|        |—— checkOut.ts
|        |—— market.ts
|        |—— navBar.ts
|        |—— productPage.ts
|        |—— sideBar.ts
|    |—— placeOrder.feature
|    |—— steps
|        |—— placeOrder.steps.ts
|—— helpers
|    |—— Helper.ts
|—— package-lock.json
|—— package.json
|—— tsconfig.json
|—— wdio.conf.ts
```

## Reports
- generate reports
  ```
  allure generate
  ```
- generate cleaned reports
  ```
  allure generate --clean
  ```
- open reports
  ```
  allure open
  ```

## Test explanation

    Examples:
      |Filters            |which        |size   |color |quantity|
      |Men,Pants          |random       |random |random|2       |

### You can uses each variable in different convination :
* Filters :
    * [Men, Women, Gear, Training] First Filter always  
    * [Top, Botton, Bags, Fitness Equipment, Watches] or 
      [Hoodies & Sweatshirts, Jackets, Tees, Tanks, Pants, Shorts, Fitness Equipment, Watchers]
* which :
    * random = random product from list
    * n : number = position in list
    * name = at least a part of it , catch the first, is case sensitive
* size :
    * n : number = [28,29,30,31,32,33,34,36]
    * n : string = ["XS","S","M","L","XL"]
    ```
    dont worry if you make a mistake , is you input an invalid value, it will be "random"
* color : 
    * color : string =  ["Black","Green","Yellow","Blue","Brown","Gray","Orange","Purple","Red","White"]
    ```
    dont worry if you make a mistake , is you input an invalid value, it will be "random"
* quantity : 
    * cant : number you want to buy 


