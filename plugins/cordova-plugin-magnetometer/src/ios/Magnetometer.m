//
//  Magnetometer.m
//
//  Obj-C code for the Cordova Magnetometer Plugin
//
//  Created by Rameez Raja<mrameezraja@gmail.com> on 8/20/15.
//
//


#import "Magnetometer.h"


@interface Magnetometer ()

    @property (nonatomic, retain) CLLocationManager *locationManager;

@end

@implementation Magnetometer


+ (void)initialize
{
    NSLog(@"Magnetometer initialize");
}

- (void)getReading:(CDVInvokedUrlCommand*)command
{
    NSLog(@"getReading");
    [self startMagnetometer];
    self.callbackId = command.callbackId;
}

- (void)watchReadings:(CDVInvokedUrlCommand*)command
{
    NSLog(@"watchReadings");
    [self startMagnetometer];
    self.callbackId = command.callbackId;
}

- (void)stop:(CDVInvokedUrlCommand *)command
{
    NSLog(@"stop");
    [self.locationManager stopUpdatingHeading];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)startMagnetometer {
    NSLog(@"startMagnetometer");
	// setup the location manager
	_locationManager = [[CLLocationManager alloc] init];

	// check if the hardware has a compass
	if ([CLLocationManager headingAvailable] == NO) {
		// No compass is available. This application cannot function without a compass,
        // so a dialog will be displayed and no magnetic data will be measured.
        self.locationManager = nil;
        UIAlertView *noCompassAlert = [[UIAlertView alloc] initWithTitle:@"No Compass!"
                                                                 message:@"This device does not have the ability to measure magnetic fields."
                                                                delegate:nil
                                                       cancelButtonTitle:@"OK"
                                                       otherButtonTitles:nil];
        [noCompassAlert show];
	} else {
        // heading service configuration
        self.locationManager.headingFilter = kCLHeadingFilterNone;

        // setup delegate callbacks
        self.locationManager.delegate = self;

        // start the compass
        [self.locationManager startUpdatingHeading];
    }
}

- (void)dealloc {
	// Stop the compass
	[self.locationManager stopUpdatingHeading];
}

- (UIStatusBarStyle)preferredStatusBarStyle {
    // Status bar text should be white.
    return UIStatusBarStyleLightContent;
}

// This delegate method is invoked when the location manager has heading data.
- (void)locationManager:(CLLocationManager *)manager didUpdateHeading:(CLHeading *)heading {

    // Compute and display the magnitude (size or strength) of the vector.
	//      magnitude = sqrt(x^2 + y^2 + z^2)
	CGFloat magnitude = sqrt(heading.x*heading.x + heading.y*heading.y + heading.z*heading.z);
    //NSLog(@"magnitude: %f", magnitude);
    NSMutableDictionary *jsonObj = [[NSMutableDictionary alloc] init];
    [jsonObj setValue: [NSString stringWithFormat:@"%.1f", heading.x] forKey:@"x"];
    [jsonObj setValue: [NSString stringWithFormat:@"%.1f", heading.y] forKey:@"y"];
    [jsonObj setValue: [NSString stringWithFormat:@"%.1f", heading.z] forKey:@"z"];
    [jsonObj setValue: [NSString stringWithFormat:@"%.1f", magnitude] forKey:@"magnitude"];

    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:jsonObj];
    [result setKeepCallbackAsBool:1];
    [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
}

// This delegate method is invoked when the location managed encounters an error condition.
- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error {
    if ([error code] == kCLErrorDenied) {
        // This error indicates that the user has denied the application's request to use location services.
        [manager stopUpdatingHeading];
    } else if ([error code] == kCLErrorHeadingFailure) {
        // This error indicates that the heading could not be determined, most likely because of strong magnetic interference.
    }
}


@end
