# My App

This app was created for the job interview

## Getting Started

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## About this project

* Create a single page application (SPA) that displays a list of items. 
* These items must include a picture and a description.
* The application functionality should satisfy the next use cases:
    * The user should be able to sort the items on the list using a drag and drop functionality.
    * There should be a counter in the page that shows how many items are being displayed.
    * Each item should have the actions: edit and delete. Edit allows a user to update the image of an item and the description text. Delete allows a user to remove an item from the list and update the counter.
    * A functionality to add a new item should exist. This functionality consist on a form to upload an image (jpg, gif and png extensions of 320px x 320px size) and a description text (max chars 300).
    * All the actions of the application should be done without refreshing the page (sort, add, edit and delete) and saved immediately.
    * On a page refresh action, it should be displayed the last state of the list.
* Use VUEJS framework
* Submit the application to a git repository with the necessary installation/execution instructions.
* All documentation and comments in code should be in English

## Notes
* Because of time, this project uses localStorage as database and cloudinary to host images.
* Cloudinary is being used in insecure mode (without authentication / backend)

## Author

* **Elias Torres** 
