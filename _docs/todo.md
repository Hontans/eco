# Preparer l'api

Definir toutes les appels necessaire:

## Authentication (tokun auth)
login(emailOrName: string, password: string) : User | error: { message: "" }
register(name: string, email: string, password: string) : User | error: { message: "" }
logout() : bool
forgotPassword(email: string) : bool | error: { message: "" }
changePassword(newPassword: string) : bool | error: { message: "" }

## User Management
getConectedUser() : User | null
getUserById(id: number) : User[]
updateUser(name: string, email: string, password: string, adresses[], basketCards[]) : bool | error: { message: "" }

## Products
getProducts() : product[]
getProductById(id: number) : Product
searchProductsByName(name: string) : product[]
getCategories() : category[]
getProducByCategoryId(categoryId: number) : product[]

## Cart/Basket
addItemToBasket(item: Product) : bool
deleteProductInBasket(product: Product) : bool
getCartByUserId(userId: number) : items[]
saveCart() : bool
buyCart() : bool






// Login page, ....
getUserByCredentials(login: string, password: string) : User | error: { message: "" }
{
    usename: '',
    age: '...'
}
{
    error: 'utilisateur ou mot de passe inconnu'
}

