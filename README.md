<h2 align="center">Instagrammer</h3>

<div align="center">
  

</div>

<div align="center">

![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) 
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
  
Yet another Instagram clone built with advanced patterns & wide spectrum techs. 
</div>

<br>

### <a href="https://emoji.gg/emoji/6573_angular"><img style="width: 25px; height: 25px;" src="https://cdn3.emoji.gg/emojis/6573_angular.png" width="64px" height="64px" alt="angular"></a> Angular Architecture & Patterns 

- SCAM -> Single component angular modules for better tree shaking (Ng 14 supports standalone components, and soon I will convert the whole app)
- UI libs -> UI libs can only contain a UI component which should recieve the data only via @Input(), and emit events/data via @Output(). These components can only inject services regarding the view, E.g. MaterialDialog service 
- Feature libs -> Can be routed to, can access data from any source 
- DataAccess libs -> Handles data stuff and couple of other things which are connected with the data layer (ngrx, api cals etc.)
- Shell libs -> Entry point for some domain. Shell should always have feature in which we store routes, and layout which should be the layout for the current domain. Layout can access any data and should be in layout folder under shell lib.
- ViewModel -> Ngrx Store is used as a global store while ngrx/@component-store is used as a [viewmodel](https://developer.android.com/topic/libraries/architecture/viewmodel). Viewmodel should grab the data from the global store (or some other source) and prepare it for the view injection via async pipe, also, majority of the business logic is located in the viewmodels which helps to keep our components clean and extremely easy to test and maintain.

### <a href="http://nestjs.com/" target="blank"><img style="width: 45px; height: 45px;" src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a> NestJS Architecture & Patterns 

- Util libs -> Util libs can only contain a util stuff. Util libs can import only from shared & other util libs
- Feature libs -> Place to store controllers 
- DataAccess libs -> Stores services related to data layer, repositories, dtos and couple of other related things
- Shell libs -> Entry point for some domain. Shell libs import controllers & other shell libs. 
- Core -> Stuff that is app specific (confgs etc.). ATM it stores db config, passport config & environment configs

<br>

### 🚧 Feature Status

| Implemented      | Domain    | Feature / Use case | Description |
| ----------- | ----------- | ----------- | ----------- |
| :white_check_mark: | Auth | User can register | User can register as a user on the app & all validations are carried out properly       |
| :white_check_mark: | Auth | User can login  | User can login with correct credentials |
| :white_check_mark: | Auth | User can save login data  | When user logs in, he can choose if he wants to save his login data for the next 2 months |
| :construction: | Feed | User can see home feed | User can see posts from other users |
| :x: | Feed | User can post pictures | User can post pictures (multiple or single at once) |
| :x: | Feed | User can see and use main search bar | User can search for other users |
| :x: | Feed | User can follow/unfollow other users | User can follow/unfollow other users |
| :x: | Chat | User can start chatting with other users  | User can open chat page and chat with other users |
| :x: | Settings | User can change user settings | User can change password and stuff like that |



<br>
