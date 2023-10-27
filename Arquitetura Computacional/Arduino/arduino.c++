int lm35_pin = A0;
int leitura_lm35 = 0;
float temperatura;
float tinto;
float branco; 
float espumante;
float rose;

void setup()
{
Serial.begin(9600);
}

void loop(){
leitura_lm35 = analogRead(lm35_pin);
temperatura = leitura_lm35 * (5.0/1023) * 100;
tinto = 0.20470829 * temperatura + 10.49744115;
rose = 0.40941658 * temperatura  +0.99488231;
branco = 0.20470829 * temperatura + 6.49744115;
espumante = 0.20470829 * temperatura+2.49744115;
Serial.println(" ");
Serial.print("Temperatura normal:");
Serial.println(temperatura);
Serial.print("Temperatura tinto:");
Serial.println(tinto);
Serial.print("Temperatura rose:");
Serial.println(rose);
Serial.print("Temperatura branco:");
Serial.println(branco);
Serial.print("Temperatura espumante:");
Serial.println(espumante);
delay(1000);
}