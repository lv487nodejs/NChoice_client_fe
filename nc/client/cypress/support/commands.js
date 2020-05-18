import {setToLocalStorage, clearLocalStorage} from "../../src/services/localStoreService";



Cypress.Commands.add('localStorage', () => { 
    clearLocalStorage();
    setToLocalStorage('userId', '123456789')
    setToLocalStorage('products_collection', '5ea9a730d34cc7194801d5a0')
    setToLocalStorage('products_number', '5ea9a730d34cc7194801d5a0')

  })