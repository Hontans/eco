# Preparer l'api

Definir toutes les appels necessaire:

getCategories() : category[]
getProducts() : product[]
getProducByCategoryId(categoryId: number) : product[]


// Login page, ....
getUserByCredentials(login: string, password: string) : User | error: { message: "" }

{
    error: 'utilisateur ou mot de passe inconnu'
}
{
    usename: '',
    age: '...'
} 

getUserCart(userId: number) : items[]



getUserById(id: number) : User
saveCart(Items[]) : bool