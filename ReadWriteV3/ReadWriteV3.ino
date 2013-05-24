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
       int lineno = 0;
       for (lineno = 1; lineno < lines; lineno++) {
//          count = myFile2.readBytesUntil('*', file_contents, 256-1);
          count = myFile2.readBytesUntil('\r', file_contents, 256-1);

          file_contents[count] = '\0';

#ifdef PRINT
          Serial.print("this is line: ");
          Serial.println(lineno);

          
          Serial.println(file_contents);
          
          Serial.print(" is the content and there are this many characters: ");
          Serial.println(count);
#endif //PRINT         
         
          char* strArray[50]; /* up-to 50 words can be stored */
          char* token = NULL;
          int i = 0;
          for(i=0;i<50;i++) { strArray[i]=NULL; }
          
          token = strtok(file_contents, ",");

          i=0;
          while (token)
          {
          strArray[i] = (char *) malloc(strlen(token) + 1);
          strcpy(strArray[i++], token);
          token = strtok(NULL, ",");
          }
          
          char buf[100];
          for(int k=0;k<strlen(strArray[0]);k++) {
            sprintf(buf,"%02d'%c' ", (int) strArray[0][k], strArray[0][k]);
            Serial.print(buf);
          }
          Serial.println("!");
          Serial.print(strlen(strArray[0]));Serial.print("=\"");Serial.print(strArray[0]);Serial.println("\".");
          if(strcmp("5/15/13",strArray[0])==0) { Serial.println("match! 5/15/13"); Serial.print("Start:");Serial.println(strArray[2]);}
          if(strcmp("1/24/13",strArray[0])==0) { Serial.println("match! 1/24/13"); Serial.print("Start:");Serial.println(strArray[2]); }
          
          int j=0;
          for (j = 0; j < i; j++)
          {
          if (strArray[j]) /* check for null data */
            {
#ifdef PRINT              
            Serial.print("strArray[");
            Serial.print(j);
            Serial.print(" of ");
            Serial.print(i);
            Serial.print("] is \"");
            Serial.print(strArray[j]);
            Serial.print("\".\n");
#else
#endif

            free(strArray[j]);
            strArray[j]=NULL;
            }
          }
         // strcmp returns 0 if match
         // strftime mktime
          
         
       }
      Serial.print("End of file. Read this many lines: ");
      Serial.println(lineno);

      
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


