# WALLASPORTS

## Description
    Wallasports es una aplicación web donde podrás encontrar los productos deportivos que anuncian otros usuarios, así como poder anunciar los tuyos propios. Contacta con otros usuarios, a través de mensajes directos.


## User Stories

-  **/error:** Pantalla de error URL no encontrada
-  **/signup:** Pantalla de registro
-  **/login:** Pantalla de inicio de sesión
-  **/** Pantalla de Home
-  **/profile** Pantalla de Perfil
-  **/productsList/:type** Pantalla de lista de productos por el tipo de producto
-  **/products/detail/:id** Pantalla de detalles del producto que quieres ver
-  **/upload** Pantalla de subir tu producto
-  **/favorites** Pantalla de tus favoritos
- **/my-products** Pantalla de mis productos
- **/edit-products/:id** Pantalla de editar productos
- **/edit-profile** Pantalla de editar perfil
- **/messages** Pantalla de mensajes
  
# Client

## Routes

- / - Homepage
- /auth/signup - Registrarse
- /auth/login - Iniciar sesion
- /profile - Perfil
- /productsList/:type - lista de productos 
- /products/detail/:id - lista de detalles
- /upload -subir producto
- favorites -favoritos
- /my-products - mis productos
- /edit-products/:id - editar producto
- /edit-profile - editar perfil
- /messages' - mensajes
- 404

## Pages

- Detail (user only)
- EditProduct (user only)
- EditProfile (user only)
- Favorites(user only)
- Home (user only)
- Login (public only)
- Messages (user only)
- MyProducts (user only)
- ProductsList (user only)
- Profile (user only)
- Signup (public only)
- Upload (user only)
- 404 Page (public)

## Components

- IsPrivate
- List
- NavbarHome
- Product


## IO


## Services

- Auth Service
  - auth.signupService(newUser)
  - auth.loginService(userCredentials)
  - auth.deleteProfile(id)
  - auth.editProfile(id)
  - auth.verifyService() 
- Messages Service
  - messages.getMessages()
  - messages.sendMessage(productId, newMessage)
- Product Service
  - product.getAllProductService(type)
  - product.uploadProduct(newProduct)
  - product.getProductDetailsService(id)
  - product.updateProductService(id, productChanges)
  - product.getAllUserProducts(userId)
  - product.getFavorites()
  - product.addFavorite(productId)
  - product.deleteFavorite(productId)
- Upload Service
  - upload.uploadImageService(imageFile)
  - messages.uploadProductImage(productImage)

# Server

## Models

User model

```
username - String // required
lastname - String // requires
email - String // required & unique
userImage - String
password - String // required
favorites
```

Products model

```
name - String // required
description - String // required
price - Number // required
productImage - String // required
type - String // enum
reserved - Boolean
owner 
```

Messages model

```
userTo - String 
userFrom - String 
product - String 
text - String 
```

## API Endpoints/Backend Routes

- POST /login
- POST /signup
  - body:
    - name
    - lastname
    - email
    - password
    - userImage
- POST /auth/:editId
  - body:
    - name
    - email
- Delete /auth/:deleteId
- GET /verify
- GET /
- POST /:productId
- POST /upload
  - body:
    - name
    - description
    - price
    - type
    - reserved
    - productImage
    - owner
- GET /list/:type
- GET /owner/:userId
- GET /favorites
- PATCH /add-favorites/:idProduct
- PATCH /delete-favorites/:idProduct
- GET /detail/:id
- DELETE /:deleteId
- PATCH /:editId
    - body: 
        - name
        - desciption
        - price
        - reserved
        - productImage
- POST /productImage
  

## Links

### Git

The url to your repository and to your deployed project

[Client repository Link] (https://github.com/Raquel2292/wallasports-client)
[Server repository Link](https://github.com/Raquel2292/wallasports-server)

[Deploy Link](https://wallasports.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://www.canva.com/design/DAFSSfArJR4/1Fg-AK8XIE8a1lugoIHVQQ/edit)