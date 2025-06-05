# Preparer l'api

Definir toutes les appels necessaire:

addItemToBasket(item: Product) : bool
getProducts() : product[]
getProductById(id: number) : Product
getCategories() : category[]
getProducByCategoryId(categoryId: number) : product[]
deleteProduct(product: Product) : bool
logout(): bool
getConectedUser() : User | null
login(emailOrName: string, password: string) : User | null
getUserById(id: number) : User[]
getUserByEmail(email: string) : User
getUserCart(userId: number) : items[]
saveCart(Items[]) : bool





// Login page, ....
getUserByCredentials(login: string, password: string) : User | error: { message: "" }
{
    usename: '',
    age: '...'
}
{
    error: 'utilisateur ou mot de passe inconnu'
}