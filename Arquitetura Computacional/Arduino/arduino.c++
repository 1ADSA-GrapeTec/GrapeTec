int lm35_pin = A0;
int leitura_lm35 = 0;
float temperatura;

void setup()
{
Serial.begin(9600);
int leitura_lm35 = 0;
}

void loop(){
int leitura_lm35 = analogRead(lm35_pin);
temperatura = leitura_lm35 * (5.0/1023) * 100;
Serial.print(temperatura);
Serial.println("Â°C");
delay(1000);
}