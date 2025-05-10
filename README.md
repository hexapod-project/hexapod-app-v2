# Hexapod App (v2)

This is an app for controlling the [Hexapod Robot (v2)](https://github.com/hexapod-project/hexapod-v2). This is version 2 of the [Hexapod App](https://github.com/hexapod-project/hexapod-app-v1) which has a more straightforward UI, added calibration functions and a more structured code base.

*Disclaimer: This is a hobby project and has many areas that can be improved on.*

![Hexapod App](/resources/controller-screen.png)


### Framework

- React Native

### Libraries

- React Native BLE PLX
- React Native Paper (UI)
- React Navigation
- [React Native Circle Slider (edw-lee)](https://github.com/edw-lee/react-native-circle-slider)

### High-Level Architecture Diagram

![High-Level Architecture Diagram](/resources/high-level-architecture-diagram.png)
- The app communicates with the robot through *BLE communication*. 
- It uses custom GATT services and characteristics to control the robot.
   - Motion service - controls the robot's move direction, rotation and roll/pitch angle.
   - Calibrate service - controls the robot's servo calibration by adjusting the servos pulse width to match the physical angle of rotation.
- In the controller screen, when a movement button is pressed, the app will send the motion data through the motion service with it's respective characteristic which the robot will process and perform the actions accordingly.
- In the calibrator screen, the app will send the servo pulse width data through the calibrate service. The robot will update the selected servo's pulse width and store it in the nonvolatile memory.
   

### How Calibration Works   

![Calibrator Screen](/resources/calibrator-screen.png)
- In the top half of the Calibrartor screen, the user can select a servo by tapping on parts of the hexapod's legs and the selected servo will be highlighted.
- At the bottom half of the screen, the number shows the pulse width which indicates the neutral position of the selected servo. For example, if the servo is at 1500us pulse width, it should be at 90 degrees of rotation. However, cheaper servos have a small margin of error between the pulse width and the physical angle of rotation.
- The slider can be used to adjust the pulse width of the selected servo. The number indicates the pulse width for the selected servo at its neutral position which is 90 degrees. The closer the servo's neutral angle can get to 90 degrees the more accurate the robot's movement will be.
- The calibrator screen has a *Test* tab which allows the user to test each servo's angle of rotation by sending the angle of rotation data to the robot.
   - This can be used to check if the physical angle of the servo matches the desired angle. If it does not match the angle, the user can calibrate the pulse width and test again.

### Future Improvements

- Update the controller UI/UX to be more intuitive and easier to control the robot.
- Make the calibration process automated.
- Add statistics for the robot such as battery level, temperature, etc.