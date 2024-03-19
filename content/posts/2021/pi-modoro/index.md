---
date: "2021-09-21T06:56:48Z"
description: ""
draft: true
slug: pi-modoro
title: Pi-modoro timer with added sparkles
---


Working from home has definitely had its benefits over the last year, but one of the downsides for me has been an ever increasing imbalance in the work/life mix. Having more time in the mornings and evenings (no commute), plus not having anyone to go out to lunch with means that I've been spending more and more time at my desk and not getting up, having _proper_ breaks or even going for the walks I normally would. All in all, not particularly great for me, or my productivity as I've ended up getting distracted easier as a result.

In comes the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). If you've not heard of it before, it's well worth looking into; A time management technique that splits your work up into 25 minute chunks named after the Pomodoro (tomato) kitchen timer. The original process works like this:

1. Decide on the task to be done.
2. Set the pomodoro timer (typically for 25 minutes).
3. Work on the task.
4. End work when the timer rings and take a short break (typically 5–10 minutes).
5. If you have fewer than three pomodoros, go back to Step 2 and repeat until you go through all three pomodoros.
6. After three pomodoros are done, take the fourth pomodoro and then take a long break (traditionally 20 to 30 minutes). Once the long break is finished, return to step 2.

My first few attempts at working to the Pomodoro technique never really took off, the busy and unpredictable environment of the office was not great for the combination of 25 minute chunks of work, and the breaks rarely lined up with those of others. At home though.... things are a bit more under my own control and so I thought I'd give it another try.

### So what is it?

This was a really simple build and is pretty much plug and play. The hardest part for me was _very_ carefully drilling a hole in a glass jar. The only parts you need are the [Pimoroni Plasma 2040](https://shop.pimoroni.com/products/plasma-2040) and some Neopixels. Any will do, but I really like the [5m string](https://shop.pimoroni.com/products/rgb-led-wire) that Pimoroni sell as well because it just looks really nice on it's own and even better in a glass jar.

IMG ehre

### Circuit Python on the Plasma2040

Being based on the RP2040 chip, you've got a few options for for the code you want to run on it. For the sake of simplicity and speed, I went with the [Adafruit Circuitpython firmware](https://circuitpython.org/board/pimoroni_plasma2040/) but you could quite as easily also go with micropython or even c++ if you wanted. The benefit of Circuitpython firmware though is that there is a really great [animation library](https://github.com/adafruit/Adafruit_CircuitPython_LED_Animation) that makes running simple animations on led strings a piece of cake, which is what I used for this build. The code that runs on the plasma2040 is available here: [https://github.com/jpwsutton/pimodoro2040/blob/main/code.py](https://github.com/jpwsutton/pimodoro2040/blob/main/code.py). Just copy `code.py` over to the USB drive that shows up along with the [Adafruit driver bundle](https://github.com/adafruit/Adafruit_CircuitPython_Bundle)  and you should be good to go.

Once the device boots, it will start a simple blue sparkle animation, but you can connect to it over a serial port and send commands that will launch into different animations with different settings. For now, I've only implemented the following animations:

- Sparkle
 - Sparkle Pulse
 - Rainbow
 - Rainbow Pulse

The commands are in json and can also change things like the colour (for the sparkle animations), speed and number of sparkles. Some examples below:

```
{"animation":"sparkle", "color" : { "r" : 255, "g": 150, "b":0}}

{"animation":"sparkle_pulse", "speed" : 0.05}

{"animation":"rainbow", "period" : 10}
```

Reading through the code is probably the best way to work out what you can do, and of course... having a play!

Now you could of course, extend this python script yourself to take advantage of the A and B buttons on the Plasma2040 board and build the Pomodoro timer code into the board itself. Circuitpython has all the libraries you need to do this and it would make for a nice standalone timer. I however wanted to have a bit more control over it as well as a visible clock when I needed, so for that I turned to...

### The Web browser Pomodoro Timer

I wanted a way to easily control the pomodoro timer as well as having an audio trigger that would go along with the change in lights to let me know that it was time for a short or long break, or if I needed to get back to work.







