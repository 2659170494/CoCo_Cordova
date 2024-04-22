//
//  Pedometer.h
//  Copyright (c) 2014 Lee Crossley - http://ilee.co.uk
//

#import "Foundation/Foundation.h"
#import "Cordova/CDV.h"

@interface Stepper : CDVPlugin

- (void) isStepCountingAvailable:(CDVInvokedUrlCommand*)command;
- (void) isDistanceAvailable:(CDVInvokedUrlCommand*)command;
- (void) isFloorCountingAvailable:(CDVInvokedUrlCommand*)command;

- (void) startStepperUpdates:(CDVInvokedUrlCommand*)command;
- (void) stopStepperUpdates:(CDVInvokedUrlCommand*)command;

- (void) getStepsByPeriod:(CDVInvokedUrlCommand*)command;

@end
