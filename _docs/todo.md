# Preparer l'api

Definir toutes les appels necessaire:

###### Authentication (tokun auth)
la conection est pas onMonted - [X] login(emailOrName: string, password: string) : User | error: { message: "" }
le local store est pas a joure - [X] register(name: string, email: string, password: string) : User | error: { message: "" }
la déconection est pas onMonted- [X] logout() : bool
- [ ] forgotPassword(email: string) : bool | error: { message: "" }


###### User Management
- [ ] getConectedUser() : User | null
- [X] getUserById(id: number) : User[]
- [ ] updateUser(name: string, email: string, password: string, adresses[], basketCards[]) : bool | error: { message: "" }

###### Products
- [X] getProducts() : product[]
- [X] getProductById(id: number) : Product
- [ ] searchProductsByName(name: string) : product[]
- [ ] getCategories() : string[]
- [ ] getProducByCategoryId(categoryId: number) : product[]

###### Cart/Basket
- [ ] addItemToBasket(item: Product) : bool
- [ ] deleteProductInBasket(product: Product) : bool
- [ ] getCartByUserId(userId: number) : items[]
- [ ] buyCart() : bool
