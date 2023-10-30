# Openboard clone
## About Openboard clone
Developed basic openboard functionalities such as writing,erasing, downloading the canvas,adding notes (with minimising,closing, dragging it around the page.  Uploading the image (featues same as of notes), undo and redo actions.)
Added realtime drawing functionality using SOCKET.IO by connecting to server using EXPRESS0.JS
•Created Undo-redo featues for the board usingArray as Stackby storing positions, colors and width of the pen anderaser.

## TECH STACK USED
 -  JAVASCRIPT
 -  NPM Modules
    -  Socket.io--> For real-time drawings
    -  Express.js--> For creating socket server

## TO RUN THIS ON YOUR LOCAL
   First fork this to your profile, then clone it to your desktop
   
   Then install libraries 
   ```bash
  npm install express
  npm install nodemon
  npm install socket.io
  ```
  
  To run this project copy paste below command in your command prompt
  
  ```bash
  nodemon run dev
 ```
