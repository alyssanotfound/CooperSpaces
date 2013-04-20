#include <SD.h>
 
File myFile;
 
void setup()
{
  Serial.begin(9600);
  Serial.print("Initializing SD card...");
  // On the Ethernet Shield, CS is pin 4. It's set as an output by default.
  // Note that even if it's not used as the CS pin, the hardware SS pin 
  // (10 on most Arduino boards, 53 on the Mega) must be left as an output 
  // or the SD library functions will not work. 
   pinMode(10, OUTPUT);
   
  if (!SD.begin(10)) {
    Serial.println("initialization failed!");
    return;
  }
  Serial.println("initialization done.");
   
  // open the file for reading:
  myFile = SD.open("/lost.dir/spring.csv");
  if (myFile) {
    Serial.println("spring 2013:");
    int lines = 0;
      while (myFile.available()) {
        char c = myFile.read();
          if ( c == '*') {
            lines++;
          }
      }
     Serial.println("there are this many lines: ");
     Serial.println(lines);
     
    // read from the file until there's nothing else in it:
    //while (myFile.available()) {
     
     // for(int k = 0 ; k <= 100 ; k++) {
        
      //   char c = myFile.read();
      //   if (c != '*') {
       //   Serial.print(c);
     
       //  }
    //  }
      
   // }
    // close the file:
    myFile.close();
  } else {
  	// if the file didn't open, print an error:
    Serial.println("error opening spring.csv");
  }
}
 
void loop()
{
	// nothing happens after setup
}
