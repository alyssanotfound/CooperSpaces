#include <SD.h>

/*
  SD card read/write
 
 This example shows how to read and write data to and from an SD card file 	
 The circuit:
 * SD card attached to SPI bus as follows:
 ** MOSI - pin 11
 ** MISO - pin 12
 ** CLK - pin 13
 ** CS - pin 4
 
 created   Nov 2010
 by David A. Mellis
 modified 9 Apr 2012
 by Tom Igoe
 
 This example code is in the public domain.
 	 
 */
File myFile0;
File myFile2;
int lines = 0;

void setup()
{
 // Open serial communications and wait for port to open:
  Serial.begin(9600);
  Serial.print("Initializing SD card...");
  // CS line is connected to 10
   pinMode(10, OUTPUT);
   
  if (!SD.begin(10)) {
    Serial.println("initialization failed!");
    return;
  }
  
  Serial.println("initialization done.");
  
  //check how many lines there are to go through
  myFile0 = SD.open("/lost.dir/spring.csv");
  if (myFile0) {
    Serial.println("spring 2013:");
    
      while (myFile0.available()) {
        char c = myFile0.read();
          if ( c == '*') {
            lines++;
          }
      }
     Serial.println("there are this many lines: ");
     Serial.println(lines);
  }    


  // open the second file for reading:
  myFile2 = SD.open("/lost.dir/spring.csv");
  if (myFile2) {
    Serial.println("the real file:");
    
    // read from the file until there's nothing else in it:
    int count = 0;
    char file_contents[256];
    
    while (myFile2.available()) {  
       // Serial.write(myFile2.read());
       for (int i = 1; i < lines; i++) {
          count = myFile2.readBytesUntil('*', file_contents, 256);
          Serial.print("this is line: ");
          Serial.println(i);
          Serial.println(file_contents);
          Serial.print(" is the content and there are this many characters: ");
          Serial.println(count);
          char *token; 
          token = strtok(file_contents, ",");
         
          while (token != NULL) 
          {
           Serial.println(token);
           token = strtok(NULL, ","); // Use NULL to keep parsing original data

          }
          
         
       }
      
    }
    // close the file:
    myFile2.close();
  } else {
  	// if the file didn't open, print an error:
    Serial.println("error opening second file");
  }
  
}



void loop()
{
	// nothing happens after setup
}


