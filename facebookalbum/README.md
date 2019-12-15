#  Facebook Album

## General Info
Facebook Album is a small React application which shows facebook albums.


## Technologies Used: 
Project is created with:
* React (version 16)
* Redux (version 4.0.4)
* Facebook Web SDK  
* Bootstrap 4

## Setup


To run this application, user need to create an app in facebook developer tool  (https://developers.facebook.com)

After creating an application, user need to select a facebook product (In our case it is Facebook Login) and then select the platform for this application (Web) .

Add a site url (http://localhost) (As we are running on local machine) and then save it.

Go to setting > Basic > App Domains  , add localhost in App domains text box.

save changes .

So, You have created an app. You will get an application Id.

Go to facebookalbum/public/index.html , 

Add application Id in 

```
window._onFacebook = new Promise((res, rej) => {
          window.fbAsyncInit = function () {
            FB.init({
              appId: 'AppId',
              autoLogAppEvents: true,
              xfbml: true,
              version: 'v5.0',
              status: true
            });
            console.log('Initialized facebook SDK');
            res(FB);
          };
        });  

```

and then ....

```
$ cd facbookalbum
$ npm install
$ npm start 


On login page, user should click on the  
** 
 login with facebook button
**

```

Application will run on http://localhos:3000.


## Issues

1. On Reloading the page, user is getting redirected to login page even if it is logged in.        This issue is related to the cookies .



## Improvements

1. Loading Indicaters can be added.
2. Profile page, Slider can be improved much better version.
3. Making use of Hooks concept .
4. Component structure can also be changed .


### Note :

You can not login with another user in this application.

Reason being, you need to live your application. We can access oAuth from https connection only not from locahost .


  









