//
//  PhoneDialer.h

#import <Cordova/CDVPlugin.h>

@interface PhoneDialer : CDVPlugin

- (void)dial:(CDVInvokedUrlCommand*)command;

- (void)call:(CDVInvokedUrlCommand*)command;

@end