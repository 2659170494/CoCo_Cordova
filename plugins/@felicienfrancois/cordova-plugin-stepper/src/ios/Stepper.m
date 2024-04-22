//
//  Pedometer.m
//  Copyright (c) 2014 Lee Crossley - http://ilee.co.uk
//

#import "Cordova/CDV.h"
#import "Cordova/CDVViewController.h"
#import "CoreMotion/CoreMotion.h"
#import "Stepper.h"

@interface Stepper ()
    @property (nonatomic, strong) CMPedometer *pedometer;
@end

@implementation Stepper

- (CMPedometer*) pedometer {
    if (_pedometer == nil) {
        _pedometer = [[CMPedometer alloc] init];
    }
    return _pedometer;
}

- (void) isStepCountingAvailable:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[CMPedometer isStepCountingAvailable]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) isDistanceAvailable:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[CMPedometer isDistanceAvailable]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) isFloorCountingAvailable:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[CMPedometer isFloorCountingAvailable]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) startStepperUpdates:(CDVInvokedUrlCommand*)command;
{
    __block CDVPluginResult* pluginResult = nil;

    NSDictionary *options = [command.arguments objectAtIndex:0];
    NSString *timeZone = [options objectForKey:@"timeZone"];
    NSCalendar *calendar = [NSCalendar currentCalendar];
    if (timeZone) {
        calendar.timeZone = [NSTimeZone timeZoneWithName:timeZone];
    }
    NSDateComponents *dateComponents = [calendar components:NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay fromDate:[NSDate date]];
    NSDate *startDate = [calendar dateFromComponents:dateComponents];
    
    [self.pedometer startPedometerUpdatesFromDate:startDate withHandler:^(CMPedometerData *pedometerData, NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (error)
            {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            }
            else
            {
                NSDictionary* pedestrianData = @{
                    @"startDate": [NSString stringWithFormat:@"%f", [pedometerData.startDate timeIntervalSince1970] * 1000],
                    @"endDate": [NSString stringWithFormat:@"%f", [pedometerData.endDate timeIntervalSince1970] * 1000],
                    @"steps_today": [CMPedometer isStepCountingAvailable] && pedometerData.numberOfSteps ? pedometerData.numberOfSteps : [NSNumber numberWithInt:0],
                    @"distance": [CMPedometer isDistanceAvailable] && pedometerData.distance ? pedometerData.distance : [NSNumber numberWithInt:0],
                    @"floorsAscended": [CMPedometer isFloorCountingAvailable] && pedometerData.floorsAscended ? pedometerData.floorsAscended : [NSNumber numberWithInt:0],
                    @"floorsDescended": [CMPedometer isFloorCountingAvailable] && pedometerData.floorsDescended ? pedometerData.floorsDescended : [NSNumber numberWithInt:0]
                };
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:pedestrianData];
                [pluginResult setKeepCallbackAsBool:true];
            }

            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        });
    }];
}

- (void) stopStepperUpdates:(CDVInvokedUrlCommand*)command;
{
    [self.pedometer stopPedometerUpdates];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) getStepsByPeriod:(CDVInvokedUrlCommand*)command;
{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneForSecondsFromGMT:0]];

    NSDate* startDate = [dateFormatter dateFromString:[command.arguments objectAtIndex:0]];
    NSDate* endDate = [dateFormatter dateFromString:[command.arguments objectAtIndex:1]];

    __block CDVPluginResult* pluginResult = nil;

    [self.pedometer queryPedometerDataFromDate:startDate toDate:endDate withHandler:^(CMPedometerData *pedometerData, NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (error)
            {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            }
            else
            {
                NSDictionary* pedestrianData = @{
                    @"steps": [CMPedometer isStepCountingAvailable] && pedometerData.numberOfSteps ? pedometerData.numberOfSteps : [NSNumber numberWithInt:0],
                    @"distance": [CMPedometer isDistanceAvailable] && pedometerData.distance ? pedometerData.distance : [NSNumber numberWithInt:0],
                    @"floorsAscended": [CMPedometer isFloorCountingAvailable] && pedometerData.floorsAscended ? pedometerData.floorsAscended : [NSNumber numberWithInt:0],
                    @"floorsDescended": [CMPedometer isFloorCountingAvailable] && pedometerData.floorsDescended ? pedometerData.floorsDescended : [NSNumber numberWithInt:0]
                };
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:pedestrianData];
            }

            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        });
    }];
}

@end
