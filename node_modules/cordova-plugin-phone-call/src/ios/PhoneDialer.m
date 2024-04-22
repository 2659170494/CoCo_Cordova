//
//  PhoneDialer.m

#import <Cordova/CDV.h>
#import <CallKit/CallKit.h>
#import <Cordova/CDVPlugin.h>
#import <AVFoundation/AVFoundation.h>
#import "PhoneDialer.h"

BOOL monitorAudioRouteChange = NO;


@implementation PhoneDialer

// - (void)call:(CDVInvokedUrlCommand*)command
// {
//     [self.commandDelegate runInBackground:^{
//         CDVPluginResult* pluginResult = nil;
//         NSString* url;
//         NSString* number = [command.arguments objectAtIndex:0];
//         NSString* appChooser = [command.arguments objectAtIndex:1];

//         if (number != nil && [number length] > 0) {
//             if ([number hasPrefix:@"tel:"] || [number hasPrefix:@"telprompt://"]) {
//                 url = number;
//             } else {
//                 // escape characters such as spaces that may not be accepted by openURL
//                 url = [NSString stringWithFormat:@"tel:%@",
//                 [number stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
//             }
//             // pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
//             // openURL is expected to fail on devices that do not have the Phone app, such as simulators, iPad, iPod touch
//             if(![[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:url]]) {
//                 pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"feature"];
//             } else if(![[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]]) {
//             // missing phone number
//                 pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"notcall"];
//             } else {
//                 pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
//             }
//         } else {
//             // missing phone number
//             pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"empty"];
//         }

//         // return result
//         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//     }];
// }

- (void)handleAudioRouteChange:(NSNotification *) notification
{
    if(monitorAudioRouteChange) {
        NSNumber* reasonValue = notification.userInfo[@"AVAudioSessionRouteChangeReasonKey"];
        AVAudioSessionRouteDescription* previousRouteKey = notification.userInfo[@"AVAudioSessionRouteChangePreviousRouteKey"];
        NSArray* outputs = [previousRouteKey outputs];
        if([outputs count] > 0) {
            AVAudioSessionPortDescription *output = outputs[0];
            if(![output.portType isEqual: @"Speaker"] && [reasonValue isEqual:@4]) {
                 AVAudioSession *sessionInstance = [AVAudioSession sharedInstance];
                 BOOL success = [sessionInstance overrideOutputAudioPort:AVAudioSessionPortOverrideSpeaker error:nil];  
                 if (success) {
                    NSLog(@"Configuring Speaker On");      
                 }
            } else if([output.portType isEqual: @"Speaker"] && [reasonValue isEqual:@3]) {
                AVAudioSession *sessionInstance = [AVAudioSession sharedInstance];
                BOOL success = [sessionInstance overrideOutputAudioPort:AVAudioSessionPortOverrideNone error:nil];                                        
                if (success) {
                NSLog(@"Configuring Speaker Off");      
                }  
            }
        }
    }
}

// - (void)phoneDetection {
//     _callCenter = [[CTCallCenter alloc] init]; // Here is the important part : instanciating a call center each time you want to check !  

//     [_callCenter setCallEventHandler:^(CTCall *call) {  
//         NSLog(@"Call detected");  
//         if(monitorAudioRouteChange) {
//             AVAudioSession *sessionInstance = [AVAudioSession sharedInstance];
//             BOOL success = [sessionInstance overrideOutputAudioPort:AVAudioSessionPortOverrideSpeaker error:nil];  
//             if (success) {
//                 NSLog(@"Configuring Speaker On");      
//             }
//         }        
//     }];  

//     NSLog(@"%@", _callCenter.currentCalls);  
// }


- (void)call:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{

        CDVPluginResult* pluginResult = nil;

        if (![[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"tel://"]]) {            
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"feature"];
        } else {
            
            NSString* url;
            NSString* number = [command.arguments objectAtIndex:0];
            NSString* appChooser = [command.arguments objectAtIndex:1];
            NSString* IsSpeakerOn = [command.arguments objectAtIndex:2];

            if (number != nil && [number length] > 0) {
                if ([number hasPrefix:@"tel:"] || [number hasPrefix:@"telprompt://"]) {
                    url = number;
                } else {
                    // escape characters such as spaces that may not be accepted by openURL
                    url = [NSString stringWithFormat:@"tel:%@",                    
                    [number stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
                }                                       

                //detect Audio Route Changes to make speakerOn and speakerOff event handlers
                // [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleAudioRouteChange:) name:AVAudioSessionRouteChangeNotification object:nil];                            
        
                // openURL is expected to fail on devices that do not have the Phone app, such as simulators, iPad, iPod touch
                if(![[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:url]]) {
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"feature"];
                }
                else if(![[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]]) {
                    // missing phone number
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"notcall"];
                } else {
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
                }

                if([[IsSpeakerOn lowercaseString] isEqualToString: @"true"]){
                    AVAudioSession *sessionInstance = [AVAudioSession sharedInstance];
                    BOOL success = [sessionInstance overrideOutputAudioPort:AVAudioSessionPortOverrideSpeaker error:nil];  
                    if (success) {
                        NSLog(@"Configuring Speaker On");      
                    }               
                } else {
                    AVAudioSession *sessionInstance = [AVAudioSession sharedInstance];
                    BOOL success = [sessionInstance overrideOutputAudioPort:AVAudioSessionPortOverrideNone error:nil];                                        
                    if (success) {
                        NSLog(@"Configuring Speaker Off");      
                    }
                }    

            } else {
                // missing phone number
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"empty"];
            }
        }
        
        // return result
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)dial:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{

        CDVPluginResult* pluginResult = nil;
        
        if (![[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"tel://"]]) {            
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"feature"];
        } else {
            
            NSString* url;
            NSString* number = [command.arguments objectAtIndex:0];
            NSString* appChooser = [command.arguments objectAtIndex:1];

            if (number != nil && [number length] > 0) {
                if ([number hasPrefix:@"tel:"] || [number hasPrefix:@"telprompt://"]) {
                    url = number;
                } else {
                    // escape characters such as spaces that may not be accepted by openURL
                    url = [NSString stringWithFormat:@"tel:%@",
                   [number stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
                }

                // openURL is expected to fail on devices that do not have the Phone app, such as simulators, iPad, iPod touch
                if(![[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:url]]) {
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"feature"];
                }
                else if(![[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]]) {
                    // missing phone number
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"notcall"];
                } else {                    
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
                }                                

            } else {
                // missing phone number
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"empty"];
            }
        }
        
        // return result
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

@end
