# Preparer l'api

Definir toutes les appels necessaire:

###### Authentication (tokun auth)
- [X] (la conection est pas onMonted) login(emailOrName: string, password: string) : User | error: { message: "" }
- [X] (le local store est pas a joure) register(name: string, email: string, password: string) : User | error: { message: "" }
- [X] (la déconection est pas onMonted) logout() : bool
- [X] forgotPassword(email: string) : bool | error: { message: "" }


###### User Management
- [X] (F) getConectedUser() : User | null
- [ ] updateUser(name: string, email: string, password: string, adresses[], basketCards[]) : bool | error: { message: "" }

###### Products
- [X] getProducts() : product[]
- [X] getProductById(id: number) : Product
- [X] (F) searchProductsByName(name: string) : product[]
- [X] (F) getCategories() : string[]

###### Cart/Basket
- [ ] addItemToBasket(item: Product) : bool
- [ ] deleteProductInBasket(product: Product) : bool
- [ ] getBasketByUserId(userId: number) : items[]
- [ ] buyCart() : bool
