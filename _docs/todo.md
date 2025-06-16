# Preparer l'api

Definir toutes les appels necessaire:

###### Authentication (tokun auth)
- [X] login(emailOrName: string, password: string) : User | error: { message: "" }
- [X] register(name: string, email: string, password: string) : User | error: { message: "" }
- [X] logout() : bool
- [ ] forgotPassword(email: string) : bool | error: { message: "" }
- [ ] changePassword(newPassword: string) : bool | error: { message: "" }


###### User Management
- [ ] getConectedUser() : User | null
- [ ] getUserById(id: number) : User[]
- [ ] updateUser(name: string, email: string, password: string, adresses[], basketCards[]) : bool | error: { message: "" }

###### Products
- [ ] getProducts() : product[]
- [ ] getProductById(id: number) : Product
- [ ] searchProductsByName(name: string) : product[]
- [ ] getCategories() : string[]
- [ ] getProducByCategoryId(categoryId: number) : product[]

###### Cart/Basket
- [ ] addItemToBasket(item: Product) : bool
- [ ] deleteProductInBasket(product: Product) : bool
- [ ] getCartByUserId(userId: number) : items[]
- [ ] buyCart() : bool
