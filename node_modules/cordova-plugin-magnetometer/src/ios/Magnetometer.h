//
//  Magnetometer.h
//
//  Obj-C code for the Cordova Magnetometer Plugin
//
//  Created by Rameez Raja<mrameezraja@gmail.com> on 8/20/15.
//
//


#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>
#import <CoreLocation/CoreLocation.h>

@interface Magnetometer : CDVPlugin<CLLocationManagerDelegate>
    - (void)getReading:(CDVInvokedUrlCommand*)command;
    - (void)watchReadings:(CDVInvokedUrlCommand*)command;
    - (void)stop:(CDVInvokedUrlCommand*)command;

    @property (copy)   NSString* callbackId;
@end


