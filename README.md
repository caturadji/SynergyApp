# SynergyApp
### About the app
App created from the UI Design by Maya Koeva (https://dribbble.com/shots/10035926-Talents-Casting-App). Movie directors can use this app to find talented actresses or actors for casting. This is the final set of mobile app screenshots for this project. 
 
Home Screen            |  Detail Screen         | Widget
:-------------------------:|:-------------------------:|:-------------------------:
 <img src="https://user-images.githubusercontent.com/63891497/212728233-0e8bc5f9-f42a-40ad-a17c-a5e3ac4a847a.png" width="200" />  |  <img src="https://user-images.githubusercontent.com/63891497/212728141-37ad2f3a-859e-4706-ac56-bc6da99847e3.png" width="200" /> |  <img src="https://user-images.githubusercontent.com/63891497/215619224-8fc85adc-b952-4916-8d22-79d6888f1d3f.png" width="200" />

### Project techstack!
+ Framework : **React Native**
+ Programming language : **Javascript**
+ Toolkit : **XCode**
+ OS Target : **iOS** (for android not developed yet)


### Requirements
+ **Nodejs** 19.4.0
+ **Ruby** 2.7.6


### How to build
1. Setup React Native environment in your machine (https://reactnative.dev/docs/environment-setup) 
2. Clone this repository to your local directory
3. Open terminal with your clone repository as a root
4. Install depedencies 
```
 npm install
```
5. Install framework added for ios development 
``` 
 cd ios && pod install && cd .. 
```
6. Build on your simulator 
``` 
 npm run ios 
```

### How to run with .ipa file
Download .ipa file here: https://www.mediafire.com/file/0de56bfqow6x0pe/SynergyApp.ipa/file
#### Using simulator
1. Rename .ipa file as .zip and extract the contents
2. Once the zip file is extracted, we can find the Payload folder which contains App_Name.app file
3. Drag & drop App_Name.app file to ios simulator

#### Using ios device
1. Upload the .ipa to any such site which create a shareable installation link using the uploaded .ipa file. Our recomendation is https://www.installonair.com
2. Open the above link and upload the downloaded .ipa file
3. Once the files get uploaded click on submit button and wait for the shareable link to get generated
4. Lastly install the app on the mobile device by opening the shared link through installonair and you are are ready to test once the app gets installed on your device.


